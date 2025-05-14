interface CategoryPageProps {
  params: Promise<{ categories: string; subcategory: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categories, subcategory } = await params;
  return (
    <div>
      Category - {categories} <br />
      Subcategory - {subcategory}
    </div>
  );
};

export default CategoryPage;
