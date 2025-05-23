import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCart } from "../hooks/use-cart-hook";
import { cn, generateTenantUrl } from "@/lib/utils";
import { CartIconAnimated } from "@/components/icons/shopping-cart-icon-animated";

interface CheckoutButtonProps {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

export function CheckoutButton({
  className,
  hideIfEmpty,
  tenantSlug,
}: CheckoutButtonProps) {
  const { toggleItems } = useCart(tenantSlug);

  if (hideIfEmpty && toggleItems === 0) return null;

  return (
    <Button variant="sketch" asChild className={cn("bg-white", className)}>
      <Link href={`${generateTenantUrl({ tenantSlug })}/checkout`}>
        <CartIconAnimated /> {toggleItems > 0 ? toggleItems : ""}
      </Link>
    </Button>
  );
}
