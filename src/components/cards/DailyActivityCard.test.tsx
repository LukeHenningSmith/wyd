import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { DailyActivityCard } from "./DailyActivityCard";
import { useUniquePageVistsWeek } from "@/hooks/history";

vi.mock("@/hooks/history", () => ({
  useUniquePageVistsWeek: vi.fn(),
}));

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

vi.mock("recharts", async () => {
  const OriginalModule = await vi.importActual<typeof import("recharts")>(
    "recharts"
  );
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    LineChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="line-chart">{children}</div>
    ),
    Line: () => <div data-testid="line" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    XAxis: () => <div data-testid="x-axis" />,
  };
});

describe("DailyActivityCard", () => {
  const mockUseUniquePageVistsWeek = useUniquePageVistsWeek as Mock;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the card title and description", () => {
    mockUseUniquePageVistsWeek.mockReturnValue({
      data: [10, 20, 15, 25, 30, 5, 12],
      isPending: false,
    });

    render(<DailyActivityCard />);

    // Check if the title and description are rendered
    expect(screen.getByText("Daily web activity")).toBeInTheDocument();
    expect(
      screen.getByText("Total unique pages visited per day this week")
    ).toBeInTheDocument();
  });

  it("renders the chart when data is available", () => {
    mockUseUniquePageVistsWeek.mockReturnValue({
      data: [10, 20, 15, 25, 30, 5, 12],
      isPending: false,
    });

    render(<DailyActivityCard />);

    // Check if the chart container is rendered
    const chart = screen.getByTestId("line-chart");
    expect(chart).toBeInTheDocument();
  });
});
