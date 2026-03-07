import ProductList from '@/components/features/product/ProductList';

type ProductsPageProps = {
  searchParams: Promise<{ category: string }>;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const category = (await searchParams).category;

  return (
    <main>
      <ProductList category={category} params="products" />
    </main>
  );
};

export default ProductsPage;
