"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRightIcon, Library, StarIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import img from "@/assets/form-2.png";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/components/star-rating";
import { formatCurrency, generateTenantUrl } from "@/lib/utils";
import { LinkIconAnimated } from "@/components/icons/link-icon-animated";

const CartButton = dynamic(
  () => import("../ui/cart-button").then((mod) => mod.CartButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="flex-1 bg-black text-white">
        Add to Cart
      </Button>
    ),
  }
);

interface ProductViewProps {
  productId: string;
  tenantSlug: string;
}

export function ProductView({ productId, tenantSlug }: ProductViewProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );
  return (
    <div className="px-4 lg:px-12 py-10 bg-white rounded-md border border-black mt-1">
      <div className=" rounded overflow-hidden">
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={data.image?.url ?? img}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-6">
              <h1 className="text-4xl font-medium">{data.name}</h1>
            </div>
            <div className="border-y border-black flex">
              <div className="px-6 py-4 flex items-center justify-center border-r border-black">
                <div className=" px-2 py-1 border bg-red-400 w-fit border-black">
                  <p className="text-base font-medium text-white">
                    {formatCurrency(data.price)}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center justify-center lg:border-r border-black">
                <Link
                  href={generateTenantUrl({ tenantSlug })}
                  className="flex items-center gap-2"
                >
                  {data.tenant?.image?.url && (
                    <Image
                      src={data.tenant.image?.url}
                      alt={data.tenant.name}
                      width={20}
                      height={20}
                      className="rounded-full border shrink-0 size-[20px]"
                    />
                  )}
                  <p className="text-base underline font-medium">
                    {data.tenant.name}
                  </p>
                </Link>
              </div>
              <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                <div className="flex items-center gap-1">
                  <StarRating rating={3} iconClassName="size-4" />
                </div>
              </div>
            </div>

            <div className="block lg:hidden px-6 py-4 items-center justify-center border-b">
              <div className="flex items-center gap-1">
                <StarRating rating={3} iconClassName="size-4" />
                <p className="text-background font-medium">{5} ratings</p>
              </div>
            </div>

            <div className="p-6">
              {data.description ? (
                <p>{data.description}</p>
              ) : (
                <p className="font-medium text-muted-foreground italic">
                  No Description Provided
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <div className="border-t lg:border-t-0 lg:border-l border-black h-full">
              <div className="flex flex-col gap-4 p-6 border-b border-black">
                <div className="flex flex-row items-center gap-2">
                  {data.isPurchased ? (
                    <CartButton
                      isPurchased={data.isPurchased}
                      productId={productId}
                      tenantSlug={tenantSlug}
                    />
                  ) : (
                    <CartButton productId={productId} tenantSlug={tenantSlug} />
                  )}
                  <Button
                    variant="sketch"
                    className="size-12"
                    onClick={() => {}}
                  >
                    <LinkIconAnimated />
                  </Button>
                </div>
                <p className="text-center font-medium ">
                  {`${data.refundPolicy} money back guarantee`}
                </p>
              </div>

              <div className="p-6 ">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Ratings</h3>
                  <div className="flex items-center gap-x-1 font-medium">
                    <StarIcon className="size-4 fill-black" />
                    <p>({5})</p>
                    <p className="text-base">{5} ratings</p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <React.Fragment key={stars}>
                      <div className="font-medium">
                        {stars} {stars === 1 ? "star" : "stars"}
                      </div>
                      <Progress value={5} className="h-[1lh] bg-white border" />
                      <div className="font-medium">{5} %</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
