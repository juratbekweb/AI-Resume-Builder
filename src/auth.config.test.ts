import { describe, it, expect } from "vitest";
import { authConfig } from "./auth.config";

describe("auth config", () => {
  it("includes login page settings", () => {
    expect(authConfig.pages?.signIn).toBe("/login");
  });

  it("exposes OAuth providers (Google and GitHub)", () => {
    // authConfig now includes Google and GitHub OAuth providers
    expect(Array.isArray(authConfig.providers)).toBe(true);
    expect(authConfig.providers.length).toBeGreaterThanOrEqual(2);
    const providerIds = authConfig.providers.map((p: { id: string }) => p.id);
    expect(providerIds).toContain("google");
    expect(providerIds).toContain("github");
  });
});
