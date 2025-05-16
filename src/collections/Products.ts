import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
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
  ],
};
