import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextRequest, NextResponse } from "next/server";

export const { auth: middleware } = NextAuth(authConfig);

// Security headers wrapper
export default middleware((req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-request-id", crypto.randomUUID());

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  
  // CSRF for API routes (Simple example: origin checking is built into Next.js server actions, 
  // but for custom API routes, ensure they aren't hit cross-origin without CORS)
  const origin = req.headers.get("origin");
  const isApiRoute = req.nextUrl.pathname.startsWith("/api/");
  if (isApiRoute && origin) {
    const allowedOrigins = [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"];
    if (allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }
  }

  return response;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
