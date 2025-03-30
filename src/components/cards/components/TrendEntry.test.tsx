import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TrendEntry from "./TrendEntry";
import { HistoryChange } from "@/types";

// Mock `lucide-react` icons
vi.mock("lucide-react", () => ({
  TrendingUp: () => <svg data-testid="trending-up" />,
  TrendingDown: () => <svg data-testid="trending-down" />,
}));

describe("TrendEntry", () => {
  it("renders the site label and views", () => {
    const mockSite: HistoryChange = {
      label: "Example Site",
      id: "1",
      visits: 100,
      url: "https://example.com",
      thisPeriod: 100,
      lastPeriod: 100,
    };

    render(<TrendEntry site={mockSite} />);

    // Check if the site label and views are rendered
    expect(screen.getByText("Example Site")).toBeInTheDocument();
    expect(screen.getByText("(100 views)")).toBeInTheDocument();
  });

  it("renders 'No change in views this month' when there is no change", () => {
    const mockSite = {
      label: "Example Site",
      id: "1",
      visits: 100,
      url: "https://example.com",
      thisPeriod: 100,
      lastPeriod: 100,
    };

    render(<TrendEntry site={mockSite} />);

    // Check if the no-change message is rendered
    expect(
      screen.getByText("No change in views this month")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("trending-up")).not.toBeInTheDocument();
    expect(screen.queryByTestId("trending-down")).not.toBeInTheDocument();
  });

  it("renders 'Trending up' with the correct percentage and icon when views increased", () => {
    const mockSite = {
      label: "Example Site",
      id: "1",
      visits: 100,
      url: "https://example.com",
      thisPeriod: 150,
      lastPeriod: 100,
    };

    render(<TrendEntry site={mockSite} />);

    // Check if the trending up message and icon are rendered
    expect(
      screen.getByText("Trending up by 50.00% this month")
    ).toBeInTheDocument();
    expect(screen.getByTestId("trending-up")).toBeInTheDocument();
    expect(screen.queryByTestId("trending-down")).not.toBeInTheDocument();
  });

  it("renders 'Trending down' with the correct percentage and icon when views decreased", () => {
    const mockSite = {
      label: "Example Site",
      id: "1",
      visits: 100,
      url: "https://example.com",
      thisPeriod: 50,
      lastPeriod: 100,
    };

    render(<TrendEntry site={mockSite} />);

    // Check if the trending down message and icon are rendered
    expect(
      screen.getByText("Trending down by 50.00% this month")
    ).toBeInTheDocument();
    expect(screen.getByTestId("trending-down")).toBeInTheDocument();
    expect(screen.queryByTestId("trending-up")).not.toBeInTheDocument();
  });
});
