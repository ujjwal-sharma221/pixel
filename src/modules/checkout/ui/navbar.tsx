import Link from "next/link";

import { generateTenantUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface CheckoutNavbarProps {
  slug: string;
}

export function CheckoutNavbar({ slug }: CheckoutNavbarProps) {
  return (
    <nav className="h-20 font-medium border-b bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <p className="text-xl">Checkout</p>

        <Button className="group" variant="ghost" asChild>
          <Link href={generateTenantUrl({ tenantSlug: slug })}>
            <ArrowLeftIcon
              className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </nav>
  );
}
