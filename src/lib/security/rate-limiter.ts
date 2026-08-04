import { NextRequest, NextResponse } from "next/server";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 900000, maxRequests: number = 5) {
    this.windowMs = windowMs; // 15 minutes default
    this.maxRequests = maxRequests; // 5 requests default
  }

  getKey(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    return `${ip}:${userAgent}`;
  }

  isLimited(key: string): boolean {
    const now = Date.now();
    const record = this.store[key];

    if (!record || now > record.resetTime) {
      this.store[key] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return false;
    }

    record.count++;

    if (record.count > this.maxRequests) {
      return true;
    }

    return false;
  }

  getRemainingRequests(key: string): number {
    const record = this.store[key];
    if (!record || Date.now() > record.resetTime) {
      return this.maxRequests;
    }
    return Math.max(0, this.maxRequests - record.count);
  }

  getResetTime(key: string): number {
    const record = this.store[key];
    if (!record || Date.now() > record.resetTime) {
      return 0;
    }
    return record.resetTime;
  }

  middleware(request: NextRequest): NextResponse | null {
    const key = this.getKey(request);

    if (this.isLimited(key)) {
      const resetTime = this.getResetTime(key);
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

      return NextResponse.json(
        {
          error: "Too many requests",
          message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
            "X-RateLimit-Limit": this.maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": resetTime.toString(),
          },
        }
      );
    }

    // Return null to allow the request to proceed
    // Rate limit headers are not supported in App Router route handlers
    return null;
  }
}

// Different rate limiters for different endpoints
export const authRateLimiter = new RateLimiter(900000, 5); // 5 requests per 15 minutes
export const registerRateLimiter = new RateLimiter(3600000, 3); // 3 requests per hour
export const passwordResetRateLimiter = new RateLimiter(3600000, 3); // 3 requests per hour
export const generalRateLimiter = new RateLimiter(60000, 100); // 100 requests per minute

export { RateLimiter };