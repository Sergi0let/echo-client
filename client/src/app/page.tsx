import HeroSection from "@/components/features/hero/HeroSection";
import ProductList from "@/components/features/product/ProductList";

type HomepageProps = {
  searchParams: Promise<{ category: string }>;
};
const Homepage = async ({ searchParams }: HomepageProps) => {
  const category = (await searchParams).category;

  return (
    <main>
      <HeroSection />
      <ProductList category={category} params="homepage" />
    </main>
  );
};

export default Homepage;
