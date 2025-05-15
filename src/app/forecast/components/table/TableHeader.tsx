"use client";

import { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

interface TableHeaderProps<TData> {
  table: Table<TData>;
}

export default function TableHeader<TData>({ table }: TableHeaderProps<TData>) {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="h-12 px-4 font-medium whitespace-nowrap"
              style={{
                minWidth: `${header.column.getSize()}px`,
                width: `${header.column.getSize()}px`,
              }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
