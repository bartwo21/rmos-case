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

  const response = intlMiddleware(request);

  const redirectPath = response.headers.get("Location");

  if (redirectPath) {
    const redirectUrl = new URL(redirectPath);
    const redirectPathname = redirectUrl.pathname;

    if (
      protectedRoutes.some((route) => redirectPathname.includes(route)) &&
      !authToken
    ) {
      const url = new URL(
        redirectUrl.pathname.replace(/\/forecast|\/blacklist/, "/login"),
        request.url
      );
      url.searchParams.set("redirect", redirectPathname);
      return NextResponse.redirect(url);
    }

    if (redirectPathname.includes("/login") && authToken) {
      const locale = redirectPathname.split("/")[1];
      return NextResponse.redirect(new URL(`/${locale}/forecast`, request.url));
    }
  }

  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !authToken
  ) {
    const url = new URL(`/${routing.defaultLocale}/login`, request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (publicRoutes.includes(pathname) && authToken) {
    return NextResponse.redirect(
      new URL(`/${routing.defaultLocale}/forecast`, request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    // i18n
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    // auth
    "/forecast/:path*",
    "/blacklist/:path*",
    "/login",
  ],
};
