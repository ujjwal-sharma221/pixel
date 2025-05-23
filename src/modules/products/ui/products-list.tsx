"use client";

import { InboxIcon, LoaderCircleIcon } from "lucide-react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { DEFAULT_LIMIT } from "@/lib/constants";
import { TextEffect } from "@/components/text-effect";
import { useProductFilters } from "../hooks/use-product-hook";

interface ProductListProps {
  categories?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

export function ProductList({
  categories,
  narrowView,
  tenantSlug,
}: ProductListProps) {
  const [filters] = useProductFilters();
  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          ...filters,
          tenantSlug,
          categorySlug: categories,
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );

  if (data.pages[0]?.docs.length === 0) {
    return (
      <div className="flex border border-dashed border-black items-center justify-center p-8 flex-col gap-y-4 w-full rounded-lg">
        <InboxIcon />
        <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3}>
          No Products Found!
        </TextEffect>
      </div>
    );
  }
  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
          narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
        )}
      >
        {data?.pages
          .flatMap((page) => page.docs)
          .map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              imageUrl={p.image?.url}
              tenantSlug={p.tenant?.slug}
              tenantImageUrl={p.tenant.image?.url}
              reviewRating={3}
              reviewCount={5}
              price={p.price}
            />
          ))}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage ? (
          <Button
            variant="sketch"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            data-loading={isFetchingNextPage || undefined}
            className="group relative disabled:opacity-100"
          >
            <span className="group-data-loading:text-transparent">
              Load More
            </span>
            {isFetchingNextPage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoaderCircleIcon
                  className="animate-spin"
                  size={16}
                  aria-hidden="true"
                />
              </div>
            )}
          </Button>
        ) : null}
      </div>
    </>
  );
}
