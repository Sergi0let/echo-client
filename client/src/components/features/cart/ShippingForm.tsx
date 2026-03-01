import { ShippingFormInputs, shippingFormSchema } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";

type ShippingFormProp = {
  setShippingForm: (data: ShippingFormInputs) => void;
};

const ShippingForm = ({ setShippingForm }: ShippingFormProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });

  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    if (data) {
      setShippingForm(data);
    }

    router.push("/cart?step=3", { scroll: false });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleShippingForm)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs font-medium text-gray-500">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          placeholder="John Doe"
          className="border-b border-gray-200 py-2 text-lg outline-none"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs font-medium text-gray-500">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="johndo@mail.com"
          className="border-b border-gray-200 py-2 text-lg outline-none"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs font-medium text-gray-500">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          {...register("phone")}
          placeholder="123456"
          className="border-b border-gray-200 py-2 text-lg outline-none"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs font-medium text-gray-500">
          Address
        </label>
        <input
          type="text"
          id="address"
          {...register("address")}
          placeholder="John Doe"
          className="border-b border-gray-200 py-2 text-lg outline-none"
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs font-medium text-gray-500">
          Address
        </label>
        <input
          type="text"
          id="city"
          {...register("city")}
          placeholder="London"
          className="border-b border-gray-200 py-2 text-lg outline-none"
        />
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>
      <button
        type="submit"
        onClick={() => {}}
        className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-gray-800 p-2 text-white transition-all hover:bg-gray-900"
      >
        Continue
        <ArrowRight className="size-3" />
      </button>
    </form>
  );
};

export default ShippingForm;
