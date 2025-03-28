import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useUniquePageVistsWeek } from "@/hooks/history";
import { useMemo } from "react";

export function DailyActivityCard() {
  const query = useUniquePageVistsWeek();

  const chartConfig = {
    visits: {
      label: "visits",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const chartData = useMemo(() => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayIndex = new Date().getDay() + 1;
    return query.data?.map((count, index) => {
      return {
        month: daysOfWeek[(currentDayIndex + index) % 7],
        visits: count,
      };
    });
  }, [query.data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily web activity</CardTitle>
        <CardDescription>
          Total unique pages visited per day this week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="visits"
              type="natural"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-1)" }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
