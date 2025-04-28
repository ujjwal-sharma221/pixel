"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";

export function SearchFilter() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
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
