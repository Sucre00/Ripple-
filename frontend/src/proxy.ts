import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const userRole = request.cookies.get("user_role")?.value;

  // Handle logout: delete cookie at edge and proceed to auth
  if (path === "/auth" && request.nextUrl.searchParams.has("logout")) {
    const response = NextResponse.redirect(new URL("/auth", request.url));
    response.cookies.delete("user_role");
    response.cookies.delete("user_id");
    return response;
  }

  // Protect /affiliate routes
  if (path.startsWith("/affiliate")) {
    if (userRole !== "affiliate") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  // Protect /business-admin routes
  if (path.startsWith("/business-admin")) {
    if (userRole !== "business_admin") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  // Protect /super-admin routes
  if (path.startsWith("/super-admin")) {
    if (userRole !== "super_admin") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  // If user is already logged in, redirect them away from login /auth to their dashboard
  if (path === "/auth" && userRole) {
    if (userRole === "affiliate") {
      return NextResponse.redirect(new URL("/affiliate", request.url));
    }
    if (userRole === "business_admin") {
      return NextResponse.redirect(new URL("/business-admin", request.url));
    }
    if (userRole === "super_admin") {
      return NextResponse.redirect(new URL("/super-admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/affiliate/:path*",
    "/business-admin/:path*",
    "/super-admin/:path*",
    "/auth",
  ],
};

export default proxy;
