"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { forecastService } from "@/services/forecastService";
import { Loading } from "@/components/ui/loading";
import { ForecastDataProps, ForecastResponse } from "@/types/forecast";
import { createColumns } from "./Columns";
import { DataTable } from "./dataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForecastChart from "./ForecastChart";

const ForecastData: React.FC<ForecastDataProps> = ({ requestData }) => {
  const [activeTab, setActiveTab] = useState("current");

  const forecastQuery = useQuery<ForecastResponse>({
    queryKey: ["forecast", requestData],
    queryFn: async () => {
      const response = await forecastService.getForecastData(requestData);
      return response.data;
    },
  });

  useEffect(() => {
    if (forecastQuery.data) {
      console.log("Forecast Data:", forecastQuery.data);
    }
    if (forecastQuery.error) {
      console.error("Forecast Error:", forecastQuery.error);
    }
  }, [forecastQuery.data, forecastQuery.error]);

  const columns = useMemo(() => {
    if (forecastQuery.data?.value?.length) {
      return createColumns(forecastQuery.data.value, activeTab);
    }
    return [];
  }, [forecastQuery.data?.value, activeTab]);

  if (forecastQuery.isLoading) {
    return <Loading message="Loading Forecast..." />;
  }

  if (forecastQuery.isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error Loading Forecast, Please try again later.</p>
      </div>
    );
  }

  const forecastData = forecastQuery.data;

  if (!forecastData?.value?.length) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p>No forecast data available for the selected criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-6"
      >
        <TabsList
          className={`grid grid-cols-7 ${
            activeTab === "chart" ? "mb-4" : "-mb-10"
          } z-10`}
        >
          <TabsTrigger value="current">Current Forecast</TabsTrigger>
          <TabsTrigger value="date">Date Forecast</TabsTrigger>
          <TabsTrigger value="detail">Detail Forecast</TabsTrigger>
          <TabsTrigger value="waiting">Waiting Forecast</TabsTrigger>
          <TabsTrigger value="location">Location Forecast</TabsTrigger>
          <TabsTrigger value="compare">Current Compare</TabsTrigger>
          <TabsTrigger value="chart">Forecast Chart</TabsTrigger>
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
};

export default ForecastData;
