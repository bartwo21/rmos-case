"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BlacklistItem } from "@/types/blacklist";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export function createBlacklistColumns(
  data: BlacklistItem[]
): ColumnDef<BlacklistItem>[] {
  if (!data || data.length === 0) return [];

  const allKeys = Array.from(
    new Set(data.flatMap((item) => Object.keys(item)))
  ).filter((key) => key !== "Id");

  return allKeys.map((key) => ({
    accessorKey: key,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className=""
      >
        {key}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue(key)?.toString() || ""}</div>,
  }));
}
