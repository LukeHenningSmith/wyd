import { BookmarksPieChart } from "@/components/charts/BookmarksPieChart";
import { useBookmarks } from "@/hooks/bookmarks";
import { Loader } from "@/components/Loader";

const BookmarksPage: React.FC = () => {
  const { data, isError, error, isPending } = useBookmarks();

  {
    /* TODO */
  }
  {
    /* PIE CHART OF USED VS UNUSED BOOKMARKS in top left */
  }
  {
    /* Helpful bookmarks (Bookmarks used in the last month) */
  }
  {
    /* No longer used (Bookmarks you haven't used this month) */
  }
  {
    /* New bookmarks (Bookmarks added in the last month) */
  }

  if (isPending)
    return (
      <div className="flex justify-center items-center h-96">
        <Loader size="large" />
      </div>
    );
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <BookmarksPieChart bookmarks={data} />
        <BookmarksPieChart bookmarks={data} />
      </div>
      <div className="flex flex-col gap-4">
        <BookmarksPieChart bookmarks={data} />
        <BookmarksPieChart bookmarks={data} />
      </div>
    </div>
  );
};

export default BookmarksPage;
