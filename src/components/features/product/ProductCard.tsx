"use client";

import { ProductType } from "@/types/product";

type ProductCardType = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardType) => {
  return <div>ProductCard</div>;
};

export default ProductCard;
