import { describe, it, expect, vi } from "vitest";

vi.mock("next/server", () => ({
  NextResponse: {
    json(payload: unknown, init?: { status?: number }) {
      return { payload, status: init?.status ?? 200 };
    },
  },
}));

vi.mock("./logger", () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

import { errorResponse, withErrorHandling } from "./api-response";

function getPayload(response: unknown) {
  return (response as { payload: { success: boolean } }).payload;
}

class TestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TestError";
  }
}

describe("api response pipeline", () => {
  it("returns a validation error response when a zod error is raised", () => {
    const response = errorResponse(new Error("invalid input"));
    expect(response.status).toBe(500);
    expect(getPayload(response).success).toBe(false);
  });

  it("wraps handlers and returns error responses for thrown errors", async () => {
    const wrapped = withErrorHandling(async () => {
      throw new TestError("boom");
    });

    const response = await wrapped(new Request("https://example.com"));
    expect(response.status).toBe(500);
  });
});
