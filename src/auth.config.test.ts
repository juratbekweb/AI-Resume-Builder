import { describe, it, expect } from "vitest";
import { authConfig } from "./auth.config";

describe("auth config", () => {
  it("includes login page settings", () => {
    expect(authConfig.pages?.signIn).toBe("/login");
  });

  it("exposes an empty provider list by default", () => {
    expect(authConfig.providers).toEqual([]);
  });
});
