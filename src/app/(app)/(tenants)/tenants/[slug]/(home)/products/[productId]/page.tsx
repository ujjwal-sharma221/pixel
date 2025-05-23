import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { ProductView } from "@/modules/products/view/product-view";

interface ProductIdPageProps {
  params: Promise<{ productId: string; slug: string }>;
}

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const { productId, slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductView productId={productId} tenantSlug={slug} />
    </HydrationBoundary>
  );
};
export default ProductIdPage;
