import { describe, it, expect, vi } from "vitest";

vi.mock("next/server", () => ({
  NextResponse: {
    json(payload: unknown, init?: { status?: number }) {
      return { payload, status: init?.status ?? 200 };
    },
  },
}));

const { loggerError, loggerWarn } = vi.hoisted(() => ({
  loggerError: vi.fn(),
  loggerWarn: vi.fn(),
}));

vi.mock("./logger", () => ({
  logger: {
    error: loggerError,
    warn: loggerWarn,
  },
}));

vi.mock("./errors", async () => {
  class AppError extends Error {
    statusCode: number;
    code: string;
    constructor(message: string, statusCode: number, code: string) {
      super(message);
      this.statusCode = statusCode;
      this.code = code;
    }
  }

  return { AppError };
});

import { errorResponse, successResponse } from "./api-response";
import { AppError } from "./errors";
import { ZodError } from "zod";

function getPayload(response: unknown) {
  return (response as { payload: unknown }).payload;
}

describe("api response branches", () => {
  it("returns an AppError response with the correct status and code", () => {
    const response = errorResponse(new AppError("blocked", 403, "FORBIDDEN"));

    expect(response.status).toBe(403);
    expect((getPayload(response) as { error: { code: string } }).error.code).toBe("FORBIDDEN");
  });

  it("returns a Zod-derived validation response", () => {
    const zodError = new ZodError([
      {
        code: "invalid_type",
        expected: "string",
        path: ["email"],
        message: "Required",
      } as never,
    ]);

    const response = errorResponse(zodError);

    expect(response.status).toBe(400);
    expect((getPayload(response) as { error: { code: string } }).error.code).toBe("VALIDATION_ERROR");
  });

  it("uses the success response helper", () => {
    const response = successResponse({ ok: true }, 201, { requestId: "abc" });

    expect(response.status).toBe(201);
    expect((getPayload(response) as { success: boolean }).success).toBe(true);
  });
});
