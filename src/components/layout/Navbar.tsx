"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const isLoggedIn = hasHydrated && !!token;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isActive = (path: string) => {
    return pathname === path;
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
              Forecast
            </Link>
            <Link
              href="/blacklist"
              className={`text-gray-900 hover:text-sky-500 font-medium ${
                isActive("/blacklist") ? "text-sky-500" : ""
              }`}
            >
              Blacklist
            </Link>
          </>
        )}
      </div>

      <div>
        {hasHydrated ? (
          isLoggedIn ? (
            <Button onClick={handleLogout}>Sign out</Button>
          ) : (
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          )
        ) : null}
      </div>
    </nav>
  );
}
