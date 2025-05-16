"use client";

import RouteGuard from "@/components/auth/RouteGuard";

export default function BlacklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RouteGuard>{children}</RouteGuard>;
}
