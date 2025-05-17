"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ForecastItem } from "@/types/forecast";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tabColumnSets } from "@/constants/forecast";

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy", { locale: tr });
  } catch {
    return dateString;
  }
};

const formatPercentage = (value: number) => {
  return (value * 100).toFixed(2) + "%";
};

const formatCurrency = (value: number, currency: string = "TRY") => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency,
  }).format(value);
};

const formatValue = (
  key: string,
  value: string | number | null | undefined
): string => {
  if (value === null || value === undefined) return "-";

  if ((key === "Tarih" || key === "TarihAy") && typeof value === "string") {
    return formatDate(value);
  }

  if (
    typeof key === "string" &&
    key.includes("%") &&
    typeof value === "number"
  ) {
    return formatPercentage(value);
  }

  if (key === "Doviz Tutar" && typeof value === "number") {
    return formatCurrency(value, "EUR");
  }

  if (
    ["Brut Tutar", "TL Gerçek", "Forecast Gelir", "Package Tutar"].some(
      (currency) => key.includes(currency)
    ) &&
    typeof value === "number"
  ) {
    return formatCurrency(value);
  }

  return String(value);
};

export function createColumns(
  data: ForecastItem[],
  activeTab: string = "mevcut"
): ColumnDef<ForecastItem>[] {
  if (!data || data.length === 0) {
    return [];
  }

  const sampleItem = data[0];
  const allKeys = Object.keys(sampleItem);

  const excludedColumns = [
    "Kon.Vergisi%",
    "Ort.Pax(Prm)",
    "Package Kon.Vergisi",
  ];

  const tabColumns = tabColumnSets[activeTab] || allKeys;

  const filteredKeys = tabColumns.filter(
    (key) => allKeys.includes(key) && !excludedColumns.includes(key)
  );

  return filteredKeys.map((key) => {
    const isDateColumn = key === "Tarih" || key === "TarihAy";
    const isPercentColumn = key.includes("%");

    const formatHeader = (key: string): string => {
      return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    };

    return {
      accessorKey: key,
      header: ({ column }) => {
        if (isDateColumn || isPercentColumn) {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                if (isDateColumn && !column.getIsSorted()) {
                  column.toggleSorting(true);
                } else {
                  column.toggleSorting(column.getIsSorted() === "asc");
                }
              }}
            >
              {formatHeader(key)}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        }
        return formatHeader(key);
      },
      cell: ({ row }) => {
        const value = row.getValue(key);
        return formatValue(key, value as string | number | null | undefined);
      },
      size: 50,
    };
  });
}
