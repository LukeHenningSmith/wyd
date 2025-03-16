import { Card, CardContent } from "../ui/card";

export default function BookmarkUsageCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-3xl">11%</span>
            <span className="font-semibold text-base">
              of navigation using bookmarks
            </span>
          </div>
          <div className="leading-none text-muted-foreground text-sm">
            May be time to create a few more bookmarks!
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
