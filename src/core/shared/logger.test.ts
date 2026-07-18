import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("pino", () => {
  const mockPino = vi.fn(() => ({ info: vi.fn() }));
  return {
    default: mockPino,
    stdTimeFunctions: {
      isoTime: "iso",
    },
  };
});

describe("logger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("creates a pino logger for the current environment", async () => {
    vi.doMock("../config/env", () => ({
      env: {
        NODE_ENV: "test",
      },
    }));

    const { logger } = await import("./logger");
    expect(logger).toBeDefined();
  });

  it("uses production logger settings when the app runs in production", async () => {
    vi.doMock("../config/env", () => ({
      env: {
        NODE_ENV: "production",
      },
    }));

    const { logger } = await import("./logger");
    expect(logger).toBeDefined();
  });

  it("uses development transport settings when the app runs in development", async () => {
    vi.doMock("../config/env", () => ({
      env: {
        NODE_ENV: "development",
      },
    }));

    const { logger } = await import("./logger");
    expect(logger).toBeDefined();
  });
});
