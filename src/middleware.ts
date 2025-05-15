import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/forecast", "/blacklist"];
const publicRoutes = ["/login"];

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/forecast/:path*", "/blacklist/:path*", "/login"],
};
