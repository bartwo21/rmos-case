import { z } from "zod";

export const blacklistFormSchema = z.object({
  Adi: z.string().min(1, "Ad alanı zorunludur"),
  Soy: z.string().min(1, "Soyad alanı zorunludur"),
  Aciklama: z.string().optional(),
});
