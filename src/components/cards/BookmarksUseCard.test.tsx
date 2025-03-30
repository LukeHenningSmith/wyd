import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookmarksUseCard from "./BookmarksUseCard";
import { BookmarkSchema } from "@/types";

// Mock the `BookmarksList` component
vi.mock("./BookmarksList", () => ({
  default: ({
    bookmarks,
    isLoading,
  }: {
    bookmarks: BookmarkSchema[];
    isLoading: boolean;
  }) => (
    <div data-testid="bookmarks-list">
      {isLoading
        ? "Loading..."
        : bookmarks.map((bookmark) => (
            <div key={bookmark.id} data-testid="bookmark-item">
              {bookmark.title}
            </div>
          ))}
    </div>
  ),
}));

describe("BookmarksUseCard", () => {
  const mockBookmarks = [
    { id: "1", title: "Bookmark 1", lastUsed: 1672531200000 },
    { id: "2", title: "Bookmark 2" },
    { id: "3", title: "Bookmark 3", lastUsed: 1672531200000 },
    { id: "4", title: "Bookmark 4" },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the card title and description", () => {
    render(<BookmarksUseCard bookmarks={mockBookmarks} isLoading={false} />);

    // Check if the title and description are rendered
    expect(screen.getByText("Used and unused bookmarks")).toBeInTheDocument();
    expect(
      screen.getByText("Bookmarks you have / haven't used this month")
    ).toBeInTheDocument();
  });

  it("renders the 'Used' bookmarks by default", () => {
    render(<BookmarksUseCard bookmarks={mockBookmarks} isLoading={false} />);

    // Check if the "Used" tab is active and displays the correct bookmarks
    const usedBookmarks = screen.getAllByTestId("bookmark-item");
    expect(usedBookmarks).toHaveLength(2);
    expect(screen.getByText("Bookmark 1")).toBeInTheDocument();
    expect(screen.getByText("Bookmark 3")).toBeInTheDocument();
    expect(screen.queryByText("Bookmark 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Bookmark 4")).not.toBeInTheDocument();
  });

  it("switches to 'Unused' bookmarks when the tab is clicked", async () => {
    render(<BookmarksUseCard bookmarks={mockBookmarks} isLoading={false} />);

    // Click the "Unused" tab
    const unusedTab = screen.getByRole("tab", { name: "Unused" });
    await userEvent.click(unusedTab);

    // Check if the "Unused" tab displays the correct bookmarks
    const unusedBookmarks = screen.getAllByTestId("bookmark-item");
    expect(unusedBookmarks).toHaveLength(2);
    expect(screen.getByText("Bookmark 2")).toBeInTheDocument();
    expect(screen.getByText("Bookmark 4")).toBeInTheDocument();
    expect(screen.queryByText("Bookmark 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Bookmark 3")).not.toBeInTheDocument();
  });

  it("renders the loader when `isLoading` is true", () => {
    render(<BookmarksUseCard bookmarks={mockBookmarks} isLoading={true} />);

    // Check if the loader is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders nothing when no bookmarks are provided", () => {
    render(<BookmarksUseCard bookmarks={[]} isLoading={false} />);

    // Check that no bookmarks are rendered
    expect(screen.queryByTestId("bookmark-item")).not.toBeInTheDocument();
  });
});
