import { SearchParams } from "nuqs/server";

import { DEFAULT_LIMIT } from "@/lib/constants";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductListView } from "@/modules/products/view/product-list-view";
import { loadProductFilters } from "@/modules/products/product-search-params";

interface TenantPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}

const TenantPage = async ({ params, searchParams }: TenantPageProps) => {
  const { slug } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} narrowView />
    </HydrationBoundary>
  );
};
export default TenantPage;
