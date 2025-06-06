"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { forecastService } from "@/services/forecastService";
import { Loading } from "@/components/ui/loading";
import { ForecastDataProps, ForecastResponse } from "@/types/forecast";
import { createColumns } from "./ForecastColumns";
import { DataTable } from "@/components/data-table/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForecastChart from "./ForecastChart";
import { useTranslations } from "next-intl";

export default function ForecastData({ requestData }: ForecastDataProps) {
  const [activeTab, setActiveTab] = useState("current");
  const t = useTranslations();

  const forecastQuery = useQuery<ForecastResponse>({
    queryKey: ["forecast", requestData],
    queryFn: async () => {
      const response = await forecastService.getForecastData(requestData);
      return response.data;
    },
  });

  const columns = useMemo(() => {
    if (forecastQuery.data?.value?.length) {
      return createColumns(forecastQuery.data.value, activeTab);
    }
    return [];
  }, [forecastQuery.data?.value, activeTab]);

  if (forecastQuery.isLoading) {
    return <Loading />;
  }

  if (forecastQuery.isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{t("forecast.errorLoading")}</p>
      </div>
    );
  }

  const forecastData = forecastQuery.data;

  if (!forecastData?.value?.length) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p>{t("forecast.errorData")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow lg:p-6 p-3">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-6"
      >
        <TabsList
          className={`flex flex-wrap gap-2 flex-1/2 ${
            activeTab === "chart" ? "mb-4" : "lg:-mb-10 mb-4"
          } z-10`}
        >
          <TabsTrigger value="current">
            {t("forecast.tabs.current")}
          </TabsTrigger>
          <TabsTrigger value="date">{t("forecast.tabs.date")}</TabsTrigger>
          <TabsTrigger value="detail">{t("forecast.tabs.detail")}</TabsTrigger>
          <TabsTrigger value="waiting">
            {t("forecast.tabs.waiting")}
          </TabsTrigger>
          <TabsTrigger value="location">
            {t("forecast.tabs.location")}
          </TabsTrigger>
          <TabsTrigger value="compare">
            {t("forecast.tabs.compare")}
          </TabsTrigger>
          <TabsTrigger value="chart">{t("forecast.tabs.chart")}</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {activeTab === "chart" ? (
            <ForecastChart data={forecastData.value} />
          ) : (
            <DataTable columns={columns} data={forecastData.value} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
