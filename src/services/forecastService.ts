import { api } from "@/lib/api";
import { ForecastRequestData } from "@/types/forecast";

export const forecastService = {
  getForecastData: (data: ForecastRequestData) =>
    api.post("/Procedure/StpRmforKlasik_2", data),
};
