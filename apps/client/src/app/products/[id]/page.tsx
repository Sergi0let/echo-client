import ProductInteraction from '@/components/features/product/ProductInteraction';
import { ProductType } from '@/types/product';
import Image from 'next/image';

// TEMPORARY
const product: ProductType = {
  id: 1,
  name: 'Adidas CoreFit T-Shirt',
  shortDescription:
    'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
  description:
    'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
  price: 39.9,
  sizes: ['s', 'm', 'l', 'xl', 'xxl'],
  colors: ['gray', 'purple', 'green'],
  images: {
    gray: '/products/1g.png',
    purple: '/products/1p.png',
    green: '/products/1gr.png',
  },
};

type ProductPageProps = {
  searchParams: Promise<{ color: string; size: string }>;
  params: Promise<{ id: string }>;
};

export const generateMetadata = async () => {
  //TODO: get the product from db
  // TEMPORARY
  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const { color, size } = await searchParams;
  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);

  return (
    <div className="mt-24 flex flex-col gap-4 md:gap-12 lg:flex-row">
      <div className="relative aspect-[2/3] w-full lg:w-5/12">
        <Image
          alt={product.name}
          src={product.images?.[selectedColor] || ''}
          fill
          className="rounded-md object-contain"
        />
      </div>
      <div className="flex w-full flex-col gap-4 lg:w-7/12">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
        <div className="mt-4 flex items-center gap-2">
          {' '}
          <Image
            src={'/klarna.png'}
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src={'/cards.png'}
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src={'/stripe.png'}
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>
        <p className="text-xs text-gray-500">
          By clicking Pay Now, you agree to{' '}
          <span className="underline hover:text-black">Privacy Policy</span>.
          You authorize us to charge your selected payment method for the total
          amount shown. All sales are subject to our return and{' '}
          <span className="underline hover:text-black">Refund Policies</span>
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
