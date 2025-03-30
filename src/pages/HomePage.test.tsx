import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

vi.mock("@/components/cards/DailyActivityCard", () => ({
  DailyActivityCard: () => (
    <div data-testid="daily-activity-card">Daily Activity Card</div>
  ),
}));

vi.mock("@/components/cards/MostVisitedCard", () => ({
  default: () => <div data-testid="most-visited-card">Most Visited Card</div>,
}));

vi.mock("@/components/cards/TrendingCard", () => ({
  default: () => <div data-testid="trending-card">Trending Card</div>,
}));

vi.mock("@/components/cards/PageVisitsToday", () => ({
  default: () => <div data-testid="page-visits-today">Page Visits Today</div>,
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders all the cards", () => {
    render(<HomePage />);

    // Check if all the cards are rendered
    expect(screen.getByTestId("daily-activity-card")).toBeInTheDocument();
    expect(screen.getByTestId("most-visited-card")).toBeInTheDocument();
    expect(screen.getByTestId("trending-card")).toBeInTheDocument();
    expect(screen.getByTestId("page-visits-today")).toBeInTheDocument();
  });
});
