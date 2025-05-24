import { createTRPCRouter } from "../init";

import { tagsRouter } from "@/modules/tags/server/procedure";
import { authRouter } from "@/modules/auth/server/procedure";
import { tenantsRouter } from "@/modules/tenants/server/procedure";
import { checkoutRouter } from "@/modules/checkout/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
  products: productsRouter,
  checkout: checkoutRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
