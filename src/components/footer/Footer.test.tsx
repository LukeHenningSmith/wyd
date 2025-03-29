import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

// Mock the Separator component
vi.mock("../ui/separator", () => ({
  Separator: () => <div data-testid="separator" />,
}));

describe("Footer", () => {
  it("renders the footer with the correct elements", () => {
    render(<Footer />);

    // Check for the Separator
    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();

    // Check for the footer text
    const footerText = screen.getByText(/Luke Henning-Smith 2025/i);
    expect(footerText).toBeInTheDocument();
    expect(footerText).toHaveClass("text-zinc-500");
  });
});
