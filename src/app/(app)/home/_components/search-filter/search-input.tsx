import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchInputProps {
  disabled?: boolean;
}

export function SearchInput({ disabled }: SearchInputProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="p-6" placeholder="Search products" />
      </div>
    </div>
  );
}
