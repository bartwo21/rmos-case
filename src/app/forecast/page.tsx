"use client";

import React, { useEffect } from "react";
import {
  forecastService,
  ForecastRequestData,
} from "@/services/forecastService";
import { useQuery } from "@tanstack/react-query";

const defaultForecastRequest: ForecastRequestData = {
  db_Id: 9,
  xRez_Sirket: 9,
  xBas_Tar: "2024-06-01",
  xBit_Tar: "2024-06-10",
  xtip: 1,
  kon1: "ALL",
  kon2: "BB",
  xchkFis_Fazla_otel_10: 0,
  bas_Yil: 2022,
  bit_Yil: 2022,
  fisrci_Kapalioda_10: 0,
  xRez_C_W: "C",
  xSistem_Tarihi: "2024-01-01",
  xAlis_Tarihi: "2024-01-01",
  sistem_Bas1: "2020-01-01",
  sistem_Bit1: "2029-01-01",
  pmdahil_10: 0,
  tip_1: "001",
  xFis_Bela_tutar_10: 0,
  trace_Dus_10: 0,
  cev_01: null,
};

export default function ForecastPage() {
  const forecastQuery = useQuery({
    queryKey: ["forecast"],
    queryFn: () => forecastService.getForecastData(defaultForecastRequest),
  });

  useEffect(() => {
    if (forecastQuery.data) {
      console.log("Forecast Data:", forecastQuery.data.data);
    }
    if (forecastQuery.error) {
      console.error("Forecast Error:", forecastQuery.error);
    }
  }, [forecastQuery.data, forecastQuery.error]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Forecast</h1>

      {forecastQuery.isLoading && (
        <div className="text-center">
          <p>Veriler yükleniyor...</p>
        </div>
      )}

      {forecastQuery.isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Veri yüklenirken bir hata oluştu. Lütfen konsolu kontrol edin.</p>
        </div>
      )}

      {forecastQuery.isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p>Veriler başarıyla yüklendi ve konsola yazdırıldı.</p>
          <p className="text-sm text-gray-600 mt-2">
            Verileri görmek için tarayıcı konsolunu açın (F12 veya
            Ctrl+Shift+I).
          </p>
        </div>
      )}
    </div>
  );
}
