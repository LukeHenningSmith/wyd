import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useBookmarks } from "./bookmarks";
import { getBookmarksWithLastUsed } from "@/api/chrome_bookmarks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the `getBookmarksWithLastUsed` API function
vi.mock("@/api/chrome_bookmarks", () => ({
  getBookmarksWithLastUsed: vi.fn(),
}));

describe("useBookmarks", () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetches bookmarks successfully", async () => {
    const mockBookmarks = [
      {
        id: "1",
        title: "Bookmark 1",
        url: "https://example1.com",
        lastUsed: null,
      },
      {
        id: "2",
        title: "Bookmark 2",
        url: "https://example2.com",
        lastUsed: 1672531200000,
      },
    ];

    (getBookmarksWithLastUsed as Mock).mockResolvedValue(mockBookmarks);

    const { result } = renderHook(() => useBookmarks(), { wrapper });

    // Wait for the query to resolve
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Check if the data matches the mock
    expect(result.current.data).toEqual(mockBookmarks);
    expect(getBookmarksWithLastUsed).toHaveBeenCalledTimes(1);
  });
});
