import { z } from "zod";
import { userFormSchema } from "../../schemas/user";
import type { CreateUser, User } from "../../types/user";
import { useEffect, useState } from "react";
import { DynamicForm } from "../DynamicForm/DynamicForm";

// TODO: Share these defaults with the backend instead of duplicating them here.
const DEFAULT_COST_PER_HOUR = 25;
const DEFAULT_PRICE_TO_CUSTOMER_PER_HOUR = 50;

interface UserFormProps {
  onSubmit: (data: CreateUser) => void | Promise<void>;
  initialValues: User | null;
  submitLabel: string;
  onCancel: () => void;
}

export const UserForm = ({
  onSubmit,
  initialValues,
  submitLabel,
  onCancel,
}: UserFormProps) => {
  const [errors, setErrors] = useState<Partial<Record<keyof CreateUser, string[]>>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(initialValues?.name ?? "");
  const [email, setEmail] = useState(initialValues?.email ?? "");
  const [costPerHour, setCostPerHour] = useState(
    String(initialValues?.costPerHour ?? DEFAULT_COST_PER_HOUR),
  );
  const [priceToCustomerPerHour, setPriceToCustomerPerHour] = useState(
    String(initialValues?.priceToCustomerPerHour ?? DEFAULT_PRICE_TO_CUSTOMER_PER_HOUR),
  );

  useEffect(() => {
    setErrors({});
    setSubmitError("");
    setName(initialValues?.name ?? "");
    setEmail(initialValues?.email ?? "");
    setCostPerHour(String(initialValues?.costPerHour ?? DEFAULT_COST_PER_HOUR));
    setPriceToCustomerPerHour(
      String(initialValues?.priceToCustomerPerHour ?? DEFAULT_PRICE_TO_CUSTOMER_PER_HOUR),
    );
  }, [initialValues]);

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    if (isSubmitting) return;

    const result = userFormSchema.safeParse({
      name,
      email,
      costPerHour,
      priceToCustomerPerHour,
    });

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
      setSubmitError("Unable to save the user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const nameFieldConfig = {
    id: "name",
    label: "Name",
    inputType: "text",
    onChange: setName,
    placeholder: "Adam Brady",
    value: name,
    error: errors.name?.[0],
  };
  const emailFieldConfig = {
    id: "email",
    label: "Email",
    inputType: "text",
    onChange: setEmail,
    value: email,
    error: errors.email?.[0],
  };
  const costPerHourFieldConfig = {
    id: "costPerHour",
    label: "Cost Per Hour",
    inputType: "number",
    step: "any" as const,
    onChange: (data: string) => setCostPerHour(data),
    value: costPerHour,
    error: errors.costPerHour?.[0],
  };
  const priceToCustomerPerHourFieldConfig = {
    id: "priceToCustomerPerHour",
    label: "Set Price To Customer Per Hour",
    inputType: "number",
    step: "any" as const,
    onChange: (data: string) => setPriceToCustomerPerHour(data),
    value: priceToCustomerPerHour,
    error: errors.priceToCustomerPerHour?.[0],
  };

  return (
    <DynamicForm
      fieldConfigs={[
        nameFieldConfig,
        emailFieldConfig,
        costPerHourFieldConfig,
        priceToCustomerPerHourFieldConfig,
      ]}
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
