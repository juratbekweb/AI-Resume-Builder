import { beforeEach, describe, expect, it, vi } from "vitest";

const mockMiddleware = vi.fn((handler: unknown) => handler);
const mockNextAuth = vi.fn(() => ({ auth: mockMiddleware }));

class MockResponse {
  public headers = new Headers();
  constructor(init?: { request?: { headers: Headers } }) {
    if (init?.request?.headers) {
      this.headers = init.request.headers;
    }
  }
}

vi.mock("next/server", () => ({
  NextResponse: {
    next: vi.fn(({ request }: { request?: { headers: Headers } }) => new MockResponse({ request })),
  },
}));

vi.mock("next-auth", () => ({
  default: mockNextAuth,
}));

vi.mock("./auth.config", () => ({
  authConfig: {
    providers: [],
  },
}));

describe("proxy middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates the auth middleware and exports a matcher", async () => {
    const { default: middleware, config } = await import("./proxy");

    expect(typeof middleware).toBe("function");
    expect(config.matcher).toContain("/((?!_next/static|_next/image|favicon.ico).*)");
  });

  it("adds security headers and CORS headers for API requests", async () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://app.example.com";

    const { default: middleware } = await import("./proxy");
    const req = {
      headers: {
        get: (name: string) => (name === "origin" ? "https://app.example.com" : null),
      },
      nextUrl: { pathname: "/api/health" },
    };

    const response = await middleware(req as never);

    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(response.headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(response.headers.get("Strict-Transport-Security")).toBe(
      "max-age=31536000; includeSubDomains"
    );
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://app.example.com");
  });

  it("skips CORS updates for non-API requests", async () => {
    const { default: middleware } = await import("./proxy");
    const req = {
      headers: {
        get: (name: string) => (name === "origin" ? "https://app.example.com" : null),
      },
      nextUrl: { pathname: "/dashboard" },
    };

    const response = await middleware(req as never);

    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });
});
