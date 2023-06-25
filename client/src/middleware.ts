import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type MyNextRequestProps = {
  session?: boolean;
} & NextRequest;

export async function middleware(request: MyNextRequestProps) {
  const refreshToken = request.cookies.get("refresh_token");
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/page", "/test", "/profile"],
};
