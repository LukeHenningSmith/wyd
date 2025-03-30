import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageVisitsChart } from "./PageVisitsChart";
import { useTopFiveHistory } from "@/hooks/history";
import { TIME_PERIOD } from "@/types";

// Mock the `useTopFiveHistory` hook
vi.mock("@/hooks/history", () => ({
  useTopFiveHistory: vi.fn(),
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
      <div style={{ width: 800, height: 800 }}>{children}</div>
    ),
  };
});

describe("PageVisitsChart", () => {
  const mockUseTopFiveHistory = useTopFiveHistory as Mock;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the chart with data", () => {
    // Mock data for the chart
    mockUseTopFiveHistory.mockReturnValue({
      data: [
        {
          id: "1",
          label: "Example 1",
          visits: 100,
          url: "https://example1.com",
        },
        {
          id: "2",
          label: "Example 2",
          visits: 200,
          url: "https://example2.com",
        },
      ],
    });

    render(<PageVisitsChart timePeriod={TIME_PERIOD.MONTH} timeDuration={1} />);

    // Check if the chart container is rendered
    const chartContainer = document.querySelector('[data-chart="chart-«r0»"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("renders nothing when there is no data", () => {
    // Mock no data
    mockUseTopFiveHistory.mockReturnValue({ data: null });

    render(<PageVisitsChart timePeriod={TIME_PERIOD.MONTH} timeDuration={1} />);

    // Check that nothing is rendered
    expect(screen.queryByRole("img", { hidden: true })).not.toBeInTheDocument();
  });
});
