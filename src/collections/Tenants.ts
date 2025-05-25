import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },

  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Store Name",
      admin: {
        description: "This is the name of the store",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      unique: true,
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description: "Stripe account ID associated with your shop",
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description:
          "You cannot create products until you have verified your stripe details",
      },
    },
  ],
};
