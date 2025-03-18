import { getBookmarksWithLastUsed } from "@/api/chrome_bookmarks";
import { BookmarkSchema } from "@/types";
import { useState, useEffect } from "react";

const useChromeBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkSchema[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const result = await getBookmarksWithLastUsed();
        setBookmarks(result);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  return bookmarks;
};

export default useChromeBookmarks;
