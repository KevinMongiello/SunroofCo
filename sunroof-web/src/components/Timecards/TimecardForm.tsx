import type { CreateTimeCardForm, TimeCard } from "../../types/timecards";
import { useEffect, useState } from "react";
import { DynamicForm } from "../DynamicForm/DynamicForm";

interface TimecardProps {
  onSubmit: (data: CreateTimeCardForm) => void;
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
  const [date, setDate] = useState(initialValues?.date ?? "");
  const [hoursWorked, setHoursWorked] = useState(
    initialValues?.hoursWorked ?? 0,
  );

  useEffect(() => {
    setDate(initialValues?.date ?? "");
    setHoursWorked(initialValues?.hoursWorked ?? 0);
  }, [initialValues]);

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    onSubmit({ date, hoursWorked });

    setDate("");
    setHoursWorked(0);
  }

  const dateFieldConfig = {
    id: "date",
    label: "Date",
    inputType: "text",
    onChange: setDate,
    placeholder: "1970-01-01",
    value: date,
  };
  const hoursWorkedFieldConfig = {
    id: "hours",
    label: "Hours Worked",
    inputType: "text",
    onChange: (data: string) => {
      setHoursWorked(Number(data));
    },
    value: hoursWorked,
  };

  return (
    <DynamicForm
      fieldConfigs={[dateFieldConfig, hoursWorkedFieldConfig]}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
      cancelLabel="Cancel"
    />
  );
};
