import { describe, it, expect } from "vitest";
import type { AuthService } from "./auth-service";

describe("AuthService contract", () => {
  it("defines the core authentication operations", () => {
    const service = {
      getSession: async () => null,
      signIn: async () => null,
      signOut: async () => undefined,
      isAuthenticated: async () => false,
    } satisfies AuthService;

    expect(service).toBeDefined();
    expect(typeof service.getSession).toBe("function");
    expect(typeof service.signIn).toBe("function");
    expect(typeof service.signOut).toBe("function");
    expect(typeof service.isAuthenticated).toBe("function");
  });
});
