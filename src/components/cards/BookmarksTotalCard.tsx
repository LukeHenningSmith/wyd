import { Loader } from "../Loader";
import { Card, CardContent } from "../ui/card";
import { BookmarkSchema } from "@/types";

export default function BookmarksTotalCard({
  bookmarks,
  isLoading,
}: {
  bookmarks?: BookmarkSchema[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <div className="flex justify-center items-center h-[50px]">
            <Loader size="large" />
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-3xl">{bookmarks?.length}</span>
          </div>
          <div className="leading-none text-muted-foreground text-sm">
            Your number of bookmarks in all folders
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
