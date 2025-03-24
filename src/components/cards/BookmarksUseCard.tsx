import { BookmarkSchema } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookmarksList from "./BookmarksList";

export default function BookmarksUseCard({
  bookmarks,
  isLoading,
}: {
  bookmarks?: BookmarkSchema[];
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Used vs unused bookmarks</CardTitle>
        <CardDescription>
          Bookmarks you have / haven't used this month
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="used">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="used">Used</TabsTrigger>
            <TabsTrigger value="unused">Unused</TabsTrigger>
          </TabsList>
          <TabsContent value="used" className="mt-4">
            <BookmarksList
              bookmarks={
                bookmarks?.filter(
                  (bookmark) => bookmark.lastUsed !== undefined
                ) || []
              }
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="unused" className="mt-4">
            <BookmarksList
              bookmarks={
                bookmarks?.filter((bookmark) => !bookmark.lastUsed) || []
              }
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
