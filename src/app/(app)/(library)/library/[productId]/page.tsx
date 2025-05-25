import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { LibraryProductView } from "@/modules/library/views/library-product-view";

interface LibraryIdPageProps {
  params: Promise<{ productId: string }>;
}

const LibraryIdPage = async ({ params }: LibraryIdPageProps) => {
  const { productId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.library.getOne.queryOptions({
      productId,
    })
  );
  void queryClient.prefetchQuery(
    trpc.reviews.getOne.queryOptions({
      productId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryProductView productId={productId} />
    </HydrationBoundary>
  );
};

export default LibraryIdPage;
