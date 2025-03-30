import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import PageVisitsToday from "./PageVisitsToday";
import { useUniquePageVistsToday } from "@/hooks/history";

vi.mock("@/hooks/history", () => ({
  useUniquePageVistsToday: vi.fn(),
}));

// Mock the `Loader` component
vi.mock("../Loader", () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

describe("PageVisitsToday", () => {
  const mockUseUniquePageVistsToday = useUniquePageVistsToday as Mock;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the loader when `isPending` is true", () => {
    mockUseUniquePageVistsToday.mockReturnValue({
      isPending: true,
      data: null,
    });

    render(<PageVisitsToday />);

    // Check if the loader is rendered
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("renders the number of unique page visits when data is available", () => {
    mockUseUniquePageVistsToday.mockReturnValue({
      isPending: false,
      data: 42,
    });

    render(<PageVisitsToday />);

    // Check if the number of page visits is rendered
    expect(screen.getByText("42")).toBeInTheDocument();

    // Check if the description is rendered
    expect(screen.getByText("Unique page visits today")).toBeInTheDocument();
  });
});
