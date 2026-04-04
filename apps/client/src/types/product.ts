import z from 'zod';

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, 'Card holder is required'),
  cardNumber: z
    .string()
    .min(16, 'Card Number is required')
    .max(16, 'Card Number is required'),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration date must be in MM/YY!'),
  cvv: z.string().min(3, 'CVV is required').max(3, 'CVV is required'),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;
