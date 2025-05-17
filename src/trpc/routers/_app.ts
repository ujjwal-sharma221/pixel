import { createTRPCRouter } from "../init";
import { authRouter } from "@/modules/auth/server/procedure";
import { productsRouter } from "@/modules/products/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { tagsRouter } from "@/modules/tags/server/procedure";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  products: productsRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
