import { z } from "zod";
import { formatDate } from "../util/date.ts";

function isWithinLastSixMonths(date: string): boolean {
  // Calculate on each validation so a form left open stays current.
  const today = new Date();
  const earliest = new Date(today);
  earliest.setDate(1);
  earliest.setMonth(earliest.getMonth() - 6);
  const lastDayOfMonth = new Date(
    earliest.getFullYear(), earliest.getMonth() + 1, 0,
  ).getDate();
  // Clamp month-end dates instead of letting them roll into the next month.
  earliest.setDate(Math.min(today.getDate(), lastDayOfMonth));

  return date >= formatDate(earliest) && date <= formatDate(today);
}

export const timecardFormSchema = z.object({
  date: z.string().trim().min(1, "Enter a date.")
    .pipe(z.iso.date({ error: "Enter a valid date in YYYY-MM-DD format." })
      .refine(isWithinLastSixMonths, {
        error: "Enter a date within the last 6 months, including today. Future dates are not allowed.",
      })),
  hoursWorked: z.string().trim().min(1, "Enter hours worked.")
    .pipe(z.coerce.number<string>({ error: "Enter a valid number." })
      .min(0, "Hours worked cannot be negative.")
      .max(8, "Timecards cannot exceed 8 hours. Overtime requires a manager override.")),
});
