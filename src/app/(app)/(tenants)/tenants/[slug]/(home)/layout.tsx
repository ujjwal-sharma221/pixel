import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import {
  TenantsNavbar,
  TenantsNavbarSkeleton,
} from "@/modules/tenants/ui/navbar";

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
    <div className="min-h-screen  flex flex-col">
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
