import z from "zod";
import { Sort, Where } from "payload";
import { headers as getHeaders } from "next/headers";

import { DEFAULT_LIMIT } from "@/lib/constants";
import { sortValues } from "../product-search-params";
import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
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

      if (input.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
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
        depth: 2,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      // console.log("TENANT", JSON.stringify(data.docs, null, 2));

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),

  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const headers = await getHeaders();
      const session = await ctx.payload.auth({ headers });

      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.id,
        depth: 2,
      });

      let isPurchased = false;

      if (session.user) {
        const ordersData = await ctx.payload.find({
          collection: "orders",
          pagination: false,
          limit: 1,
          where: {
            and: [
              { product: { equals: input.id } },
              { user: { equals: session.user.id } },
            ],
          },
        });

        isPurchased = ordersData.totalDocs > 0;
      }
      return {
        ...product,
        isPurchased,
        image: product.image as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null },
      };
    }),
});
