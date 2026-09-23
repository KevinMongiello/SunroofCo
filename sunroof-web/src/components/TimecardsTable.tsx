import { Pencil, Trash2 } from "lucide-react";
import { Table } from "./BasicCrudTable";
import type { TimeCardWithUser } from "../types/timecards";

interface TimecardTableProps {
  timecards: TimeCardWithUser[];
  onEdit: (timecard: TimeCardWithUser) => void;
  onDelete: (timecardId: string) => void;
}

export const TimecardsTable = ({
  timecards,
  onEdit,
  onDelete,
}: TimecardTableProps) => (
  <Table
    rows={timecards || []}
    columns={[
      {
        header: "Date",
        render: (timecard) => timecard.date,
      },
      {
        header: "Name",
        render: (timecard) => timecard.user.name,
      },
      {
        header: "Hours",
        render: (timecard) => timecard.hoursWorked,
      },
      {
        header: "Actions",
        render: (timecard) => (
          <td className="actions">
            <button onClick={() => onEdit(timecard)}>
              <Pencil size={16} />
            </button>
            <button className="delete" onClick={() => onDelete(timecard.id)}>
              <Trash2 size={16} />
            </button>
          </td>
        ),
      },
    ]}
    getRowKey={(timecard) => timecard.id}
    className="user-table"
  />
);
