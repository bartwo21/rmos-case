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
  localeDetection: true,
});

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-storage-token")?.value;
  const { pathname } = request.nextUrl;
  const locale = pathname.split("/")[1];

  if (protectedRoutes.some((route) => pathname.includes(route)) && !authToken) {
    const url = new URL(`/${locale}/login`, request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (publicRoutes.some((route) => pathname.includes(route)) && authToken) {
    return NextResponse.redirect(new URL(`/${locale}/forecast`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // i18n
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // auth
    "/forecast/:path*",
    "/blacklist/:path*",
    "/login",
  ],
};
