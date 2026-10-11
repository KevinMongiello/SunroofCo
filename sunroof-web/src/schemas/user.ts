import { z } from "zod";

const hourlyRate = z.string()
  .trim()
  .min(1, "Enter an hourly rate.")
  .pipe(z.coerce.number<string>({ error: "Enter a valid number." })
    .min(0, "Hourly rates cannot be negative."));

export const userFormSchema = z.object({
  name: z.string().trim().min(1, "Enter a name."),
  email: z.string().trim().min(1, "Enter an email address.")
    .pipe(z.email({ error: "Enter a valid email address." })),
  costPerHour: hourlyRate,
  priceToCustomerPerHour: hourlyRate,
});
