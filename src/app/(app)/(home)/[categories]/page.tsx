import { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { DEFAULT_LIMIT } from "@/lib/constants";
import { getQueryClient, trpc } from "@/trpc/server";
import { ProductListView } from "@/modules/products/view/product-list-view";
import { loadProductFilters } from "@/modules/products/product-search-params";

interface CategoryPageProps {
  params: Promise<{ categories: string }>;
  searchParams: Promise<SearchParams>;
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { categories } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
      categorySlug: categories,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView categories={categories} />
    </HydrationBoundary>
  );
};

export default CategoryPage;
