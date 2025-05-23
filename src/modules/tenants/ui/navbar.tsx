"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ShoppingCart } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { generateTenantUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CheckoutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/checkout-button").then(
      (mod) => mod.CheckoutButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button disabled className=" bg-white ">
        <ShoppingCart className="text-black" />
      </Button>
    ),
  }
);

interface TenantsNavbarProps {
  slug: string;
}

export function TenantsNavbar({ slug }: TenantsNavbarProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));
  return (
    <nav className="h-20 font-medium border-b bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link
          href={generateTenantUrl({ tenantSlug: slug })}
          className="flex items-center gap-2"
        >
          {data.image?.url && (
            <Image
              src={data.image?.url}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[32px]"
              alt={slug}
            />
          )}
          <p className="text-xl">{data.name}</p>
        </Link>
        <CheckoutButton tenantSlug={slug} />
      </div>
    </nav>
  );
}

export const TenantsNavbarSkeleton = () => {
  return (
    <nav className="h-20 font-medium border-b bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div></div>
        <Button disabled className=" bg-white ">
          <ShoppingCart className="text-black" />
        </Button>
      </div>
    </nav>
  );
};
