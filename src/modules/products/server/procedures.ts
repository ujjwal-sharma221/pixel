import z from "zod";
import { Where } from "payload";

import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        categorySlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if (input.categorySlug) {
        const categoryData = await ctx.payload.find({
          collection: "categories",
          limit: 1,
          pagination: false,
          depth: 1,
          where: {
            slug: {
              equals: input.categorySlug,
            },
          },
        });

        const formattedData = categoryData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            // Because of depth:1 we are confident doc will be a type of "Category"
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subCategories = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subCategories.push(
            ...parentCategory.subcategories.map((sub) => sub.slug)
          );
        }

        where["category.slug"] = {
          in: [parentCategory.slug, ...subCategories],
        };
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 1,
        where,
      });

      return data;
    }),
});
