import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  useTopFiveHistory,
  useHistory,
  useUniquePageVistsToday,
  useUniquePageVistsWeek,
  usePopularTrends,
} from "./history";
import {
  getFrequentedWebsites,
  getWebVisitsBetweenDates,
} from "@/api/chrome_history";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TIME_PERIOD } from "@/types";

// Mock the API functions
vi.mock("@/api/chrome_history", () => ({
  getFrequentedWebsites: vi.fn(),
  getWebVisitsBetweenDates: vi.fn(),
}));

// Mock utility functions
vi.mock("@/util", () => ({
  adaptHistoryItem: vi.fn((data) => data),
  getTopFiveUniqueSites: vi.fn((data) => data.slice(0, 5)),
}));

describe("history hooks", () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("useTopFiveHistory fetches and adapts top five history", async () => {
    const mockHistory = [
      { id: "1", title: "Site 1", visitCount: 10 },
      { id: "2", title: "Site 2", visitCount: 20 },
    ];

    (getFrequentedWebsites as Mock).mockResolvedValue(mockHistory);

    const { result } = renderHook(
      () => useTopFiveHistory(TIME_PERIOD.MONTH, 1),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockHistory);
    expect(getFrequentedWebsites).toHaveBeenCalledWith("month", 1);
  });

  it("useHistory fetches and adapts history", async () => {
    const mockHistory = [
      { id: "1", title: "Site 1", visitCount: 10 },
      { id: "2", title: "Site 2", visitCount: 20 },
    ];

    (getFrequentedWebsites as Mock).mockResolvedValue(mockHistory);

    const { result } = renderHook(() => useHistory(TIME_PERIOD.MONTH, 1), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockHistory);
    expect(getFrequentedWebsites).toHaveBeenCalledWith("month", 1);
  });

  it("useUniquePageVistsToday fetches today's unique page visits", async () => {
    const mockVisits = [{ id: "1" }, { id: "2" }];

    (getWebVisitsBetweenDates as Mock).mockResolvedValue(mockVisits);

    const { result } = renderHook(() => useUniquePageVistsToday("2025-03-30"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBe(2);
    expect(getWebVisitsBetweenDates).toHaveBeenCalledTimes(1);
  });

  it("useUniquePageVistsWeek fetches unique page visits for the week", async () => {
    const mockVisits = [{ id: "1" }, { id: "2" }];

    (getWebVisitsBetweenDates as Mock).mockResolvedValue(mockVisits);

    const { result } = renderHook(() => useUniquePageVistsWeek(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([2, 2, 2, 2, 2, 2, 2]);
    expect(getWebVisitsBetweenDates).toHaveBeenCalledTimes(7);
  });

  it("usePopularTrends fetches and calculates popular trends", async () => {
    const mockThisMonth = [
      { id: "1", title: "Site 1", visitCount: 10 },
      { id: "2", title: "Site 2", visitCount: 20 },
    ];
    const mockLastMonth = [
      { id: "1", title: "Site 1", visitCount: 5 },
      { id: "2", title: "Site 2", visitCount: 15 },
    ];

    (getWebVisitsBetweenDates as Mock)
      .mockResolvedValueOnce(mockThisMonth) // This month's data
      .mockResolvedValueOnce(mockLastMonth); // Last month's data

    const { result } = renderHook(
      () => usePopularTrends(TIME_PERIOD.MONTH, 1),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([
      {
        id: "1",
        label: "Site 1",
        thisPeriod: 10,
        lastPeriod: 5,
        visits: 10,
      },
      {
        id: "2",
        label: "Site 2",
        thisPeriod: 20,
        lastPeriod: 15,
        visits: 20,
      },
    ]);
    expect(getWebVisitsBetweenDates).toHaveBeenCalledTimes(2);
  });
});
