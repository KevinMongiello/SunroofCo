import { useEffect, useState } from "react";
import type { CreateUser, User } from "../../types/user";
import { DynamicForm } from "../DynamicForm/DynamicForm";

interface UserFormProps {
  onSubmit: (data: CreateUser) => void;
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
  const [name, setName] = useState(initialValues?.name ?? "");
  const [email, setEmail] = useState(initialValues?.email ?? "");
  const [costPerHour, setCostPerHour] = useState(initialValues?.costPerHour ?? 0);
  const [priceToCustomerPerHour, setPriceToCustomerPerHour] = useState(initialValues?.priceToCustomerPerHour ?? 0);

  useEffect(() => {
    setName(initialValues?.name ?? "");
    setEmail(initialValues?.email ?? "");
  }, [initialValues]);

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    onSubmit({ name, email, costPerHour, priceToCustomerPerHour });

    setName("");
    setEmail("");
    setCostPerHour(0);
    setPriceToCustomerPerHour(0);
  }

  const nameFieldConfig = {
    id: "name",
    label: "Name",
    inputType: "text",
    onChange: setName,
    placeholder: "Adam Brady",
    value: name,
  };
  const emailFieldConfig = {
    id: "email",
    label: "Email",
    inputType: "text",
    onChange: setEmail,
    value: email,
  };
  const costPerHourFieldConfig = {
    id: "costPerHour",
    label: "Cost Per Hour",
    inputType: "text",
    onChange: (data: string) => setCostPerHour(Number(data)),
    value: costPerHour,
  };
  const priceToCustomerPerHourFieldConfig = {
    id: "priceToCustomerPerHour",
    label: "Set Price To Customer Per Hour",
    inputType: "text",
    onChange: (data: string) => setPriceToCustomerPerHour(Number(data)),
    value: priceToCustomerPerHour,
  };

  return (
    <DynamicForm
      fieldConfigs={[nameFieldConfig, emailFieldConfig, costPerHourFieldConfig, priceToCustomerPerHourFieldConfig]}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
      cancelLabel="Cancel"
    />
  );
};
