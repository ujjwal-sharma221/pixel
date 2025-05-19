import { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { DEFAULT_LIMIT } from "@/lib/constants";
import { getQueryClient, trpc } from "@/trpc/server";
import { ProductListView } from "@/modules/products/view/product-list-view";
import { loadProductFilters } from "@/modules/products/product-search-params";

interface SubCategoryPageProps {
  params: Promise<{ subCategory: string }>;
  searchParams: Promise<SearchParams>;
}

const SubCategoryPage = async ({
  params,
  searchParams,
}: SubCategoryPageProps) => {
  const { subCategory } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
      categorySlug: subCategory,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView categories={subCategory} />
    </HydrationBoundary>
  );
};

export default SubCategoryPage;
