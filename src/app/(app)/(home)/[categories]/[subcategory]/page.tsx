import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/products-list";

interface SubCategoryPageProps {
  params: Promise<{ subCategory: string }>;
}

const SubCategoryPage = async ({ params }: SubCategoryPageProps) => {
  const { subCategory } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      categorySlug: subCategory,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList categories={subCategory} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default SubCategoryPage;
