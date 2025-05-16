"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/localizationConfig";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const { token, isLoading, logout } = useAuthStore();
  const [hasHydrated, setHasHydrated] = useState(false);
  const intlRouter = useRouter();
  const intlPathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const isLoggedIn = hasHydrated && !!token;

  const handleLogout = () => {
    logout();
    intlRouter.push("/login");
  };

  const isActive = (path: string) => {
    return intlPathname === path;
  };

  const handleLanguageChange = (locale: string) => {
    intlRouter.replace(intlPathname, { locale });
  };

  const NavLinks = () => (
    <>
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
    </>
  );

  return (
    <nav className="text-white p-4 px-4 md:px-40 flex justify-between items-center bg-gray-100">
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

      <div className="hidden md:flex items-center space-x-4">
        <NavLinks />
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <p className="text-black">
                {currentLocale === "en" ? "English" : "Türkçe"}
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
            <Button onClick={handleLogout} disabled={isLoading}>
              {t("navbar.signOut")}
            </Button>
          ) : (
            <Link href="/login">
              <Button>{t("navbar.signIn")}</Button>
            </Link>
          )
        ) : null}
      </div>

      <div className="md:hidden flex items-center">
        <MobileMenu
          isLoggedIn={isLoggedIn}
          pathname={pathname}
          handleLanguageChange={handleLanguageChange}
          handleLogout={handleLogout}
          NavLinks={NavLinks}
          hasHydrated={hasHydrated}
          isLoading={isLoading}
        />
      </div>
    </nav>
  );
}
