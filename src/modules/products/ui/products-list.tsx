"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

interface ProductListProps {
  categories?: string;
}

export function ProductList({ categories }: ProductListProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      categorySlug: categories,
    })
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export const ProductListSkeleton = () => {
  return <div>Loading...</div>;
};
