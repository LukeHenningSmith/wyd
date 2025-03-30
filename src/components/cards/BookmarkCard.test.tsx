import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookmarkCard from "./BookmarkCard";

// Mock `chrome.tabs.create`
vi.stubGlobal("chrome", {
  tabs: {
    create: vi.fn(),
  },
});

// Mock `formatShortTimestamp`
vi.mock("@/util", () => ({
  formatShortTimestamp: vi.fn((timestamp) => `Formatted: ${timestamp}`),
}));

describe("BookmarkCard", () => {
  const mockBookmark = {
    id: "1",
    title: "Example Bookmark",
    url: "https://example.com",
    lastUsed: 1672531200000, // Example timestamp
  };

  it("renders the bookmark title and last used date", () => {
    render(<BookmarkCard bookmark={mockBookmark} />);

    // Check if the title is rendered
    expect(screen.getByText("Example Bookmark")).toBeInTheDocument();

    // Check if the last used date is rendered
    expect(
      screen.getByText("Last used: Formatted: 1672531200000")
    ).toBeInTheDocument();
  });

  it("renders 'Never' when lastUsed is null", () => {
    const bookmark = { ...mockBookmark, lastUsed: undefined };

    render(<BookmarkCard bookmark={bookmark} />);

    // Check if "Never" is displayed
    expect(screen.getByText("Last used: Never")).toBeInTheDocument();
  });

  it("opens the bookmark URL in a new tab when clicked", async () => {
    render(<BookmarkCard bookmark={mockBookmark} />);

    const titleElement = screen.getByText("Example Bookmark");

    // Simulate a click on the title
    await userEvent.click(titleElement);

    // Check if `chrome.tabs.create` was called with the correct URL
    expect(chrome.tabs.create).toHaveBeenCalledWith({
      url: "https://example.com",
    });
  });

  it("shows the icon on hover", async () => {
    render(<BookmarkCard bookmark={mockBookmark} />);

    const titleElement = screen.getByText("Example Bookmark");
    const icon = document.querySelector("svg.lucide-move-up-right");

    // Ensure the icon is initially hidden
    expect(icon).toHaveClass("opacity-0");

    // Simulate hovering over the title
    await userEvent.hover(titleElement);

    // Ensure the icon becomes visible
    expect(icon).toHaveClass("group-hover:opacity-100");
  });
});
