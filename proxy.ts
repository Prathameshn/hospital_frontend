import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const authCookie = req.cookies.get("admin-auth");

  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    authCookie?.value !== "true"
  ) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
