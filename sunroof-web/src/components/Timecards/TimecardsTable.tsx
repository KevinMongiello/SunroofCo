import type { TimeCardWithUser } from "../../types/timecards";
import { Pencil, Trash2 } from "lucide-react";
import { Table } from "../BasicCrudTable/BasicCrudTable";

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
          <div className="actions">
            <button onClick={() => onEdit(timecard)} className="button">
              <Pencil size={16} />
            </button>
            <button className="button delete" onClick={() => onDelete(timecard.id)}>
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ]}
    getRowKey={(timecard) => timecard.id}
    className="user-table"
  />
);
