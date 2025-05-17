import z from "zod";
import { Sort, Where } from "payload";

import { Category } from "@/payload-types";
import { sortValues } from "../product-search-params";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        categorySlug: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";

      if (input.sort === "trending") {
        sort = "-createdAt";
      }

      if (input.sort === "curated") {
        sort = "-createdAt";
      }

      if (input.sort === "new") {
        sort = "+createdAt";
      }

      if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      }

      if (input.maxPrice) {
        where.price = {
          greater_than_equal: input.maxPrice,
        };
      }

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
          where["category.slug"] = {
            in: [parentCategory.slug, ...subCategories],
          };
        }
      }

      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 1,
        where,
        sort,
      });

      return data;
    }),
});
