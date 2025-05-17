import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "categories",
      where: {
        parent: {
          exists: false,
        },
      },
      depth: 1, // Populate subcategories
      pagination: false,
      sort: "name",
    });

    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // Because of depth:1 we are confident doc will be a type of "Category"
        ...(doc as Category),
      })),
    }));

    return formattedData;
  }),
});
