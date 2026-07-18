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

import { successResponse, errorResponse } from "./api-response";

describe("api response helpers", () => {
  it("creates a success payload", () => {
    const response = successResponse({ ok: true }) as unknown as {
      status: number;
      payload: unknown;
    };

    expect(response.status).toBe(200);
    expect(response.payload).toEqual({
      success: true,
      data: { ok: true },
      error: null,
      meta: undefined,
    });
  });

  it("creates an error payload", () => {
    const response = errorResponse(new Error("bad request")) as unknown as {
      status: number;
      payload: { success: boolean; error: { message: string } };
    };

    expect(response.status).toBe(500);
    expect(response.payload.success).toBe(false);
    expect(response.payload.error.message).toBe("bad request");
  });
});
