import { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

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
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      categorySlug: subCategory,
      ...filters,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView categories={subCategory} />
    </HydrationBoundary>
  );
};

export default SubCategoryPage;
