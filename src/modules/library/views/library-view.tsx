import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LibraryProductList } from "../ui/library-products-list";
import { ProductCardSkeleton } from "../ui/library-product-card";

export function LibraryView() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <header className="py-8 border-b">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 flex flex-col gap-y-4">
          <h1 className="text-[40px] font-medium">Library</h1>
          <p className="font-medium">Your Purchases and Reviews</p>
        </div>
      </header>
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
        <Suspense fallback={<ProductCardSkeleton />}>
          <LibraryProductList />
        </Suspense>
      </section>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="p-4 w-full border-b">
      <Button className="group" variant="ghost" asChild>
        <Link href="/" prefetch>
          <ArrowLeftIcon
            className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
          Continue Shopping
        </Link>
      </Button>
    </nav>
  );
}
