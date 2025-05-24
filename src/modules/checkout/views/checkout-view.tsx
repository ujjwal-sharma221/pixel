"use client";

import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { InboxIcon, Loader2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { generateTenantUrl } from "@/lib/utils";
import { useCart } from "../hooks/use-cart-hook";
import { CheckoutItem } from "../ui/checkout-item";
import { TextEffect } from "@/components/text-effect";
import { CheckoutSidebar } from "../ui/checkout-sidebar";
import { useCheckoutStates } from "../hooks/use-checkout-states";

interface CheckoutViewProps {
  tenantSlug: string;
}

export function CheckoutView({ tenantSlug }: CheckoutViewProps) {
  const router = useRouter();
  const { productIds, removeProduct, clearCart } = useCart(tenantSlug);
  const [states, setStates] = useCheckoutStates();

  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({ ids: productIds })
  );

  const purchase = useMutation(
    trpc.checkout.purchase.mutationOptions({
      onMutate: () => {
        setStates({ success: false, cancel: false });
      },
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          router.push("/sign-in");
        }
        toast.error(error.message);
      },
    })
  );

  useEffect(() => {
    if (states.success) {
      setStates({ success: false, cancel: false });
      clearCart();
      router.push("/products");
    }
  }, [states.success, clearCart, router, setStates]);

  useEffect(() => {
    if (!error) return;

    if (error.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning("Invalid products found, cart has been cleared");
    }
  }, [error, clearCart]);

  if (isLoading) {
    return (
      <div className="lg:pt-16 pt-4 px-4 lg:px-12">
        <div className="flex border border-dashed border-black items-center justify-center p-8 flex-col gap-y-4 w-full rounded-lg">
          <Loader2 className="text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (data?.totalDocs === 0) {
    return (
      <div className="lg:pt-16 pt-4 px-4 lg:px-12">
        <div className="flex border border-dashed border-black items-center justify-center p-8 flex-col gap-y-4 w-full rounded-lg">
          <InboxIcon />
          <TextEffect
            preset="fade-in-blur"
            speedReveal={1.1}
            speedSegment={0.3}
          >
            No Products Found!
          </TextEffect>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantUrl({
                  tenantSlug: product.tenant.slug,
                })}/products/${product.id}`}
                tenantUrl={generateTenantUrl({
                  tenantSlug: product.tenant.slug,
                })}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.totalPrice ?? 0}
            onPurchase={() => purchase.mutate({ tenantSlug, productIds })}
            isCancelled={states.cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
}
