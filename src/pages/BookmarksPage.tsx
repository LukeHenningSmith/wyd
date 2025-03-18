import { Card } from "@/components/ui/card";
import useChromeBookmarks from "@/hooks/bookmarks";

const BookmarksPage: React.FC = () => {
  const bookmarks = useChromeBookmarks();

  console.log("the bookmarks:", bookmarks);
  return (
    <>
      {/* map the bookmarkschema into cards with bright label NOT USED if lastUsed is undefined */}
      <ul>
        {bookmarks.map((bookmark) => (
          <Card key={bookmark.id}>
            <h3>{bookmark.title}</h3>
            <p>{bookmark.url}</p>
            {bookmark.lastUsed === undefined && (
              <span style={{ color: "red" }}>NOT USED</span>
            )}
          </Card>
        ))}
      </ul>
      <ul>
        {/* TODO */}
        {/* Helpful bookmarks (Bookmarks used in the last month) */}
        {/* No longer used (Bookmarks you haven't used this month) */}
        {/* New bookmarks (Bookmarks added in the last month) */}
      </ul>
    </>
  );
};

export default BookmarksPage;
