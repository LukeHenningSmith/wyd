import { BookmarkSchema } from "@/types";

export async function getBookmarksWithLastUsed(): Promise<BookmarkSchema[]> {
  return new Promise((resolve) => {
    chrome.bookmarks.getTree(async (bookmarkTreeNodes) => {
      const bookmarks: BookmarkSchema[] = [];

      function traverse(nodes: chrome.bookmarks.BookmarkTreeNode[]) {
        for (const node of nodes) {
          if (node.url) {
            bookmarks.push({
              id: node.id,
              title: node.title,
              url: node.url,
            });
          }
          if (node.children) {
            traverse(node.children);
          }
        }
      }

      traverse(bookmarkTreeNodes);

      // Fetch last used timestamps
      const historyPromises = bookmarks.map(
        (bookmark) =>
          new Promise<void>((resolveHistory) => {
            chrome.history.search(
              { text: bookmark.url!, maxResults: 1 },
              (historyItems) => {
                if (historyItems.length > 0) {
                  bookmark.lastUsed = historyItems[0].lastVisitTime;
                }
                resolveHistory();
              }
            );
          })
      );

      await Promise.all(historyPromises);
      resolve(bookmarks);
    });
  });
}
