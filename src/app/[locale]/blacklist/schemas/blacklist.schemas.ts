import { z } from "zod";

export const createBlacklistFormSchema = (t: any) =>
  z.object({
    Adi: z
      .string()
      .min(1, t("blacklist.errors.nameRequired") || "Name is required"),
    Soy: z
      .string()
      .min(1, t("blacklist.errors.surnameRequired") || "Surname is required"),
    Aciklama: z.string().optional(),
  });

export type FormValues = z.infer<ReturnType<typeof createBlacklistFormSchema>>;
