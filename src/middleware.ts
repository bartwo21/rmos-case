import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const protectedRoutes = ["/forecast", "/blacklist"];
const publicRoutes = ["/login"];

const intlMiddleware = createIntlMiddleware({
  ...routing,
  locales: ["en", "tr"],
  defaultLocale: "en",
  localePrefix: "always",
});

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-storage-token")?.value;
  const { pathname } = request.nextUrl;

  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !authToken
  ) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (publicRoutes.includes(pathname) && authToken) {
    return NextResponse.redirect(new URL("/forecast", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
