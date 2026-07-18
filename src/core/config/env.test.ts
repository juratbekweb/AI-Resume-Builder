import { describe, it, expect, vi } from "vitest";

vi.mock("@t3-oss/env-nextjs", () => ({
  createEnv: () => ({
    NODE_ENV: "test",
    NEXT_PUBLIC_APP_URL: "https://example.com",
  }),
}));

import { env } from "./env";

describe("env config", () => {
  it("parses the known environment values", () => {
    expect(env.NODE_ENV).toBe("test");
    expect(env.NEXT_PUBLIC_APP_URL).toBe("https://example.com");
  });
});
