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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data?.docs.map((p) => (
        <div className="border rounded-md bg-white" key={p.id}>
          <h2 className="text-xl font-medium">{p.name}</h2>
          <h2>${p.price}</h2>
        </div>
      ))}
    </div>
  );
}

export const ProductListSkeleton = () => {
  return <div>Loading...</div>;
};
