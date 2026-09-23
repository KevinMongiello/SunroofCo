import type { User } from '../types/user';
import { Pen, Pencil, Trash2 } from 'lucide-react';
import './UserTable.scss';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export function UsersTable({
  users,
  onEdit,
  onDelete,
}: UsersTableProps) {
  return (
    <table className='user-table table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className='actions'>
              <button onClick={() => onEdit(user)}>
                <Pencil size={16} />
              </button>

              <button className='delete' onClick={() => onDelete(user.id)}>
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}