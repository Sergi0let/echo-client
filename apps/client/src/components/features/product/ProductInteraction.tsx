'use client';

import useCartStore from '@/store/cartStore';
import { ProductType } from '@/types/product';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

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
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCartStore();

  const handleTypeChange = (type: 'size' | 'color', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success('Product added to cart');
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* SIZE */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500">Size</span>

        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={`cursor-pointer border-1 p-[2px] ${selectedSize === size ? 'border-gray-600' : 'border-gray-300'}`}
              key={size}
              onClick={() => handleTypeChange('size', size)}
            >
              <div
                className={`flex size-6 items-center justify-center uppercase ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
              >
                {size}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border-1 p-[2px] ${selectedColor === color ? 'border-gray-600' : 'border-white'}`}
              key={color}
              onClick={() => handleTypeChange('color', color)}
            >
              <div className="size-6" style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex gap-3">
          <button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange('decrement')}
          >
            <Minus className="size-4" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange('increment')}
          >
            <Plus className="size-4" />
          </button>
        </div>
        {/* BUTTONS */}
        <button
          onClick={handleAddToCart}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-white shadow-md"
        >
          <Plus className="size-4" />
          Add to cart
        </button>
        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-800 shadow-lg ring-1 ring-gray-400">
          <ShoppingBag className="size-4" /> Buy this now
        </button>
      </div>
    </div>
  );
};

export default ProductInteraction;
