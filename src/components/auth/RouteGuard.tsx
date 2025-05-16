"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "../ui/loading";
import Cookies from "js-cookie";

interface RouteGuardProps {
  children: React.ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookieToken = Cookies.get("auth-storage-token");

    const protectedRoutes = ["/forecast", "/blacklist"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.includes(route)
    );

    if (token || cookieToken) {
      setIsAuthorized(true);
      setLoading(false);
    } else if (isProtectedRoute) {
      router.replace(`/login?redirect=${pathname}`);
      setLoading(false);
    } else {
      setIsAuthorized(true);
      setLoading(false);
    }
  }, [token, pathname, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
