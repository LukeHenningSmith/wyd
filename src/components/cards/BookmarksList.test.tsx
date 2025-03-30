import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookmarksList from "./BookmarksList";

// Mock the `Loader` component
vi.mock("../Loader", () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

// Mock the `BookmarkCard` component
vi.mock("./BookmarkCard", () => ({
  default: ({ bookmark }: { bookmark: { id: string; title: string } }) => (
    <div data-testid="bookmark-card">{bookmark.title}</div>
  ),
}));

describe("BookmarksList", () => {
  const mockBookmarks = [
    {
      id: "1",
      title: "Bookmark 1",
      url: "https://example1.com",
    },
    {
      id: "2",
      title: "Bookmark 2",
      url: "https://example2.com",
    },
    {
      id: "3",
      title: "Bookmark 3",
      url: "https://example3.com",
    },
    {
      id: "4",
      title: "Bookmark 4",
      url: "https://example4.com",
    },
    {
      id: "5",
      title: "Bookmark 5",
      url: "https://example5.com",
    },
    {
      id: "6",
      title: "Bookmark 6",
      url: "https://example6.com",
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the loader when `isLoading` is true", () => {
    render(<BookmarksList bookmarks={mockBookmarks} isLoading={true} />);

    // Check if the loader is rendered
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("renders the correct number of bookmarks initially", () => {
    render(<BookmarksList bookmarks={mockBookmarks} isLoading={false} />);

    // Check if only the first 5 bookmarks are rendered
    const bookmarkCards = screen.getAllByTestId("bookmark-card");
    expect(bookmarkCards).toHaveLength(5);
    expect(screen.getByText("Bookmark 1")).toBeInTheDocument();
    expect(screen.getByText("Bookmark 5")).toBeInTheDocument();
    expect(screen.queryByText("Bookmark 6")).not.toBeInTheDocument();
  });

  it("renders the 'Show More' button when there are more bookmarks to show", () => {
    render(<BookmarksList bookmarks={mockBookmarks} isLoading={false} />);

    // Check if the "Show More" button is rendered
    const showMoreButton = screen.getByRole("button", { name: "Show More" });
    expect(showMoreButton).toBeInTheDocument();
  });

  it("loads more bookmarks when 'Show More' is clicked", async () => {
    render(<BookmarksList bookmarks={mockBookmarks} isLoading={false} />);

    // Click the "Show More" button
    const showMoreButton = screen.getByRole("button", { name: "Show More" });
    await userEvent.click(showMoreButton);

    // Check if all 6 bookmarks are now rendered
    const bookmarkCards = screen.getAllByTestId("bookmark-card");
    expect(bookmarkCards).toHaveLength(6);
    expect(screen.getByText("Bookmark 6")).toBeInTheDocument();
  });

  it("does not render the 'Show More' button when all bookmarks are visible", async () => {
    render(
      <BookmarksList bookmarks={mockBookmarks.slice(0, 5)} isLoading={false} />
    );

    // Check if the "Show More" button is not rendered
    expect(
      screen.queryByRole("button", { name: "Show More" })
    ).not.toBeInTheDocument();
  });
});
