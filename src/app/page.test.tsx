import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
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
