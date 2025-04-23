import { getPayload } from "payload";
import configPromise from "@payload-config";

import { Category } from "@/payload-types";
import { SearchFilter } from "./_components/search-filter";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: "categories",
    where: {
      parent: {
        exists: false,
      },
    },
    depth: 1, // Populate subcategories
    pagination: false,
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // Because of depth:1 we are confident doc will be a type of "Category"
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <SearchFilter data={formattedData} />
      {children}
    </div>
  );
}
