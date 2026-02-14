"use client";

import useCartStore from "@/store/cartStore";
import { ProductType } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

type ProductCardType = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardType) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <Link href={`/products/${product.id}`}>
        {/* IMAGES */}
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
      </Link>
      {/* PRODUCT DETAILS */}
      <div className="bg-background relative z-10 flex flex-col gap-4 p-4">
        <p className="font-medium">{product.name}</p>
        <p className="text-muted-foreground text-sm">
          {product.shortDescription}
        </p>
        {/* TYPES */}
        <div className="flex items-center gap-4 text-xs">
          {/* SIZES */}
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Size</span>
            <select
              name="size"
              id="size"
              className="ring-muted rounded-md px-2 py-1 ring"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option value={size} key={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* COLORS */}
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  className={`cursor-pointer rounded-full border-1 p-0.5 ${productTypes.color === color ? "border-muted-foreground" : "border-border"}`}
                  key={color}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                >
                  <div
                    className="size-[14px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRICE AND ADD TO CART BUTTON */}
        <div className="flex items-center justify-between gap-1">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="hover:text-background hover:bg-foreground flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm shadow-lg ring-1 ring-gray-200 transition-all duration-300"
          >
            <ShoppingCart className="size-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
