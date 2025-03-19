import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BookmarkSchema } from "@/types";
import { useMemo } from "react";
import { Loader } from "../Loader";

const colors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function BookmarksPieChart({
  bookmarks,
  isLoading,
}: {
  bookmarks?: BookmarkSchema[];
  isLoading: boolean;
}) {
  const usedBookmarksCount = useMemo(() => {
    if (!bookmarks) return 0;
    return bookmarks.filter((bookmark) => bookmark.lastUsed).length;
  }, [bookmarks]);
  const unusedBookmarksCount = useMemo(() => {
    if (!bookmarks) return 0;
    return bookmarks.length - usedBookmarksCount;
  }, [bookmarks, usedBookmarksCount]);

  const chartConfig: ChartConfig = {
    used: {
      label: "Used",
      color: colors[0],
    },
    unused: {
      label: "Unused",
      color: colors[1],
    },
  };

  const chartData = useMemo(
    () => [
      {
        label: "unused",
        count: usedBookmarksCount,
        fill: colors[3],
      },
      {
        label: "used",
        count: unusedBookmarksCount,
        fill: colors[4],
      },
    ],
    [usedBookmarksCount, unusedBookmarksCount]
  );

  if (!chartData || !chartConfig) return null;

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Your bookmark use</CardTitle>
        <CardDescription>
          Number of unique bookmarks used this month
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-[250px]">
            <Loader size="large" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <Pie data={chartData} dataKey="count" nameKey={"label"} />
              <ChartLegend
                content={<ChartLegendContent nameKey="label" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
              <ChartTooltip
                content={<ChartTooltipContent nameKey="count" hideLabel />}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
