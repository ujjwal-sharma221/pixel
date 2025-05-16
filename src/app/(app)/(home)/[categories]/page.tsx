import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/products-list";

interface CategoryPageProps {
  params: Promise<{ categories: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categories } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      categorySlug: categories,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList categories={categories} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CategoryPage;
