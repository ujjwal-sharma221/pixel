import { Tenant } from "@/payload-types";
import { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;
      const tenant = req.user?.tenants?.[0]?.tenant as Tenant;

      return Boolean(tenant?.stripeDetailsSubmitted);
    },
  },
  admin: {
    useAsTitle: "name",
    description: "You must submit your stripe details before creating products",
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "description", type: "text" },
    { name: "price", type: "number", required: true },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "refundPolicy",
      type: "select",
      options: ["30-day", "14-day", "3-day", "1-day"],
      defaultValue: "30-day",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "content",
      type: "textarea",
      admin: {
        description:
          "Protected content. Only visible to consumers after purchase. Add product related details",
      },
    },
  ],
};
