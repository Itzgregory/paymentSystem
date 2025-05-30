import { NextResponse } from "next/server";
import { getAuthToken, isTokenValid, getUserRole } from "@/utils/auth/authutils";

export function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path.startsWith("/_next") || path.startsWith("/static")) {
    return NextResponse.next();
  }

  const token = getAuthToken();
  if (!token || !isTokenValid()) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  const userRole = getUserRole();
  const protectedRoutes = [
    { path: "/admin", roles: ["admin"] },
    { path: "/talentdashboard", roles: ["user"] },
  ];

  const routeConfig = protectedRoutes.find((r) => path.startsWith(r.path));
  if (routeConfig && !routeConfig.roles.includes(userRole!)) {
    return NextResponse.redirect(new URL("/unauthorized", url.origin));
  }

  const response = NextResponse.next();
  response.cookies.set("auth-validated", "true", {
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  });
  return response;
}

export const config = {
  matcher: ["/talentdashboard/:path*", "/admin/:path*"],
};