import { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceFilterProps {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
}

export function PriceFilter({
  maxPrice,
  minPrice,
  onMaxPriceChange,
  onMinPriceChange,
}: PriceFilterProps) {
  const handleMinimumPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValues = e.target.value.replace(/[^0-9.]/g, "");
    onMinPriceChange(numericValues);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValues = e.target.value.replace(/[^0-9.]/g, "");
    onMaxPriceChange(numericValues);
  };

  return (
    <div className="flex flex-col gap-2  p-2 rounded-md">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Minimum Price</Label>
        <Input
          type="text"
          placeholder="0"
          value={minPrice ? formatAsCurrency({ val: minPrice }) : ""}
          onChange={handleMinimumPriceChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Maximum Price</Label>
        <Input
          type="text"
          placeholder="∞"
          value={maxPrice ? formatAsCurrency({ val: maxPrice }) : ""}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
}

export const formatAsCurrency = ({ val }: { val: string }) => {
  const numericValue = val.replace(/[^0-9.]/g, "");
  const parts = numericValue.split(".");
  const formattedValue =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");

  if (!formattedValue) return "";

  const numberValue = parseFloat(formattedValue);
  if (isNaN(numberValue)) return "";

  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
};
