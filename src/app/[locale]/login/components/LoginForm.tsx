"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { useLogin } from "@/lib/hooks/authHooks";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const login = useLogin();
  const [showError, setShowError] = useState(false);
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login.mutate(data);
  };

  useEffect(() => {
    if (login.error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [login.error]);

  return (
    <Card className="w-[400px] shadow-2xl bg-white/95 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl">{t("login.title")}</CardTitle>
        <CardDescription>{t("login.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="userName">{t("login.email")}</Label>
            <Input
              id="userName"
              type="email"
              placeholder={t("login.emailPlaceholder")}
              className={`h-12 ${errors.userName ? "border-red-500" : ""}`}
              disabled={login.isPending}
              {...register("userName")}
            />
            {errors.userName && (
              <p className="text-sm text-red-500">{errors.userName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("login.password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("login.passwordPlaceholder")}
              className={`h-12 ${errors.password ? "border-red-500" : ""}`}
              disabled={login.isPending}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {showError && login.error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {t("login.error")}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            disabled={login.isPending}
          >
            {login.isPending ? t("login.loading") : t("login.button")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
