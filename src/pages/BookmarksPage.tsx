import BookmarksUseCard from "@/components/cards/BookmarksUseCard";
import { BookmarksPieChart } from "@/components/charts/BookmarksPieChart";
import { useBookmarks } from "@/hooks/bookmarks";

const BookmarksPage: React.FC = () => {
  const { data, isError, error, isPending } = useBookmarks();

  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <BookmarksPieChart bookmarks={data} isLoading={isPending} />
      </div>
      <div className="flex flex-col gap-4">
        <BookmarksUseCard bookmarks={data} isLoading={isPending} />
      </div>
    </div>
  );
};

export default BookmarksPage;
