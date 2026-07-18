import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextAuthAuthService } from "./nextauth-auth-service";
import { createSession } from "../../../tests/fixtures/factory";

const { mockAuth, mockSignIn, mockSignOut } = vi.hoisted(() => ({
  mockAuth: vi.fn(),
  mockSignIn: vi.fn(),
  mockSignOut: vi.fn(),
}));

vi.mock("../../auth", () => ({
  auth: mockAuth,
  signIn: mockSignIn,
  signOut: mockSignOut,
}));

describe("NextAuthAuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the current session", async () => {
    const session = createSession();
    mockAuth.mockResolvedValue(session);

    const service = new NextAuthAuthService();
    await expect(service.getSession()).resolves.toEqual(session);
  });

  it("returns true when the user is authenticated", async () => {
    mockAuth.mockResolvedValue(createSession());

    const service = new NextAuthAuthService();
    await expect(service.isAuthenticated()).resolves.toBe(true);
  });

  it("returns false when no user is present", async () => {
    mockAuth.mockResolvedValue(null);

    const service = new NextAuthAuthService();
    await expect(service.isAuthenticated()).resolves.toBe(false);
  });

  it("signs in with credentials and returns the user", async () => {
    const user = { id: "user_1", name: "Test User", email: "test@example.com" };
    mockSignIn.mockResolvedValue({ user });

    const service = new NextAuthAuthService();
    await expect(service.signIn({ email: "test@example.com", password: "secret" })).resolves.toEqual(user);
  });

  it("signs out without redirect", async () => {
    mockSignOut.mockResolvedValue(undefined);

    const service = new NextAuthAuthService();
    await service.signOut();

    expect(mockSignOut).toHaveBeenCalledWith({ redirect: false });
  });
});
