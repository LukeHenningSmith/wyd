import { BookmarkSchema } from "@/types";
import { formatShortTimestamp } from "@/util";
import { MoveUpRight } from "lucide-react";

export default function BookmarkCard({
  bookmark,
}: {
  bookmark: BookmarkSchema;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="flex items-center text-sm cursor-pointer hover:underline group"
        onClick={() => chrome.tabs.create({ url: bookmark.url })}
      >
        {bookmark.title}
        <MoveUpRight
          size={16}
          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </span>
      <div className="leading-none text-muted-foreground text-sm">
        Last used:{" "}
        {bookmark.lastUsed ? formatShortTimestamp(bookmark.lastUsed) : "Never"}
      </div>
    </div>
  );
}
