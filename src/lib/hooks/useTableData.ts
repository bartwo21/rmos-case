"use client";

import { useState, useEffect, useMemo, RefObject } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";

interface UseTableDataProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  tableContainerRef: RefObject<HTMLDivElement>;
}

export function useTableData<TData, TValue>({
  data,
  columns,
  tableContainerRef,
}: UseTableDataProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    manualSorting: true,
  });

  useEffect(() => {
    if (tableContainerRef.current) {
      const containerWidth = tableContainerRef.current.offsetWidth;
      const visibleColumns = table.getVisibleLeafColumns().length;
      if (visibleColumns > 0) {
        const columnWidth = Math.floor(containerWidth / visibleColumns);
        table.getAllColumns().forEach((column) => {
          column.columnDef.size = columnWidth;
        });
        table.setColumnSizing({});
      }
    }
  }, [table, columnVisibility, tableContainerRef.current?.offsetWidth]);

  useEffect(() => {
    if (sorting.length > 0) {
      table.getRowModel().rows.sort((a, b) => {
        const columnId = sorting[0].id;
        const desc = sorting[0].desc;

        const valueA = a.getValue(columnId) as string | number | Date;
        const valueB = b.getValue(columnId) as string | number | Date;

        if (valueA < valueB) return desc ? 1 : -1;
        if (valueA > valueB) return desc ? -1 : 1;
        return 0;
      });

      table.setColumnSizing({ ...table.getState().columnSizing });
    }
  }, [sorting, table.getState().pagination.pageIndex]);

  const columnTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    const visibleColumns = table.getVisibleLeafColumns();

    table.getRowModel().rows.forEach((row) => {
      visibleColumns.forEach((column) => {
        const value = row.getValue(column.id);

        if (typeof value === "number") {
          totals[column.id] = (totals[column.id] || 0) + value;
        }
      });
    });

    return totals;
  }, [table.getRowModel().rows, table.getVisibleLeafColumns()]);

  const formatTotalValue = (columnId: string, value: number): string => {
    if (columnId === "Doviz Tutar") {
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "EUR",
      }).format(value);
    }

    if (
      ["Brut Tutar", "TL Gerçek", "Forecast Gelir", "Package Tutar"].some(
        (currency) => columnId.includes(currency)
      )
    ) {
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
      }).format(value);
    }

    if (columnId.includes("%")) {
      return (value * 100).toFixed(2) + "%";
    }

    return new Intl.NumberFormat("tr-TR").format(value);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const visibleColumns = table.getVisibleLeafColumns();
    const currentPageRows = table.getRowModel().rows;

    let htmlContent = `
      <html>
        <head>
          <title>Forecast Data</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
            .total-row { font-weight: bold; background-color: #f8f8f8; }
            h1 { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
    `;

    visibleColumns.forEach((column) => {
      htmlContent += `<th>${column.id}</th>`;
    });

    htmlContent += `
              </tr>
            </thead>
            <tbody>
    `;

    currentPageRows.forEach((row) => {
      htmlContent += "<tr>";
      visibleColumns.forEach((column) => {
        const value = row.getValue(column.id);
        let formattedValue = "";

        if (typeof value === "number") {
          if (column.id === "Doviz Tutar") {
            formattedValue = new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "EUR",
            }).format(value);
          } else if (
            ["Brut Tutar", "TL Gerçek", "Forecast Gelir", "Package Tutar"].some(
              (c) => column.id.includes(c)
            )
          ) {
            formattedValue = new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(value);
          } else if (column.id.includes("%")) {
            formattedValue = (value * 100).toFixed(2) + "%";
          } else {
            formattedValue = new Intl.NumberFormat("tr-TR").format(value);
          }
        } else {
          formattedValue = value?.toString() || "";
        }

        htmlContent += `<td>${formattedValue}</td>`;
      });
      htmlContent += "</tr>";
    });

    const pageTotals: Record<string, number> = {};
    currentPageRows.forEach((row) => {
      visibleColumns.forEach((column) => {
        const value = row.getValue(column.id);

        if (typeof value === "number") {
          pageTotals[column.id] = (pageTotals[column.id] || 0) + value;
        }
      });
    });

    htmlContent += '<tr class="total-row">';
    visibleColumns.forEach((column) => {
      const hasTotal = pageTotals[column.id] !== undefined;
      const value = hasTotal
        ? formatTotalValue(column.id, pageTotals[column.id])
        : "";
      htmlContent += `<td>${value}</td>`;
    });
    htmlContent += "</tr>";

    htmlContent += `
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();

    printWindow.addEventListener("load", () => {
      printWindow.print();

      printWindow.addEventListener("afterprint", () => {
        printWindow.close();
      });

      setTimeout(() => {
        if (!printWindow.closed) {
          printWindow.close();
        }
      }, 2000);
    });
  };

  return {
    table,
    columnTotals,
    formatTotalValue,
    handlePrint,
  };
}
