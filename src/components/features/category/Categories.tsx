"use client";
import {
  Briefcase,
  Footprints,
  Glasses,
  Hand,
  Shirt,
  ShoppingBasket,
  Venus,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="h-4 w-4" />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className="h-4 w-4" />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className="h-4 w-4" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className="h-4 w-4" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className="h-4 w-4" />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Venus className="h-4 w-4" />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shirt className="h-4 w-4" />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className="h-4 w-4" />,
    slug: "gloves",
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategory = searchParams.get("category");

  const handleChange = (cat: string | null) => {
    const params = new URLSearchParams(searchParams);

    params.set("category", cat || "");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-muted my-4 grid grid-cols-2 rounded-xl p-2 md:grid-cols-4 lg:grid-cols-8">
      {categories.map((category) => (
        <div
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 ${
            category.slug === selectedCategory
              ? "text-foreground bg-white"
              : "text-muted-foreground"
          }`}
          key={category.name}
          onClick={() => handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
