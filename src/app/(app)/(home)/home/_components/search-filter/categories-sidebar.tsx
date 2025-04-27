import { useState } from "react";
import { useRouter } from "next/navigation";

import { CustomCategory } from "../../../types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIconAnimated } from "@/components/left-icon-animated";
import { ChevronRightIcon } from "lucide-react";

interface CategorySidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}

export function CategoriesSidebar({
  onOpenChange,
  open,
  data,
}: CategorySidebarProps) {
  const [parentCategories, setParentCategories] = useState<
    CustomCategory[] | null
  >(null);

  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null);

  const currentCategories = parentCategories ?? data ?? [];

  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  };

  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[]);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") router.push("/home");
        else {
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  };

  const bgColor = selectedCategory?.color || "white";

  const handleBack = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  return (
    <Sheet onOpenChange={handleOpenChange} open={open}>
      <SheetContent
        side="bottom"
        className="p-0"
        style={{ backgroundColor: bgColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBack}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
            >
              <div className="flex items-center">
                <ChevronLeftIconAnimated className="hover:bg-transparent size-10" />
                Back
              </div>
            </button>
          )}
          {currentCategories.map((cat) => (
            <button
              key={cat.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.name}
              {cat.subcategories && cat.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4"></ChevronRightIcon>
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
