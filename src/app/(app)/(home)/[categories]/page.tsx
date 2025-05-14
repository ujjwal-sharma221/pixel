interface CategoryPageProps {
  params: Promise<{ categories: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categories } = await params;
  return <div>Category - {categories}</div>;
};

export default CategoryPage;
