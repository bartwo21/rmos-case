import { z } from "zod";

export const loginSchema = z.object({
  userName: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters long"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
