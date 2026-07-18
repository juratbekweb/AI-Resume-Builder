import { describe, it, expect } from "vitest";
import {
  AppError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
  isAppError,
} from "./errors";

describe("AppError", () => {
  it("creates a typed application error", () => {
    const error = new AppError("Invalid input", 400, "validation_error");

    expect(error.code).toBe("validation_error");
    expect(error.message).toBe("Invalid input");
    expect(error.name).toBe("AppError");
  });

  it("detects application errors", () => {
    const error = new AppError("Forbidden", 403, "forbidden");
    expect(isAppError(error)).toBe(true);
    expect(isAppError(new Error("plain"))).toBe(false);
  });

  it("creates specialized application errors with the right status codes", () => {
    expect(new ValidationError("Bad input").statusCode).toBe(400);
    expect(new UnauthorizedError().statusCode).toBe(401);
    expect(new ForbiddenError().statusCode).toBe(403);
    expect(new NotFoundError().statusCode).toBe(404);
  });
});
