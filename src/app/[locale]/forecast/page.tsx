"use client";

import React, { Suspense, lazy } from "react";
import { Loading } from "@/components/ui/loading";
import { useTranslations } from "next-intl";
import { defaultForecastRequest } from "@/constants/forecast";

const ForecastData = lazy(() => import("./components/ForecastData"));

export default function ForecastPage() {
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
