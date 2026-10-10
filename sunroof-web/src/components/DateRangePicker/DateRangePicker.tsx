import type { DateRange as ApiDateRange } from "../../types/date";
import { useState } from "react";
import { DayPicker, type DateRange } from '@daypicker/react';
import { CalendarDays, ChevronDown } from "lucide-react";
import { formatDate } from "../../util/date";
import '@daypicker/react/style.css';
import './DateRangePicker.css'

type DateRangePickerProps = {
  dateRange: ApiDateRange;
  onChange: (dateRange: ApiDateRange) => void;
};

function parseDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day);
}

export function DateRangePicker({
  dateRange: { startDate, endDate },
  onChange,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const [range, setRange] = useState<DateRange>({
    from: parseDate(startDate),
    to: parseDate(endDate),
  });

  function handleApply() {
    if (!range.from || !range.to) return;

    onChange({
      startDate: formatDate(range.from),
      endDate: formatDate(range.to),
    });

    setOpen(false);
  }

  return (
    <div className="date-range-picker">
      <button
        className="date-range-picker__trigger"
        onClick={() => setOpen((value) => !value)}
      >
        <CalendarDays size={18} />

        <span>
          {startDate} – {endDate}
        </span>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="date-range-picker__popover">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            required
            resetOnSelect
            disabled={{ after: new Date() }}
          />

          <div className="date-range-picker__actions">
            <button onClick={() => setOpen(false)}>Cancel</button>

            <button disabled={!range?.from || !range?.to} onClick={handleApply}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}
