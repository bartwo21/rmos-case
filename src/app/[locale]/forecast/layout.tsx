"use client";

import RouteGuard from "@/components/auth/RouteGuard";

export default function ForecastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RouteGuard>{children}</RouteGuard>;
}
