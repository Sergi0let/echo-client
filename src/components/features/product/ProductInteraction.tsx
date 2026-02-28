"use client";

import { ProductType } from "@/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ProductInteractionProps = {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
};
const ProductInteraction = ({
  product,
  selectedColor,
  selectedSize,
}: ProductInteractionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTypeChange = (type: "size" | "color", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* SIZE */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={`cursor-pointer border-1 p-[2px] ${selectedSize === size ? "border-gray-600" : "border-gray-300"}`}
              key={size}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={`flex size-6 items-center justify-center uppercase ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}`}
              >
                {size}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border-1 p-[2px] ${selectedColor === color ? "border-gray-600" : "border-white"}`}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div className="size-6" style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>
      {/* COLOR */}
      <div className="flex flex-col gap-2 text-sm"></div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-sm"></div>
    </div>
  );
};

export default ProductInteraction;
