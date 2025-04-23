"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { useDropdownPosition } from "./use-dropdown-position";

interface CategoriesProps {
  data: any;
}

export function Categories({ data }: CategoriesProps) {
  return (
    <div>
      {data.map((category: Category) => {
        return (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        );
      })}
    </div>
  );
}

interface CategoryDropdownProps {
  category: Category;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

function CategoryDropdown({
  category,
  isActive,
  isNavigationHovered,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => setIsOpen(false);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          className={cn(
            "hover:bg-transparent hover:border-2 hover:text-black rounded-full px-4",
            isActive && !isNavigationHovered && "bg-white border-primary",
          )}
        >
          {category.name}
        </Button>
        {category.subcategories && category && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100",
            )}
          ></div>
        )}
      </div>
    </div>
  );
}
