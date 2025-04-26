"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CustomCategory } from "../../../types";
import { useDropdownPosition } from "./use-dropdown-position";

interface CategoriesProps {
  data: CustomCategory[];
}

export function Categories({ data }: CategoriesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);

  const activeCategory = "all";
  const activeCategoryIndex = data.find((cat) => cat.slug === activeCategory);

  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center gap-2">
        {data.map((category) => {
          return (
            <div key={category.id}>
              <CategoryDropdown
                category={category}
                isActive={activeCategory === category.slug}
                isNavigationHovered={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface CategoryDropdownProps {
  category: CustomCategory;
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
  const dropdownPosition = getDropdownPosition();

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
            isActive &&
              !isNavigationHovered &&
              "border-2 bg-white text-black border-primary",
            isOpen && "border-2 bg-white text-black border-primary"
          )}
        >
          {category.name}
        </Button>

        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100"
            )}
          ></div>
        )}
      </div>

      <SubCategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  );
}

interface SubCategoryMenuProps {
  category: CustomCategory;
  isOpen: boolean;
  position: { top: number; left: number };
}

function SubCategoryMenu({ category, isOpen, position }: SubCategoryMenuProps) {
  if (
    !isOpen ||
    !category.subcategories ||
    !category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div
      className="fixed z-100"
      style={{ top: position.top, left: position.left }}
    >
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="text-black rounded-md overflow-hidden border w-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {category.subcategories?.map((sub) => (
            <Link
              key={sub.slug}
              href={"/"}
              className="w-full text-left p-4 hover:bg-black text-white hover:text-white flex justify-between items-center underline font-medium"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
