import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import {
  SearchFilter,
  SearchFiltersLoading,
} from "./_components/search-filter";
import { getQueryClient, trpc } from "@/trpc/server";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersLoading />}>
          <SearchFilter />
        </Suspense>
      </HydrationBoundary>
      {children}
    </div>
  );
}
