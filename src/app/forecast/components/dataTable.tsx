"use client";

import { useRef } from "react";
import { ColumnDef } from "@tanstack/react-table";
import TableHeader from "./table/TableHeader";
import TableContent from "./table/TableContent";
import TableFooter from "./table/TableFooter";
import TableToolbar from "./table/TableToolbar";
import { useTableData } from "../../../lib/hooks/useTableData";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { table, columnTotals, formatTotalValue, handlePrint } = useTableData<
    TData,
    TValue
  >({
    data,
    columns,
    tableContainerRef: tableContainerRef as React.RefObject<HTMLDivElement>,
  });

  return (
    <div className="space-y-4">
      <TableToolbar table={table} />

      <div ref={tableContainerRef} className="rounded-md border overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <TableHeader table={table} />
          <TableContent
            table={table}
            columnTotals={columnTotals}
            formatTotalValue={formatTotalValue}
          />
        </table>
      </div>

      <TableFooter table={table} handlePrint={handlePrint} />
    </div>
  );
}
