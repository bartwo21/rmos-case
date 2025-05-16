"use client";

import { Table, flexRender } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

interface TableContentProps<TData> {
  table: Table<TData>;
  columnTotals: Record<string, number>;
  formatTotalValue: (columnId: string, value: number) => string;
}

export default function TableContent<TData>({
  table,
  columnTotals,
  formatTotalValue,
}: TableContentProps<TData>) {
  const t = useTranslations();
  return (
    <tbody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className="border-b transition-colors hover:bg-muted/50"
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="p-4 align-middle whitespace-nowrap overflow-hidden text-ellipsis text-center"
                style={{
                  minWidth: `${cell.column.getSize()}px`,
                  width: `${cell.column.getSize()}px`,
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={table.getAllColumns().length}
            className="h-24 text-center"
          >
            {t("forecast.tableContent.noData")}
          </td>
        </tr>
      )}

      {table.getRowModel().rows?.length > 0 && (
        <tr className="bg-muted/50 font-medium">
          {table.getVisibleLeafColumns().map((column) => {
            const hasTotal = columnTotals[column.id] !== undefined;

            return (
              <td
                key={`total-${column.id}`}
                className="p-4 align-middle whitespace-nowrap overflow-hidden text-ellipsis text-center"
                style={{
                  minWidth: `${column.getSize()}px`,
                  width: `${column.getSize()}px`,
                }}
              >
                {hasTotal
                  ? formatTotalValue(column.id, columnTotals[column.id])
                  : ""}
              </td>
            );
          })}
        </tr>
      )}
    </tbody>
  );
}
