import { getBookmarksWithLastUsed } from "@/api/chrome_bookmarks";
import { BookmarkSchema } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useBookmarks() {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: async (): Promise<BookmarkSchema[]> => {
      return await getBookmarksWithLastUsed();
    },
  });
}
