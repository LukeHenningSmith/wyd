import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
  it("renders with large size", () => {
    render(<Loader size="large" />);

    const svgElement = screen.getByTestId("loader");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("width", "36");
    expect(svgElement).toHaveAttribute("height", "36");
    expect(svgElement).toHaveClass("animate-spin");
  });
});
