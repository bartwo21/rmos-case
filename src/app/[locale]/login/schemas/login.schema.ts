import { z } from "zod";

type Translator = (key: string, params?: Record<string, string>) => string;

export const createLoginSchema = (t: Translator) =>
  z.object({
    userName: z
      .string()
      .min(1, t("login.errors.emailRequired") || "Email is required")
      .email(t("login.errors.emailInvalid") || "Enter a valid email address"),
    password: z
      .string()
      .min(1, t("login.errors.passwordRequired") || "Password is required")
      .min(
        4,
        t("login.errors.passwordLength") ||
          "Password must be at least 4 characters long"
      ),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
