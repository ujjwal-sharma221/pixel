import Link from "next/link";
import Image from "next/image";

import { cn, formatCurrency } from "@/lib/utils";
import img from "@/assets/form-1.png";
import { Button } from "@/components/ui/button";

interface CheckoutItemProps {

  isLast?: boolean;
  imageUrl?: string | null;
  name: string;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  onRemove: () => void;
}

export function CheckoutItem({
  imageUrl,
  isLast,
  name,
  price,
  productUrl,
  tenantName,
  tenantUrl,
  onRemove,
}: CheckoutItemProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl ?? img}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between">
        <div>
          <Link href={productUrl}>
            <h4 className="font-bold underline">{name}</h4>
          </Link>
          <Link href={tenantUrl}>
            <p className="font-medium text-sm text-muted-foreground underline">
              {tenantName}
            </p>
          </Link>
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between">
        <p className="font-medium">{formatCurrency(price)}</p>
        <Button variant="secondary" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
}
