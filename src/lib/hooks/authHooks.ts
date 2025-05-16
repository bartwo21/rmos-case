import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginFormData } from "@/app/[locale]/login/schemas/login.schema";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (response) => {
      setToken(response.data);
      router.push(redirectPath || "/forecast");
    },
  });
};
