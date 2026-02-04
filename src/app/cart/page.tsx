"use client";

import { CartItemsType } from "@/types/product";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const cartItems: CartItemsType = [
  {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
    quantity: 1,
    selectedSize: "m",
    selectedColor: "red",
  },
  {
    id: 2,
    name: "Puma Ultra Warm Zip",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    quantity: 3,
    selectedColor: "l",
    selectedSize: "yellow",
  },
  {
    id: 3,
    name: "Nike Air Essentials Pullover",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 69.9,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
    quantity: 6,
    selectedColor: "xxl",
    selectedSize: "yellow",
  },
];

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeStep = parseInt(searchParams.get("step") || "1");
  const isActiveStep = (id: number) => id == activeStep;

  return (
    <main className="container-main mt-12 flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${isActiveStep(step.id) ? "border-muted-foreground" : "border-gray-400"}`}
            key={step.id}
          >
            <div
              className={`p4 flex size-6 items-center justify-center rounded-full text-white ${isActiveStep(step.id) ? "bg-muted-foreground" : "bg-gray-400"}`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${isActiveStep(step.id) ? "text-muted-foreground" : "text-gray-400"}}`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* STEPS & DETAILS */}
      <div className="flex w-full flex-col gap-16 lg:flex-row">
        <div className="border-muted flex w-full flex-col gap-8 rounded-lg border-1 p-8 shadow-lg lg:w-7/12">
          1
        </div>
        <div className="border-muted flex w-full flex-col gap-8 rounded-lg border-1 p-8 shadow-lg lg:w-5/12">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-muted-foreground">Subtotal</p>
              <p className="font-medium">
                $
                {cartItems
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
              onClick={() => router.push("/cart?step=2", { scroll: false })}
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
