"use client";

import React, { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ForecastItem } from "@/types/forecast";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslations } from "next-intl";

interface ForecastChartProps {
  data: ForecastItem[];
}

const formatDate = (dateString: string): string => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
  });
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    return data.slice(0, 10).map((item) => ({
      Tarih: formatDate(item.Tarih),
      originalDate: formatDate(item.Tarih),
      Oda: item.Oda,
    }));
  }, [data]);

  const t = useTranslations();

  const summaryData = useMemo(() => {
    const totalYetiskin = data.reduce(
      (sum, item) => sum + (item.Yetişkin || 0),
      0
    );
    const totalCocuk = data.reduce((sum, item) => sum + (item.Çocuk || 0), 0);
    const totalFree = data.reduce((sum, item) => sum + (item.Free || 0), 0);
    const totalOda = data.reduce((sum, item) => sum + (item.Oda || 0), 0);
    const totalGelir = data.reduce(
      (sum, item) => sum + (item["Forecast Gelir"] || 0),
      0
    );

    return {
      yetiskin: totalYetiskin,
      cocuk: totalCocuk,
      free: totalFree,
      totalOda: totalOda,
      tahminiGelir: totalGelir,
    };
  }, [data]);

  const chartConfig = {
    Oda: {
      label: "Oda",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mb-8">
        <div className="bg-gray-50 p-3 rounded-lg shadow-sm w-1/5">
          <div className="text-gray-500 text-xs">
            {t("forecast.chart.yetiskin")}
          </div>
          <div className="text-lg font-semibold">{summaryData.yetiskin}</div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg shadow-sm w-1/5">
          <div className="text-gray-500 text-xs">
            {t("forecast.chart.cocuk")}
          </div>
          <div className="text-lg font-semibold">{summaryData.cocuk}</div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg shadow-sm w-1/5">
          <div className="text-gray-500 text-xs">
            {t("forecast.chart.free")}
          </div>
          <div className="text-lg font-semibold">{summaryData.free}</div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg shadow-sm w-1/5">
          <div className="text-gray-500 text-xs">
            {t("forecast.chart.totalOda")}
          </div>
          <div className="text-lg font-semibold">{summaryData.totalOda}</div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg shadow-sm w-1/5">
          <div className="text-gray-500 text-xs">
            {t("forecast.chart.tahminiGelir")}
          </div>
          <div className="text-lg font-semibold">
            {formatCurrency(summaryData.tahminiGelir)}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-3/4 max-w-2xl">
          <ChartContainer
            config={chartConfig}
            className="min-h-[250px] w-full rounded-xl bg-background p-4"
          >
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="Tarih"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value, payload) => {
                      if (payload && payload.length > 0) {
                        return payload[0].payload.originalDate;
                      }
                      return value;
                    }}
                  />
                }
              />
              <Bar dataKey="Oda" fill="var(--color-Oda)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;
