"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useRouter as useIntlRouter,
  usePathname as useIntlPathname,
} from "@/i18n/routing";
import { locales } from "@/localizationConfig";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const [hasHydrated, setHasHydrated] = useState(false);
  const intlRouter = useIntlRouter();
  const intlPathname = useIntlPathname();
  const t = useTranslations();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const isLoggedIn = hasHydrated && !!token;

  const handleLogout = () => {
    logout();
    // Force navigation to login page
    router.push("/login");
    // Force a refresh to clear any client-side state
    window.location.href = "/login";
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLanguageChange = (locale: string) => {
    intlRouter.replace(intlPathname, { locale });
  };

  return (
    <nav className="text-white p-4 px-40 flex justify-between items-center bg-gray-100">
      <div>
        <Link href="/">
          <Image
            src="https://www.rmosyazilim.com/img/logo.png"
            alt="Rmos Logo"
            width={100}
            height={100}
          />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {isLoggedIn && (
          <>
            <Link
              href="/forecast"
              className={`text-gray-900 hover:text-sky-500 font-medium ${
                isActive("/forecast") ? "text-sky-500" : ""
              }`}
            >
              {t("navbar.forecast")}
            </Link>
            <Link
              href="/blacklist"
              className={`text-gray-900 hover:text-sky-500 font-medium ${
                isActive("/blacklist") ? "text-sky-500" : ""
              }`}
            >
              {t("navbar.blacklist")}
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <p className="text-black">
                {pathname.startsWith("/en") ? "English" : "Türkçe"}
              </p>
              <Globe className="h-5 w-5 text-gray-900" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {locales.map((locale) => (
              <DropdownMenuItem
                key={locale}
                onClick={() => handleLanguageChange(locale)}
              >
                {locale === "en" ? "English" : "Türkçe"}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {hasHydrated ? (
          isLoggedIn ? (
            <Button onClick={handleLogout}>{t("navbar.signOut")}</Button>
          ) : (
            <Link href="/login">
              <Button>{t("navbar.signIn")}</Button>
            </Link>
          )
        ) : null}
      </div>
    </nav>
  );
}
