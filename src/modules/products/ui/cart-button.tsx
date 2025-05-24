import Link from "next/link";
import { Library } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/checkout/hooks/use-cart-hook";

interface CartButtonProps {
  tenantSlug: string;
  productId: string;
  isPurchased?: boolean;
}

export function CartButton({
  tenantSlug,
  productId,
  isPurchased,
}: CartButtonProps) {
  const cart = useCart(tenantSlug);

  if (isPurchased) {
    return (
      <Button className="group flex-1 font-medium" asChild variant="sketch">
        <Link href={`/library/${productId}`}>
          <Library className="-ms-1 opacity-60" size={16} aria-hidden="true" />
          View in Library
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant={cart.isProductInCart(productId) ? "outline" : "sketch"}
      className={cn("flex-1")}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? "Remove from Cart" : "Add to Cart"}
    </Button>
  );
}
