import { useState } from "react";
import { BookmarkSchema } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import BookmarkCard from "./components/BookmarkCard";
import { Button } from "../ui/button"; // Assuming you have a Button component

export default function BookmarksListCard({
  bookmarks,
  title,
  description,
}: {
  bookmarks: BookmarkSchema[];
  title: string;
  description: string;
}) {
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
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
      </CardContent>
    </Card>
  );
}
