import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BookmarksPieChart } from "./BookmarksPieChart";
import { BookmarkSchema } from "@/types";

// Mock the `Loader` component
vi.mock("../Loader", () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
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

describe("BookmarksPieChart", () => {
  const mockBookmarks: BookmarkSchema[] = [
    { id: "1", title: "bookmark1", lastUsed: 1743254658661.724 },
    { id: "2", title: "bookmark2" },
    { id: "3", title: "bookmark3" },
    { id: "4", title: "bookmark4" },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the loader when `isLoading` is true", () => {
    render(<BookmarksPieChart bookmarks={mockBookmarks} isLoading={true} />);

    // Check if the loader is rendered
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("renders the chart with correct data when `isLoading` is false", () => {
    render(<BookmarksPieChart bookmarks={mockBookmarks} isLoading={false} />);

    // Check if the chart title is rendered
    expect(screen.getByText("Bookmark totals")).toBeInTheDocument();

    // Check if the description is rendered
    expect(
      screen.getByText("Number of unique bookmarks used this month")
    ).toBeInTheDocument();

    expect(
      screen.getByText("You have many unused bookmarks!")
    ).toBeInTheDocument();
  });

  it("renders the correct message based on bookmark usage", () => {
    // Case 1: More used bookmarks
    render(
      <BookmarksPieChart bookmarks={[mockBookmarks[0]]} isLoading={false} />
    );
    expect(
      screen.getByText("You use most of your bookmarks!")
    ).toBeInTheDocument();

    // Case 2: More unused bookmarks
    render(<BookmarksPieChart bookmarks={mockBookmarks} isLoading={false} />);
    expect(
      screen.getByText("You have many unused bookmarks!")
    ).toBeInTheDocument();
  });
});
