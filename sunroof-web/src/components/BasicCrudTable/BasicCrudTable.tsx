import type { Column } from "../../types/table";
import cn from "classnames";
import './BasicCrudTable.css'

interface TableProps<T> {
  rows: T[];
  columns: Column<T>[];
  getRowKey: (row: T) => string;
  className?: string;
}

export function Table<T>({
  rows,
  columns,
  getRowKey,
  className,
}: TableProps<T>) {
  return (
    <table className={cn("table crud-table", className)}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={getRowKey(row)}>
            {columns.map((column) => (
              <td key={column.header}>{column.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
