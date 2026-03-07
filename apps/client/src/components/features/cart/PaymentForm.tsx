'use client';

import { PaymentFormInputs, paymentFormSchema } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';

import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema as any),
  });

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {
    if (data) {
      console.log(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handlePaymentForm)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="cardHolder">Name on card</label>
        <input
          type="text"
          id="cardHolder"
          placeholder="John Doe "
          {...register('cardHolder')}
          className="border-b border-gray-200 py-2 text-lg outline-none"
        />
        {errors.cardHolder && (
          <p className="text-sm text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="cardNumber">Number of card</label>
        <input
          type="text"
          placeholder="123456789"
          id="cardNumber"
          {...register('cardNumber')}
          className="border-b border-gray-200 py-2 text-lg outline-none"
        />
        {errors.cardNumber && (
          <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="expirationDate">Expiration Date</label>
        <input
          type="text"
          placeholder="01/02"
          id="expirationDate"
          {...register('expirationDate')}
          className="border-b border-gray-200 py-2 text-lg outline-none"
        />
        {errors.expirationDate && (
          <p className="text-sm text-red-500">
            {errors.expirationDate.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          placeholder="123"
          {...register('cvv')}
          className="border-b border-gray-200 py-2 text-lg outline-none"
        />
        {errors.cvv && (
          <p className="text-sm text-red-500">{errors.cvv.message}</p>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2">
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
      <button
        type="submit"
        onClick={() => {}}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-800 p-2 text-white transition-all hover:bg-gray-900"
      >
        Checkout
        <ShoppingCart className="size-5" />
      </button>
    </form>
  );
};

export default PaymentForm;
