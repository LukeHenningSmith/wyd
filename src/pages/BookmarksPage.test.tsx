import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import BookmarksPage from "./BookmarksPage";
import { useBookmarks } from "@/hooks/bookmarks";
import { BookmarkSchema } from "@/types";

vi.mock("@/hooks/bookmarks", () => ({
  useBookmarks: vi.fn(),
}));

vi.mock("@/components/charts/BookmarksPieChart", () => ({
  BookmarksPieChart: ({
    bookmarks,
    isLoading,
  }: {
    bookmarks: BookmarkSchema[];
    isLoading: boolean;
  }) => (
    <div data-testid="bookmarks-pie-chart">
      {isLoading
        ? "Loading Pie Chart..."
        : `Pie Chart with ${bookmarks?.length || 0} bookmarks`}
    </div>
  ),
}));

vi.mock("@/components/cards/BookmarksUseCard", () => ({
  default: ({
    bookmarks,
    isLoading,
  }: {
    bookmarks: BookmarkSchema[];
    isLoading: boolean;
  }) => (
    <div data-testid="bookmarks-use-card">
      {isLoading
        ? "Loading Use Card..."
        : `Use Card with ${bookmarks?.length || 0} bookmarks`}
    </div>
  ),
}));

describe("BookmarksPage", () => {
  const mockUseBookmarks = useBookmarks as Mock;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders an error message when `isError` is true", () => {
    mockUseBookmarks.mockReturnValue({
      data: null,
      isError: true,
      error: { message: "Something went wrong" },
      isPending: false,
    });

    render(<BookmarksPage />);

    // Check if the error message is rendered
    expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
  });

  it("renders the loading state for both components when `isPending` is true", () => {
    mockUseBookmarks.mockReturnValue({
      data: null,
      isError: false,
      error: null,
      isPending: true,
    });

    render(<BookmarksPage />);

    // Check if the loading states are rendered
    expect(screen.getByText("Loading Pie Chart...")).toBeInTheDocument();
    expect(screen.getByText("Loading Use Card...")).toBeInTheDocument();
  });

  it("renders the components with data when `data` is available", () => {
    mockUseBookmarks.mockReturnValue({
      data: [
        { id: "1", title: "Bookmark 1" },
        { id: "2", title: "Bookmark 2" },
      ],
      isError: false,
      error: null,
      isPending: false,
    });

    render(<BookmarksPage />);

    // Check if the components are rendered with the correct data
    expect(screen.getByText("Pie Chart with 2 bookmarks")).toBeInTheDocument();
    expect(screen.getByText("Use Card with 2 bookmarks")).toBeInTheDocument();
  });

  it("renders empty components when `data` is empty", () => {
    mockUseBookmarks.mockReturnValue({
      data: [],
      isError: false,
      error: null,
      isPending: false,
    });

    render(<BookmarksPage />);

    // Check if the components are rendered with no bookmarks
    expect(screen.getByText("Pie Chart with 0 bookmarks")).toBeInTheDocument();
    expect(screen.getByText("Use Card with 0 bookmarks")).toBeInTheDocument();
  });
});
