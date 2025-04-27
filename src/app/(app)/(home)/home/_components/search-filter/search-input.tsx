"use client";

import { useState } from "react";
import { ListFilterIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { CustomCategory } from "../../../types";
import { CategoriesSidebar } from "./categories-sidebar";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  disabled?: boolean;
  data: CustomCategory[];
}

export function SearchInput({ disabled, data }: SearchInputProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        data={data}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="p-6" placeholder="Search products" />
      </div>
      <Button
        variant="sketch"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
    </div>
  );
}
