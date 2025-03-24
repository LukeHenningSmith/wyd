import BookmarksListCard from "@/components/cards/BookmarksListCard";
import BookmarksTotalCard from "@/components/cards/BookmarksTotalCard";
import { BookmarksPieChart } from "@/components/charts/BookmarksPieChart";
import { useBookmarks } from "@/hooks/bookmarks";

const BookmarksPage: React.FC = () => {
  const { data, isError, error, isPending } = useBookmarks();

  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <BookmarksPieChart bookmarks={data} isLoading={isPending} />
        <BookmarksListCard
          title="Bookmarks you use"
          description="Bookmarks you have used this month"
          bookmarks={
            data?.filter((bookmark) => bookmark.lastUsed !== undefined) || []
          }
          isLoading={isPending}
        />
      </div>
      <div className="flex flex-col gap-4">
        <BookmarksTotalCard bookmarks={data} isLoading={isPending} />

        <BookmarksListCard
          title="Bookmarks you don't use"
          description="Bookmarks you haven't used this month"
          bookmarks={data?.filter((bookmark) => !bookmark.lastUsed) || []}
          isLoading={isPending}
        />
      </div>
    </div>
  );
};

export default BookmarksPage;
