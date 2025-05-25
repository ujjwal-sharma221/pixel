"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ReviewSidebar } from "../ui/review-sidebar";

interface LibraryProductViewProps {
  productId: string;
}

export function LibraryProductView({ productId }: LibraryProductViewProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({ productId })
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <header className="py-8 border-b">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 ">
          <h1 className="text-[40px] font-medium">{data.name}</h1>
        </div>
      </header>
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="p-4 rounded-md border gap-4">
              <ReviewSidebar productId={productId} />
            </div>
          </div>
          <div className="lg:col-span-5">
            {data.content ? (
              <p>{data.content}</p>
            ) : (
              <p className="font-medium italic text-muted-foreground">
                No Special Content
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="p-4 w-full border-b">
      <Button className="group" variant="ghost" asChild>
        <Link href="/library" prefetch>
          <ArrowLeftIcon
            className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
          Back to Library
        </Link>
      </Button>
    </nav>
  );
}
