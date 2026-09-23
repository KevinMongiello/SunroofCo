import type { User } from "../types/user";
import { Pencil, Trash2 } from "lucide-react";
import { Table } from "./BasicCrudTable";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => (
  <Table
    rows={users || []}
    columns={[
      {
        header: "Name",
        render: (user) => user.name,
      },
      {
        header: "Email",
        render: (user) => user.email,
      },
      {
        header: "Actions",
        render: (user) => (
          <td className="actions">
            <button onClick={() => onEdit(user)}>
              <Pencil size={16} />
            </button>
            <button className="delete" onClick={() => onDelete(user.id)}>
              <Trash2 size={16} />
            </button>
          </td>
        ),
      },
    ]}
    getRowKey={(user) => user.id}
  />
);
