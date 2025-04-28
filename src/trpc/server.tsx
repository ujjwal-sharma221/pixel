import "server-only";

import { cache } from "react";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { createTRPCContext } from "./init";
import { appRouter } from "./routers/_app";
import { makeQueryClient } from "./query-client";

export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
