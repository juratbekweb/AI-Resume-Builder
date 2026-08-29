import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LiveEditorDemo, ResumePreview } from "./live-editor-demo";

// motion/react needs mocking in jsdom
vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import React from "react";

describe("ResumePreview", () => {
  it("renders the provided name in the preview", () => {
    render(<ResumePreview name="Jane Doe" role="Engineer" summary="A great engineer." />);
    expect(screen.getByTestId("preview-name")).toHaveTextContent("JANE DOE");
  });

  it("renders the provided role in the preview", () => {
    render(<ResumePreview name="Alex" role="Product Manager" summary="Experienced PM." />);
    expect(screen.getByTestId("preview-role")).toHaveTextContent("Product Manager");
  });

  it("renders the provided summary in the preview", () => {
    render(<ResumePreview name="Alex" role="Designer" summary="Loves clean interfaces." />);
    expect(screen.getByTestId("preview-summary")).toHaveTextContent("Loves clean interfaces.");
  });

  it("shows placeholder text when name is empty", () => {
    render(<ResumePreview name="" role="" summary="" />);
    expect(screen.getByTestId("preview-name")).toHaveTextContent("YOUR NAME");
  });
});

describe("LiveEditorDemo", () => {
  // Test 1: Full Name changes preview
  it("updates preview name when Full Name input changes", () => {
    render(<LiveEditorDemo />);

    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: "John Smith" } });

    expect(screen.getByTestId("preview-name")).toHaveTextContent("JOHN SMITH");
  });

  // Test 2: Role changes preview
  it("updates preview role when Role input changes", () => {
    render(<LiveEditorDemo />);

    const roleInput = screen.getByLabelText(/professional role/i);
    fireEvent.change(roleInput, { target: { value: "Senior Frontend Developer" } });

    expect(screen.getByTestId("preview-role")).toHaveTextContent("Senior Frontend Developer");
  });

  // Test 3: Summary changes preview
  it("updates preview summary when Summary textarea changes", () => {
    render(<LiveEditorDemo />);

    const summaryInput = screen.getByLabelText(/professional summary/i);
    fireEvent.change(summaryInput, { target: { value: "React developer with 5 years of experience." } });

    expect(screen.getByTestId("preview-summary")).toHaveTextContent("React developer with 5 years of experience.");
  });

  it("calls onFieldChange callback when fields change", () => {
    const onFieldChange = vi.fn();
    render(<LiveEditorDemo onFieldChange={onFieldChange} />);

    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: "New Name" } });

    expect(onFieldChange).toHaveBeenCalledWith(
      expect.objectContaining({ name: "New Name" })
    );
  });

  it("displays generated skills when generatedData is provided", () => {
    const generatedData = {
      summary: "AI generated summary",
      experience: [],
      skills: ["React", "TypeScript", "Node.js"],
    };
    render(<LiveEditorDemo generatedData={generatedData} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });
});
