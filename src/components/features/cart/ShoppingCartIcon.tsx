import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
  return (
    <Link href={"/cart"} className="relative size-6">
      <ShoppingCart className="size-6 text-white" />
      <span className="bg-success absolute -top-3 -right-3 flex size-5 items-center justify-center rounded-full text-xs font-medium text-white">
        0
      </span>
    </Link>
  );
};

export default ShoppingCartIcon;
