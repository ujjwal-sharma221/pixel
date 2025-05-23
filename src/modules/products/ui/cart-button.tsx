import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/checkout/hooks/use-cart-hook";

interface CartButtonProps {
  tenantSlug: string;
  productId: string;
}

export function CartButton({ tenantSlug, productId }: CartButtonProps) {
  const cart = useCart(tenantSlug);

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
