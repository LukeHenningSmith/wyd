import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import HeaderMenuButton from "./HeaderMenuButton";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe("HeaderMenuButton", () => {
  const mockUseLocation = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useLocation as Mock).mockImplementation(mockUseLocation);
  });

  const renderWithRouter = (
    path: string,
    label: string,
    currentPath: string
  ) => {
    mockUseLocation.mockReturnValue({ pathname: currentPath });

    render(
      <MemoryRouter>
        <HeaderMenuButton label={label} path={path} />
      </MemoryRouter>
    );
  };

  it("renders the button with the correct label", () => {
    renderWithRouter("/test-path", "Test Label", "/");

    const button = screen.getByRole("button", { name: "Test Label" });
    expect(button).toBeInTheDocument();
  });

  it("applies active styles when the path matches the current location", () => {
    renderWithRouter("/test-path", "Test Label", "/test-path");

    const button = screen.getByRole("button", { name: "Test Label" });
    expect(button).toHaveClass("dark:text-white text-black");
  });

  it("does not apply active styles when the path does not match the current location", () => {
    renderWithRouter("/test-path", "Test Label", "/different-path");

    const button = screen.getByRole("button", { name: "Test Label" });
    expect(button).not.toHaveClass("dark:text-white text-black");
  });

  it("navigates to the correct path when clicked", async () => {
    renderWithRouter("/test-path", "Test Label", "/");

    const link = screen.getByRole("link", { name: /test label/i });
    expect(link).toHaveAttribute("href", "/test-path");

    await userEvent.click(link);
  });
});
