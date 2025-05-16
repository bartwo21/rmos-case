"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "../ui/loading";
import Cookies from "js-cookie";
import { useRouter as useIntlRouter } from "@/i18n/routing";

interface RouteGuardProps {
  children: React.ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const intlRouter = useIntlRouter();
  const token = useAuthStore((state) => state.token);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookieToken = Cookies.get("auth-storage-token");

    const locale = pathname.split("/")[1];

    const protectedRoutes = ["/forecast", "/blacklist"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.includes(route)
    );

    if (token || cookieToken) {
      setIsAuthorized(true);
      setLoading(false);
    } else if (isProtectedRoute) {
      intlRouter.push(`/login?redirect=${pathname}`);
      setLoading(false);
    } else {
      setIsAuthorized(true);
      setLoading(false);
    }
  }, [token, pathname, router, intlRouter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
