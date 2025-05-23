import { Suspense } from "react";

import { ProductSort } from "../ui/product-sort";
import { ProductList } from "../ui/products-list";
import { ProductFilters } from "../ui/product-filters";
import { ProductCardSkeleton } from "../ui/product-card";

interface ProductListProps {
  categories?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

export function ProductListView({
  categories,
  tenantSlug,
  narrowView,
}: ProductListProps) {
  return (
    <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
        <p className="text-2xl font-medium">Curated For You</p>
        <ProductSort />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
        <div className="lg:col-span-2 ">
          <ProductFilters />
        </div>
        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<ProductCardSkeleton narrowView={narrowView} />}>
            <ProductList
              categories={categories}
              tenantSlug={tenantSlug}
              narrowView={narrowView}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
