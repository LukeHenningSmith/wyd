import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Header from "./Header";

// Mock `useNavigate` from react-router-dom
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Mock `ModeToggle` and `HeaderMenuButton` components
vi.mock("../theme/ModeToggle", () => ({
  ModeToggle: () => <div data-testid="mode-toggle">ModeToggle</div>,
}));

vi.mock("./HeaderMenuButton", () => ({
  default: ({ label }: { label: string }) => (
    <div data-testid="header-menu-button">{label}</div>
  ),
}));

describe("Header", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  const renderHeader = (
    config: { id: string; label: string; path: string }[]
  ) => {
    render(
      <MemoryRouter>
        <Header config={config} />
      </MemoryRouter>
    );
  };

  it("renders the header with the correct elements", () => {
    const config = [
      { id: "1", label: "Home", path: "/" },
      { id: "2", label: "About", path: "/about" },
    ];

    renderHeader(config);

    // Check for the WYD button
    const wydButton = screen.getByRole("button", { name: "WYD" });
    expect(wydButton).toBeInTheDocument();

    // Check for the menu buttons
    const menuButtons = screen.getAllByTestId("header-menu-button");
    expect(menuButtons).toHaveLength(config.length);
    expect(menuButtons[0]).toHaveTextContent("Home");
    expect(menuButtons[1]).toHaveTextContent("About");

    // Check for the ModeToggle
    const modeToggle = screen.getByTestId("mode-toggle");
    expect(modeToggle).toBeInTheDocument();
  });

  it("navigates to the home page when the WYD button is clicked", async () => {
    const config = [
      { id: "1", label: "Home", path: "/" },
      { id: "2", label: "About", path: "/about" },
    ];

    renderHeader(config);

    const wydButton = screen.getByRole("button", { name: "WYD" });
    await userEvent.click(wydButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
