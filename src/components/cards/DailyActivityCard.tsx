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
const chartData = [
  { month: "Tuesday", visits: 186 },
  { month: "Wednesday", visits: 305 },
  { month: "Thursday", visits: 237 },
  { month: "Friday", visits: 73 },
  { month: "Saturday", visits: 209 },
  { month: "Sunday", visits: 214 },
  { month: "Monday", visits: 214 },
];
const chartConfig = {
  visits: {
    label: "visits",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function DailyActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily web activity</CardTitle>
        <CardDescription>
          Total page visits per day this past week
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
