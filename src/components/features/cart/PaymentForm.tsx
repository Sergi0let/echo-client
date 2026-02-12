import { ShippingFormInputs, shippingFormSchema } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="John Doe "
          {...register("name")}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
    </form>
  );
};

export default PaymentForm;
