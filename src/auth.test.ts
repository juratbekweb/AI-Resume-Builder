import { beforeEach, describe, expect, it, vi } from "vitest";

const mockNextAuth = vi.fn();
const mockCredentials = vi.fn((config: unknown) => config);
const mockPrismaAdapter = vi.fn((prisma: unknown) => ({ prisma }));

vi.mock("./core/auth", () => ({
  NextAuthAuthService: class {
    async getSession() {
      return null;
    }
  },
}));

vi.mock("next-auth", () => ({
  default: mockNextAuth,
}));

vi.mock("next-auth/providers/credentials", () => ({
  default: mockCredentials,
}));

vi.mock("@auth/prisma-adapter", () => ({
  PrismaAdapter: mockPrismaAdapter,
}));

vi.mock("./lib/prisma", () => ({
  prisma: {
    $connect: vi.fn(),
  },
}));

vi.mock("./auth.config", () => ({
  authConfig: {
    providers: [],
    pages: {
      signIn: "/login",
    },
  },
}));

describe("auth module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    mockNextAuth.mockReturnValue({
      handlers: {},
      signIn: vi.fn(),
      signOut: vi.fn(),
      auth: vi.fn(),
    });
  });

  it("configures the NextAuth runtime and exposes the auth service", async () => {
    const { authService } = await import("./auth");

    expect(mockNextAuth).toHaveBeenCalledTimes(1);
    const [config] = mockNextAuth.mock.calls[0];
    expect(config.adapter).toEqual({ prisma: expect.any(Object) });
    expect(config.session).toEqual({ strategy: "jwt" });
    expect(config.providers).toHaveLength(1);
    expect(mockCredentials).toHaveBeenCalledTimes(1);
    expect(mockPrismaAdapter).toHaveBeenCalledTimes(1);
    expect(authService).toBeDefined();
  });

  it("executes the credential authorize callback", async () => {
    await import("./auth");
    const credentialsConfig = mockCredentials.mock.calls[0][0] as {
      authorize: (credentials: { email: string; password: string }) => Promise<null>;
    };

    await expect(
      credentialsConfig.authorize({ email: "user@example.com", password: "secret" })
    ).resolves.toBeNull();
  });
});
