import { createTRPCRouter } from "../init";
import { authRouter } from "@/modules/auth/server/procedure";
import { productsRouter } from "@/modules/products/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  products: productsRouter,
});

export type AppRouter = typeof appRouter;
