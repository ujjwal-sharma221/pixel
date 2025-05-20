import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import {
  TenantsNavbar,
  TenantsNavbarSkeleton,
} from "@/modules/tenants/ui/navbar";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface TenantPageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const TenantPageLayout = async ({
  children,
  params,
}: TenantPageLayoutProps) => {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<TenantsNavbarSkeleton />}>
          <TenantsNavbar slug={slug} />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default TenantPageLayout;
