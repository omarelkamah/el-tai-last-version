// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = pathname.split("/")[1] || "en";

  const userToken = request.cookies.has("UserToken");
  const refreshToken = request.cookies.has("UserRefreshToken");
  const adminToken = request.cookies.has("AdminToken");
  const adminRefreshToken = request.cookies.has("AdminRefreshToken");

  /* ==================================================
     ADMIN ROUTES (always EN)
  ================================================== */

  const isAdminPath = pathname.startsWith(`/${locale}/admin`);
  const isAdminLogin = pathname === `/${locale}/admin/login`;

  // if (pathname.startsWith(`/${locale}/admin`) && locale !== "${locale}") {
  //   const url = new URL(request.url);
  //   url.pathname = pathname.replace(`/${locale}/admin`, "/${locale}/admin");
  //   return NextResponse.redirect(url);
  // }

  // Protect all admin pages - check for either access tok${locale} OR refresh token
  if (isAdminPath && !isAdminLogin && !adminToken && !adminRefreshToken) {
    return NextResponse.redirect(
      new URL(`/${locale}/admin/login`, request.url)
    );
  }

  // Prevent logged-in admin from login page
  if (isAdminLogin && (adminToken || adminRefreshToken)) {
    return NextResponse.redirect(
      new URL(`/${locale}/admin/dashboard`, request.url)
    );
  }

  /* ==================================================
     USER ROUTES (locale aware)
  ================================================== */

  const publicUserRoutes = [
    `/${locale}/user/login`,
    `/${locale}/user/register`,
    `/${locale}/user/change-password`,
  ];

  const isUserPath = pathname.startsWith(`/${locale}/user`);
  const isPublicUserRoute = publicUserRoutes.includes(pathname);

  // Protect all user pages - check for either access token OR refresh token
  if (isUserPath && !isPublicUserRoute && !userToken && !refreshToken) {
    return NextResponse.redirect(new URL(`/${locale}/user/login`, request.url));
  }

  // Prevent logged-in user from auth pages
  if (isPublicUserRoute && (userToken || refreshToken)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  /* ==================================================
     i18n
  ================================================== */

  const response = intlMiddleware(request);
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
