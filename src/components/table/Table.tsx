import React, { useState, useMemo } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  showIndex?: boolean;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  currentPage?: number;
  rowsPerPage?: number;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  showIndex = false,
  onView,
  onEdit,
  onDelete,
  currentPage = 1,
  rowsPerPage = 10,
  className = "",
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  const handleSort = (columnKey: keyof T) => {
    if (sortColumn === columnKey) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
      );
      if (sortDirection === "desc") setSortColumn(null);
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      return sortDirection === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [data, sortColumn, sortDirection]);

  const colSpan =
    columns.length +
    (showIndex ? 1 : 0) +
    (onView || onEdit || onDelete ? 1 : 0);

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full border-separate border-spacing-y-2 table-auto">
        <thead className="sticky top-0 bg-blue-500 dark:bg-blue-900 text-white dark:text-blue-100">
          <tr>
            {showIndex && (
              <th className="px-4 py-3 text-left font-semibold rounded-l-lg">
                No
              </th>
            )}
            {columns.map((column, i) => {
              const isLastColumn = columns.length === i + 1;
              const thClass =
                "px-2 py-1 text-left font-semibold whitespace-nowrap" +
                (isLastColumn && !onView && !onEdit && !onDelete
                  ? " rounded-r-lg"
                  : "") +
                (!showIndex && i === 0 ? " rounded-l-lg" : "");

              return (
                <th key={String(column.label)} className={thClass}>
                  <button
                    onClick={
                      column.sortable ? () => handleSort(column.key) : undefined
                    }
                    className={`px-2 py-1 ${
                      column.sortable ? "cursor-pointer hover:underline" : ""
                    }`}
                  >
                    {column.label}
                    {sortColumn === column.key && (
                      <span>
                        {sortDirection === "asc"
                          ? " ↑"
                          : sortDirection === "desc"
                          ? " ↓"
                          : ""}
                      </span>
                    )}
                  </button>
                </th>
              );
            })}
            {(onView || onEdit || onDelete) && (
              <th className="px-4 py-2 text-left font-semibold rounded-r-lg">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {!isLoading && (
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, rowIndex) => (
                <motion.tr
                  layout
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  key={(row as any).id}
                  className="bg-blue-50 dark:bg-neutral-800  rounded"
                >
                  {showIndex && (
                    <td className="px-4 py-3 rounded-l-lg ">
                      {(currentPage - 1) * rowsPerPage + rowIndex + 1}
                    </td>
                  )}
                  {columns.map((column, i) => {
                    const isLastColumn = columns.length === i + 1;
                    const tdClass =
                      "px-4 py-2  whitespace-nowrap" +
                      (isLastColumn && !onView && !onEdit && !onDelete
                        ? " rounded-r-lg "
                        : "") +
                      (!showIndex && i === 0 ? " rounded-l-lg" : "");

                    return (
                      <td key={String(column.label)} className={tdClass}>
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key])}
                      </td>
                    );
                  })}
                  {(onView || onEdit || onDelete) && (
                    <td className="px-4 py-2 rounded-r-lg flex gap-2 w-fit">
                      {onView && (
                        <button
                          className="p-2 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-md transition cursor-pointer"
                          onClick={() => onView(row)}
                        >
                          <Eye
                            size={16}
                            className="text-blue-800 dark:text-blue-100"
                          />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          className="p-2 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-md transition cursor-pointer"
                          onClick={() => onEdit(row)}
                        >
                          <Pencil
                            size={16}
                            className="text-blue-800 dark:text-blue-100"
                          />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="p-2 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 rounded-md transition cursor-pointer"
                          onClick={() => onDelete(row)}
                        >
                          <Trash2
                            size={16}
                            className="text-red-600 dark:text-red-300"
                          />
                        </button>
                      )}
                    </td>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={colSpan}
                  className="text-center py-4 text-blue-600 dark:text-blue-300"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>

      {isLoading && (
        <div className="py-4 text-center text-sm text-blue-600 dark:text-blue-300">
          Loading...
        </div>
      )}
    </div>
  );
}
