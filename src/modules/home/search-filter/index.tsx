"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function SearchFilter() {
  const trpc = useTRPC();
  const params = useParams();

  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const categoryParam = params.categories as string | undefined;
  const activeCategory = categoryParam || "all";
  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory
  );
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubcategory = params.subcategory as string | undefined;
  // const activeSubCategoryName =
  //   data.find((subCategory) => subCategory.slug === activeSubcategory)?.name ||
  //   null;

  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full mt-6">
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        activeCategoryName={activeCategoryName}
        activeCategory={activeCategory}
        activeSubCategoryName={activeSubcategory}
      />
    </div>
  );
}

interface BreadcrumbNavigationProps {
  activeCategoryName?: string | null;
  activeCategory?: string | null;
  activeSubCategoryName?: string | null;
}

function BreadcrumbNavigation({
  activeCategory,
  activeCategoryName,
  activeSubCategoryName,
}: BreadcrumbNavigationProps) {
  if (!activeCategoryName || activeCategory === "all") return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubCategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className=" font-medium text-lg underline text-muted-foreground"
              >
                <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary font-medium text-xl">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg font-medium">
                {activeSubCategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-medium">
              {activeCategoryName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function SearchFiltersLoading() {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full animate-pulse"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-10"></div>
      </div>
    </div>
  );
}
