import { api } from "@/lib/api";
import {
  BlacklistRequestData,
  BlacklistAddUpdateRequest,
} from "@/types/blacklist";

export const blacklistService = {
  getBlacklistData: (data: BlacklistRequestData) =>
    api.post("/Kara/Getir_Kod", data),

  addOrUpdateBlacklistItem: (data: BlacklistAddUpdateRequest) =>
    api.post("/Kara/Ekle", data),
};
