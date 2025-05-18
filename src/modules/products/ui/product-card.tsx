"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import placeHolderImage from "@/assets/form-1.png";
import { DEFAULT_LIMIT } from "@/lib/constants";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  authorName: string;
  reviewRating: number;
  reviewCount: number;
  imageUrl?: string | null;
  authorImageUrl?: string | null;
}

export function ProductCard({
  id,
  name,
  price,
  imageUrl,
  authorName,
  reviewCount,
  reviewRating,
  authorImageUrl,
}: ProductCardProps) {
  const params = useParams();
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const categoryParam = params.categories as string | undefined;

  const activeCategory = categoryParam || "all";
  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory
  );
  const activeSubcategoryColor = activeCategoryData?.color || "primary";

  return (
    <Link href={`/products/${id}`}>
      <div className="overflow-hidden border rounded-md h-full flex flex-col hover:border-neutral-200 hover:border-2">
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            className="object-cover"
            src={imageUrl ?? placeHolderImage}
          />
        </div>
        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          <div className="flex items-center gap-2" onClick={() => {}}>
            {authorImageUrl && (
              <Image
                alt={authorName}
                src={authorImageUrl}
                width={16}
                height={16}
                className="rounded-full shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm underline font-medium">{authorName}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <Star className="size-3.5 fill-black" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div
            className="relative text-white rounded-md px-2 py-1 w-fit"
            style={{ backgroundColor: activeSubcategoryColor }}
          >
            <p className="text-sm font-medium">
              {new Intl.NumberFormat("en-Us", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {[...Array(DEFAULT_LIMIT)].map((_, idx) => (
        <div
          key={idx}
          className="overflow-hidden border rounded-md h-full flex flex-col w-full animate-pulse"
        >
          <div className="relative aspect-square bg-neutral-200" />
          <div className="p-4 border-y flex flex-col gap-3 flex-1">
            <div className="h-6 bg-neutral-200 rounded w-3/4" />
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-neutral-200 size-4" />
              <div className="h-4 bg-neutral-200 rounded w-1/4" />
            </div>
            <div className="h-4 bg-neutral-200 rounded w-1/3" />
          </div>
          <div className="p-4">
            <div className="h-6 bg-neutral-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
