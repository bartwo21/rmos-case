"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BlacklistItem } from "@/types/blacklist";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export function createBlacklistColumns(): ColumnDef<BlacklistItem>[] {
  return [
    {
      accessorKey: "Id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("Id")}</div>
      ),
      size: 80,
    },
    {
      accessorKey: "Adi",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("Adi")}</div>,
      size: 150,
    },
    {
      accessorKey: "Soy",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Surname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("Soy")}</div>,
      size: 150,
    },
    {
      accessorKey: "Aciklama",
      header: "Description",
      cell: ({ row }) => <div>{row.getValue("Aciklama")}</div>,
      size: 300,
    },
  ];
}
