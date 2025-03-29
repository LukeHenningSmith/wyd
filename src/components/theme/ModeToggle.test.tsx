import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ModeToggle } from "./ModeToggle";

describe("ModeToggle", () => {
  it("renders the toggle button", () => {
    render(<ModeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });
});
