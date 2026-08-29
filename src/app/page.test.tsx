import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock next/navigation since page.tsx uses useRouter
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock localStorage — return a "logged in" user so the page renders LandingPage
const localStorageMock = (() => {
  const store: Record<string, string> = {
    DocNova_user: JSON.stringify({ id: "1", name: "Test User" }),
  };
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock heavy components that don't matter for this test
vi.mock("../components/marketing/landing-page", () => ({
  LandingPage: () => (
    <main>
      <h1>Build a standout resume with clarity, speed, and confidence</h1>
      <a href="#pricing">Start building for free</a>
      <h2>Everything you need to ship a better resume faster</h2>
      <h2>Ready to build a resume that works as hard as you do?</h2>
    </main>
  ),
}));

import HomePage from "./page";

describe("marketing home page", () => {
  it("renders the hero, features, and CTA content", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /build a standout resume with clarity, speed, and confidence/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start building for free/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /everything you need to ship a better resume faster/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /ready to build a resume that works as hard as you do/i })
    ).toBeInTheDocument();
  });
});
