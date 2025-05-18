"use client";

import Link from "next/link";
import { useState } from "react";
import { ListFilterIcon, SearchIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { BookTextAnimatedIcon } from "@/components/icons/book-icon-animated";
import { CategoriesSidebar } from "@/modules/home/ui/categories-sidebar";

interface SearchInputProps {
  disabled?: boolean;
}

export function SearchInput({ disabled }: SearchInputProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="flex items-center gap-2 w-full ">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full ">
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="p-6 border-black text-primary placeholder:text-primary"
          placeholder="Search products"
        />
      </div>
      <Button
        variant="sketch"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {session.data?.user && (
        <Button variant="sketch" asChild>
          <Link href="/library">
            <BookTextAnimatedIcon className="" />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
}
