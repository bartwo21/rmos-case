"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";
import { Menu, Globe } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales } from "@/i18n/localizationConfig";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

interface MobileMenuProps {
  isLoggedIn: boolean;
  pathname: string;
  handleLanguageChange: (locale: string) => void;
  handleLogout: () => void;
  NavLinks: React.FC;
  hasHydrated: boolean;
  isLoading: boolean;
}

export default function MobileMenu({
  isLoggedIn,
  pathname,
  handleLanguageChange,
  handleLogout,
  NavLinks,
  hasHydrated,
  isLoading,
}: MobileMenuProps) {
  const t = useTranslations();
  const currentLocale = useLocale();
  const [open, setOpen] = useState(false);

  const handleLogoutClick = () => {
    handleLogout();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6 text-gray-900" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px]">
        <SheetTitle className="text-2xl font-bold mt-2 ml-4 border-b border-gray-200 pb-2">
          {t("navbar.menu")}
        </SheetTitle>
        <div className="flex flex-col space-y-4 px-4">
          <NavLinks />
          <div className="flex flex-col space-y-4 mt-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
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
                <Button
                  onClick={handleLogoutClick}
                  className="w-full"
                  disabled={isLoading}
                >
                  {t("navbar.signOut")}
                </Button>
              ) : (
                <Link href="/login" className="w-full">
                  <Button className="w-full">{t("navbar.signIn")}</Button>
                </Link>
              )
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
