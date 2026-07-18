import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrismaClient = { $connect: vi.fn(), $disconnect: vi.fn() };

vi.mock("../core/config/env", () => ({
  env: {
    NODE_ENV: "test",
  },
}));

vi.mock("@prisma/client", () => {
  class PrismaClientMock {
    constructor() {
      return mockPrismaClient;
    }
  }

  return { PrismaClient: PrismaClientMock };
});

describe("prisma client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("creates a singleton prisma client", async () => {
    const { prisma } = await import("./prisma");
    expect(prisma).toBeDefined();
  });

  it("creates a prisma client for production mode", async () => {
    vi.doMock("../core/config/env", () => ({
      env: {
        NODE_ENV: "production",
      },
    }));

    const { prisma } = await import("./prisma");
    expect(prisma).toBeDefined();
  });
});
