import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is not defined");
    return NextResponse.next();
  }

  let isTokenValid = false;
  let userRole: string | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret)
      );

      isTokenValid = true;
      userRole = payload.role as string;
    } catch (error) {
      console.error("JWT verification failed:", error);
      isTokenValid = false;
    }
  }

  // 🔐 Protect USER routes
  if (
    pathname.startsWith("/user") &&
    (!isTokenValid || userRole !== "user")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔐 Protect ADMIN routes
  if (
    pathname.startsWith("/admin") &&
    (!isTokenValid || userRole !== "admin")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && isTokenValid) {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (userRole === "user") {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/user/:path*", "/admin/:path*"],
};