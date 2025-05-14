import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { HomeNavbar } from "@/modules/home/ui/home-navbar";
import {
  SearchFilter,
  SearchFiltersLoading,
} from "@/modules/home/search-filter";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersLoading />}>
          <SearchFilter />
        </Suspense>
      </HydrationBoundary>
      {children}
    </div>
  );
}
