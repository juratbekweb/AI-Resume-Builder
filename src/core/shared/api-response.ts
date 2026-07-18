import { NextResponse } from "next/server";
import { AppError } from "./errors";
import { logger } from "./logger";
import { ZodError } from "zod";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
  meta?: {
    requestId?: string;
    [key: string]: unknown;
  };
}

export function successResponse<T>(data: T, status = 200, meta?: Record<string, unknown>) {
  return NextResponse.json(
    {
      success: true,
      data,
      error: null,
      meta,
    } as ApiResponse<T>,
    { status }
  );
}

export function errorResponse(error: unknown, requestId?: string) {
  let statusCode = 500;
  let errorCode = "INTERNAL_SERVER_ERROR";
  let message = "An unexpected error occurred.";
  let details = undefined;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    errorCode = error.code;
    message = error.message;
  } else if (error instanceof ZodError) {
    statusCode = 400;
    errorCode = "VALIDATION_ERROR";
    message = "Invalid input data";
    details = error.issues;
  } else if (error instanceof Error) {
    message = error.message;
  }

  if (statusCode >= 500) {
    logger.error({ err: error, requestId }, "Unhandled exception");
  } else {
    logger.warn({ err: error, requestId }, "Operational error");
  }

  return NextResponse.json(
    {
      success: false,
      data: null,
      error: {
        code: errorCode,
        message,
        details,
      },
      meta: { requestId },
    } as ApiResponse<null>,
    { status: statusCode }
  );
}

export function withErrorHandling(
  handler: (req: Request, ...args: unknown[]) => Promise<NextResponse>
) {
  return async (req: Request, ...args: unknown[]) => {
    const requestId = req.headers.get("x-request-id") || crypto.randomUUID();
    try {
      return await handler(req, ...args);
    } catch (error) {
      return errorResponse(error, requestId);
    }
  };
}
