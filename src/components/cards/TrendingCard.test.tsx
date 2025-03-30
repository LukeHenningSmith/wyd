import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TrendingCard from "./TrendingCard";
import { usePopularTrends } from "@/hooks/history";

vi.mock("@/hooks/history", () => ({
  usePopularTrends: vi.fn(),
}));

vi.mock("./components/TrendEntry", () => ({
  default: ({ site }: { site: { label: string } }) => (
    <div data-testid="trend-entry">{site.label}</div>
  ),
}));

describe("TrendingCard", () => {
  const mockUsePopularTrends = usePopularTrends as Mock;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the card title and description", () => {
    mockUsePopularTrends.mockReturnValue({
      isLoading: false,
      data: [],
    });

    render(<TrendingCard />);

    // Check if the title and description are rendered
    expect(
      screen.getByText("Changes in your favourite sites")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Monthly changes in your top visited websites.")
    ).toBeInTheDocument();
  });

  it("renders a loading state when `isLoading` is true", () => {
    mockUsePopularTrends.mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<TrendingCard />);

    // Check that nothing is rendered when loading
    expect(
      screen.queryByText("Changes in your favourite sites")
    ).not.toBeInTheDocument();
  });

  it("renders up to 2 trend entries by default", () => {
    mockUsePopularTrends.mockReturnValue({
      isLoading: false,
      data: [
        { label: "Site 1", thisPeriod: 100, lastPeriod: 50 },
        { label: "Site 2", thisPeriod: 200, lastPeriod: 150 },
        { label: "Site 3", thisPeriod: 300, lastPeriod: 250 },
      ],
    });

    render(<TrendingCard />);

    // Check if only the first 2 trend entries are rendered
    const trendEntries = screen.getAllByTestId("trend-entry");
    expect(trendEntries).toHaveLength(2);
    expect(screen.getByText("Site 1")).toBeInTheDocument();
    expect(screen.getByText("Site 2")).toBeInTheDocument();
    expect(screen.queryByText("Site 3")).not.toBeInTheDocument();
  });

  it("renders all trend entries when 'Show More' is clicked", async () => {
    mockUsePopularTrends.mockReturnValue({
      isLoading: false,
      data: [
        { label: "Site 1", thisPeriod: 100, lastPeriod: 50 },
        { label: "Site 2", thisPeriod: 200, lastPeriod: 150 },
        { label: "Site 3", thisPeriod: 300, lastPeriod: 250 },
      ],
    });

    render(<TrendingCard />);

    // Click the "Show More" button
    const showMoreButton = screen.getByRole("button", { name: "Show More" });
    await userEvent.click(showMoreButton);

    // Check if all trend entries are rendered
    const trendEntries = screen.getAllByTestId("trend-entry");
    expect(trendEntries).toHaveLength(3);
    expect(screen.getByText("Site 1")).toBeInTheDocument();
    expect(screen.getByText("Site 2")).toBeInTheDocument();
    expect(screen.getByText("Site 3")).toBeInTheDocument();
  });

  it("does not render the 'Show More' button when there are 2 or fewer trends", () => {
    mockUsePopularTrends.mockReturnValue({
      isLoading: false,
      data: [
        { label: "Site 1", thisPeriod: 100, lastPeriod: 50 },
        { label: "Site 2", thisPeriod: 200, lastPeriod: 150 },
      ],
    });

    render(<TrendingCard />);

    // Check that the "Show More" button is not rendered
    expect(
      screen.queryByRole("button", { name: "Show More" })
    ).not.toBeInTheDocument();
  });
});
