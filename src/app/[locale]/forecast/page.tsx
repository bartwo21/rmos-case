"use client";

import React, { Suspense, lazy } from "react";
import { Loading } from "@/components/ui/loading";
import { ForecastRequestData } from "@/types/forecast";
import { useTranslations } from "next-intl";

const ForecastData = lazy(() => import("./components/ForecastData"));

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

export default function page() {
  const t = useTranslations();
  return (
    <div className="lg:p-8 p-4 mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6 w-full text-left">
        {t("forecast.title")}
      </h1>

      <Suspense fallback={<Loading />}>
        <ForecastData requestData={defaultForecastRequest} />
      </Suspense>
    </div>
  );
}
