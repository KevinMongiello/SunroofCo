import { useEffect, useState } from 'react';
import type { CreateTimeCardForm, TimeCard } from '../types/timecards';

interface TimecardProps {
  onSubmit: (data: CreateTimeCardForm) => void;
  initialValues: TimeCard | null;
  submitLabel: string;
  onCancel: () => void;
}

export const TimecardForm = ({ onSubmit, initialValues, submitLabel, onCancel }: TimecardProps) => {
  const [date, setDate] = useState(initialValues?.date ?? '');
  const [hoursWorked, setHoursWorked] = useState(initialValues?.hoursWorked ?? 0);

  useEffect(() => {
    setDate(initialValues?.date ?? '');
    setHoursWorked(initialValues?.hoursWorked ?? 0);
  }, [initialValues])

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    onSubmit({ date, hoursWorked });

    setDate('');
    setHoursWorked(0);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={date}
        onChange={(event) => setDate(event.target.value)}
        placeholder="Date"
      />

      <input
        value={hoursWorked}
        onChange={(event) => setHoursWorked(Number(event.target.value))}
        placeholder="HoursWorked"
      />

      <button type="button" onClick={onCancel}>Cancel</button>
      <button type="submit">{submitLabel} User</button>
    </form>
  );
}