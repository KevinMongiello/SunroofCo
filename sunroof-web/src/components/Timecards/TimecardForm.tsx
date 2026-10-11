import { z } from "zod";
import { timecardFormSchema } from "../../schemas/timecard";
import type { CreateTimeCardForm, TimeCard } from "../../types/timecards";
import { useEffect, useState } from "react";
import { DynamicForm } from "../DynamicForm/DynamicForm";

interface TimecardProps {
  onSubmit: (data: CreateTimeCardForm) => void | Promise<void>;
  initialValues: TimeCard | null;
  submitLabel: string;
  onCancel: () => void;
}

export const TimecardForm = ({
  onSubmit,
  initialValues,
  submitLabel,
  onCancel,
}: TimecardProps) => {
  const [errors, setErrors] = useState<Partial<Record<keyof CreateTimeCardForm, string[]>>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState(initialValues?.date ?? "");
  const [hoursWorked, setHoursWorked] = useState(
    String(initialValues?.hoursWorked ?? 0),
  );

  useEffect(() => {
    setErrors({});
    setSubmitError("");
    setDate(initialValues?.date ?? "");
    setHoursWorked(String(initialValues?.hoursWorked ?? 0));
  }, [initialValues]);

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    if (isSubmitting) return;

    const result = timecardFormSchema.safeParse({ date, hoursWorked });

    setSubmitError("");
    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await onSubmit(result.data);
    } catch {
      setSubmitError("Unable to save the timecard. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const dateFieldConfig = {
    id: "date",
    label: "Date",
    inputType: "date",
    onChange: setDate,
    value: date,
    error: errors.date?.[0],
  };
  const hoursWorkedFieldConfig = {
    id: "hours",
    label: "Hours Worked",
    inputType: "number",
    step: "any" as const,
    onChange: setHoursWorked,
    value: hoursWorked,
    error: errors.hoursWorked?.[0],
  };

  return (
    <DynamicForm
      fieldConfigs={[dateFieldConfig, hoursWorkedFieldConfig]}
      noValidate
      isSubmitting={isSubmitting}
      submitError={submitError}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
      cancelLabel="Cancel"
    />
  );
};
