import type Stripe from 'stripe';
import { StripeProductType } from '@repo/types';
import stripe from './stripe.js';

export const createStripeProduct = async (
  product: StripeProductType
): Promise<Stripe.Product> => {
  try {
    const res = await stripe.products.create({
      id: product.id,
      name: product.name,
      default_price_data: {
        currency: 'usd',
        unit_amount: product.price * 100,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getStripeProductPrice = async (
  productId: number
): Promise<number | null> => {
  try {
    const res = await stripe.prices.list({ product: productId.toString() });
    return res.data[0]?.unit_amount ?? null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
