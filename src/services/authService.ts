import { authApi } from "@/lib/api";
import { LoginFormData } from "@/app/login/schemas/login.schema";

export const authService = {
  login: (data: LoginFormData) =>
    authApi.post<string>("/security/createToken", data),
};
