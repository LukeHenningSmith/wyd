import { useState } from "react";
import { BookmarkSchema } from "@/types";
import { CardContent } from "../ui/card";
import BookmarkCard from "./BookmarkCard";
import { Button } from "../ui/button";
import { Loader } from "../Loader";

export default function BookmarksList({
  bookmarks,
  isLoading,
}: {
  bookmarks: BookmarkSchema[];
  isLoading: boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <CardContent>
      {isLoading ? (
        <div className="flex justify-center items-center h-[250px]">
          <Loader size="large" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {bookmarks.slice(0, visibleCount).map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>

          {visibleCount < bookmarks.length && (
            <div className="flex w-full items-center justify-center ">
              <Button
                variant="outline"
                className="mt-4"
                size={"sm"}
                onClick={() => setVisibleCount((prev) => prev + 5)}
              >
                Show More
              </Button>
            </div>
          )}
        </>
      )}
    </CardContent>
  );
}
