"use client";

import Link from "next/link";
import Image from "next/image";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { generateTenantUrl } from "@/lib/utils";

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
      </div>
    </nav>
  );
}

export const TenantsNavbarSkeleton = () => {
  return (
    <nav className="h-20 font-medium border-b bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div></div>
      </div>
    </nav>
  );
};
