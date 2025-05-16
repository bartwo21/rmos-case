import { authApi } from "@/lib/api";
import { LoginFormData } from "@/app/[locale]/login/schemas/login.schema";

export const authService = {
  login: (data: LoginFormData) =>
    authApi.post<string>("/security/createToken", data),
};
