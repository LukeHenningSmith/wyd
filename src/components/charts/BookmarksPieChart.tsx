import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  const totalBookmarks = useMemo(() => {
    return bookmarks?.length;
  }, [bookmarks]);

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
      {isLoading ? (
        <CardContent className="flex-1 pb-0">
          <div className="flex justify-center items-center h-[250px]">
            <Loader size="large" />
          </div>
        </CardContent>
      ) : (
        <>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="label"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalBookmarks?.toLocaleString() || "--"}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Bookmarks
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="label" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-center gap-2 text-sm">
            <div className="flex gap-2 leading-none text-muted-foreground text-sm italic">
              {usedBookmarksCount > unusedBookmarksCount
                ? "You use most of your bookmarks!"
                : "You have many unused bookmarks!"}
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
