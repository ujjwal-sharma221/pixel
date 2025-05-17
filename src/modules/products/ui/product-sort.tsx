"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useProductFilters } from "../hooks/use-product-hook";

export function ProductSort() {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={() => setFilters({ sort: "curated" })}
        size="sm"
        className={cn(
          "rounded-full shadow-none font-bold",
          filters.sort !== "curated" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent font-normal"
        )}
      >
        Curated
      </Button>
      <Button
        variant="outline"
        onClick={() => setFilters({ sort: "trending" })}
        size="sm"
        className={cn(
          "rounded-full shadow-none font-bold",
          filters.sort !== "trending" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent font-normal"
        )}
      >
        Trending
      </Button>
      <Button
        variant="outline"
        onClick={() => setFilters({ sort: "new" })}
        size="sm"
        className={cn(
          "rounded-full shadow-none font-bold",
          filters.sort !== "new" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent font-normal"
        )}
      >
        New
      </Button>
    </div>
  );
}
