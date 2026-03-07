'use client';

import PaymentForm from '@/components/features/cart/PaymentForm';
import ShippingForm from '@/components/features/cart/ShippingForm';
import useCartStore from '@/store/cartStore';
import { ShippingFormInputs } from '@/types/product';
import { ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

// const cartItems: CartItemsType = [
//   {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quantity: 1,
//     selectedSize: "m",
//     selectedColor: "gray",
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     quantity: 3,
//     selectedColor: "green",
//     selectedSize: "green",
//   },
//   {
//     id: 3,
//     name: "Nike Air Essentials Pullover",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 69.9,
//     sizes: ["s", "m", "l"],
//     colors: ["green", "blue", "black"],
//     images: {
//       green: "/products/3gr.png",
//       blue: "/products/3b.png",
//       black: "/products/3bl.png",
//     },
//     quantity: 6,
//     selectedColor: "blue",
//     selectedSize: "yellow",
//   },
// ];

const steps = [
  {
    id: 1,
    title: 'Shopping Cart',
  },
  {
    id: 2,
    title: 'Shipping Address',
  },
  {
    id: 3,
    title: 'Payment Method',
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get('step') || '1');
  const isActiveStep = (id: number) => id == activeStep;

  const { cart, removeFromCart, clearCart } = useCartStore();

  return (
    <main className="container-main mt-12 flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${isActiveStep(step.id) ? 'border-muted-foreground' : 'border-gray-400'}`}
            key={step.id}
          >
            <div
              className={`p4 flex size-6 items-center justify-center rounded-full text-white ${isActiveStep(step.id) ? 'bg-muted-foreground' : 'bg-gray-400'}`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${isActiveStep(step.id) ? 'text-muted-foreground' : 'text-gray-400'}}`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* STEPS & DETAILS */}
      <div className="flex w-full flex-col gap-16 lg:flex-row">
        <div className="border-muted flex w-full flex-col gap-8 rounded-lg border-1 p-8 shadow-lg lg:w-7/12">
          {isActiveStep(1) ? (
            cart.map((item) => (
              <div
                className="flex items-center justify-between"
                key={item.id + item.selectedColor + item.selectedSize}
              >
                <div className="flex gap-8">
                  <div className="">
                    <Image
                      src={item.images?.[item.selectedColor] || ''}
                      width={64}
                      height={64}
                      alt={item.name}
                      className="object-contain"
                    />
                  </div>
                  <div className="">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-xs">
                        Quantity:{''} {item.quantity}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Size: {''}
                        {item.selectedSize}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Color: {''}
                        {item.selectedColor}
                      </p>
                    </div>
                    <div className="font-medium">${item.price.toFixed(2)}</div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-red-100 text-red-400 transition-all hover:bg-red-200"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))
          ) : isActiveStep(2) ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : isActiveStep(3) && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="">Some</p>
          )}
        </div>
        <div className="border-muted flex h-max w-full flex-col gap-8 rounded-lg border-1 p-8 shadow-lg lg:w-5/12">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-muted-foreground">Subtotal</p>
              <p className="font-medium">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Discount(10%)</p>
              <p className="font-medium">10$</p>
            </div>
            <hr className="border-muted" />
            <div className="flex justify-between">
              <p className="text-muted-foreground">Shipping Free</p>
              <p className="font-medium">10$</p>
            </div>
            <hr className="border-muted" />
            <div className="flex justify-between">
              <p className="font-semibold">Total number</p>
              <p className="font-medium">10$</p>
            </div>
          </div>
          {isActiveStep(1) && (
            <button
              onClick={() => router.push('/cart?step=2', { scroll: false })}
              className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-gray-800 p-2 text-white transition-all hover:bg-gray-900"
            >
              Continue
              <ArrowRight className="size-3" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default CartPage;
