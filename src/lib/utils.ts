import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantUrl({ tenantSlug }: { tenantSlug: string }) {
  return `/tenants/${tenantSlug}`;
}

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value));
}
