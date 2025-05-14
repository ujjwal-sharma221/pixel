"use client";

import Link from "next/link";
import { LayoutList } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDropdownPosition } from "./use-dropdown-position";
import {
  CategoriesGetManyOutput,
  CategoriesGetSingleOutput,
} from "@/modules/categories/types";
import { CategoriesSidebar } from "@/modules/home/ui/categories-sidebar";

interface CategoriesProps {
  data: CategoriesGetManyOutput;
}

export function Categories({ data }: CategoriesProps) {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(data.length);

  const categoryParam = params.categories as string | undefined;
  const activeCategory = categoryParam ?? "all";

  const activeCategoryIndex = data.findIndex(
    (cat) => cat.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return;

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);
      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;
        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visible++;
      }

      setVisibleCount(visible);
    };

    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!);

    return () => resizeObserver.disconnect();
  }, [data.length]);

  return (
    <div className="relative w-full">
      {/* Calculation div */}

      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex"
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
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

      {/* visible div */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center gap-2"
      >
        {data.slice(0, visibleCount).map((category) => {
          return (
            <div key={category.id}>
              <CategoryDropdown
                category={category}
                isActive={activeCategory === category.slug}
                isNavigationHovered={isAnyHovered}
              />
            </div>
          );
        })}

        <div ref={viewAllRef} className="shrink-0">
          <Button
            variant="sketch"
            className={cn(
              "hover:bg-transparent bg-transparent text-black hover:border-2 hover:text-black rounded-full px-4",
              isActiveCategoryHidden &&
                !isAnyHovered &&
                "border-2 bg-white text-black border-primary"
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View all
            <LayoutList className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface CategoryDropdownProps {
  category: CategoriesGetSingleOutput;
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
          asChild
          variant="sketch"
          className={cn(
            "hover:bg-transparent hover:border-2 shadow-none bg-transparent text-black hover:text-black rounded-full px-4",
            isActive &&
              !isNavigationHovered &&
              "border-2 bg-primary  text-white border-white ",
            isOpen && "border-2 bg-white text-black border-primary"
          )}
        >
          <Link
            prefetch
            href={category.slug === "all" ? "/home" : `/${category.slug}`}
          >
            {category.name}
          </Link>
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
  category: CategoriesGetSingleOutput;
  isOpen: boolean;
  position: { top: number; left: number };
}

function SubCategoryMenu({ category, isOpen, position }: SubCategoryMenuProps) {
  if (!isOpen || !category.subcategories) {
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
              href={`/${category.slug}/${sub.slug}`}
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
