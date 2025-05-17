"use client";

import { ChevronUp } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animated-accordion";
import { PriceFilter } from "../utils/price-filter";
import { useProductFilters } from "../hooks/use-product-hook";

export function ProductFilters() {
  return (
    <div>
      <div className="flex justify-between font-medium border-black border border-dashed p-2 rounded-md">
        Product Filters
        <button type="button" className="underline">
          Clear
        </button>
      </div>
      <ProductAccordion />
    </div>
  );
}

interface ProductAccordionProps {
  title: string;
  className?: string;
}

function ProductAccordion() {
  const [filters, setFilters] = useProductFilters();

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };
  return (
    <Accordion
      className="flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700 mt-4 border-dashed border-black border  p-2 rounded-md"
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <AccordionItem value="getting-started" className="py-2">
        <AccordionTrigger className="w-full text-left text-zinc-950 dark:text-zinc-50">
          <div className="flex items-center justify-between">
            <div>Price</div>
            <ChevronUp className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:-rotate-180 dark:text-zinc-50" />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <PriceFilter
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onMinPriceChange={(value) => onChange("minPrice", value)}
            onMaxPriceChange={(value) => onChange("maxPrice", value)}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
