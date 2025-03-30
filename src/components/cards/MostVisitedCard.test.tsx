import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MostVisitedCard from "./MostVisitedCard";

// Mock the `PageVisitsChart` component
vi.mock("../charts/PageVisitsChart", () => ({
  PageVisitsChart: ({
    timePeriod,
    timeDuration,
  }: {
    timePeriod: string;
    timeDuration: number;
  }) => (
    <div data-testid="page-visits-chart">
      {`Chart for ${timePeriod} with duration ${timeDuration}`}
    </div>
  ),
}));

describe("MostVisitedCard", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the card title and description", () => {
    render(<MostVisitedCard />);

    // Check if the title and description are rendered
    expect(screen.getByText("Your favourite websites")).toBeInTheDocument();
    expect(
      screen.getByText("Website visits as of the selected time period")
    ).toBeInTheDocument();
  });

  it("renders the 'Today' chart by default", () => {
    render(<MostVisitedCard />);

    // Check if the default tab is "Today" and the correct chart is rendered
    expect(screen.getByText("Today")).toHaveAttribute("data-state", "active");
    expect(screen.getByTestId("page-visits-chart")).toHaveTextContent(
      "Chart for day with duration 1"
    );
  });

  it("switches to 'This Week' chart when the tab is clicked", async () => {
    render(<MostVisitedCard />);

    // Click the "This Week" tab
    const thisWeekTab = screen.getByRole("tab", { name: "This Week" });
    await userEvent.click(thisWeekTab);

    // Check if the "This Week" tab is active and the correct chart is rendered
    expect(thisWeekTab).toHaveAttribute("data-state", "active");
    expect(screen.getByTestId("page-visits-chart")).toHaveTextContent(
      "Chart for week with duration 1"
    );
  });

  it("switches to 'This Month' chart when the tab is clicked", async () => {
    render(<MostVisitedCard />);

    // Click the "This Month" tab
    const thisMonthTab = screen.getByRole("tab", { name: "This Month" });
    await userEvent.click(thisMonthTab);

    // Check if the "This Month" tab is active and the correct chart is rendered
    expect(thisMonthTab).toHaveAttribute("data-state", "active");
    expect(screen.getByTestId("page-visits-chart")).toHaveTextContent(
      "Chart for month with duration 1"
    );
  });
});
