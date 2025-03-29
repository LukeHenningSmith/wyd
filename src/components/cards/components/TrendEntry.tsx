import { TrendingUp } from "lucide-react";
import { TrendingDown } from "lucide-react";
import { HistoryChange } from "@/types";

export default function TrendEntry({ site }: { site: HistoryChange }) {
  const change = ((site.thisPeriod - site.lastPeriod) / site.lastPeriod) * 100;
  return (
    <div className="flex flex-col gap-2 border-b pb-2">
      <div className="flex justify-between">
        <div className="flex text-sm">
          {site.label}
          <span className="text-xs text-muted-foreground ml-2">
            ({site.thisPeriod} views)
          </span>
        </div>
      </div>

      <div className="flex gap-2 leading-none text-muted-foreground text-xs">
        {change === 0 ? (
          "No change in views this month"
        ) : (
          <>
            Trending {change > 0 ? "up" : "down"} by {change.toFixed(2)}% this
            month{" "}
            {change > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </>
        )}
      </div>
    </div>
  );
}
