import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
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
import useChromeHistory from "@/hooks/chrome-history";
import { TIME_PERIOD } from "@/types";
import { useMemo } from "react";

const colors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type Props = {
  timePeriod: TIME_PERIOD;
  timeDuration: number;
  timeString: string;
};

export function WebUsagePieChart({
  timePeriod,
  timeDuration,
  timeString,
}: Props) {
  const history = useChromeHistory(timePeriod, timeDuration);

  const chartConfig: ChartConfig = useMemo(() => {
    const config: ChartConfig = {};
    history.forEach((item, index) => {
      config[item.label] = {
        label: item.label,
        color: colors[index % colors.length],
      };
    });
    return config;
  }, [history]);

  const chartData = useMemo(() => {
    return history.map((item, index) => {
      return {
        label: item.label,
        visits: item.visits,
        fill: colors[index % colors.length],
        url: item.url,
      };
    });
  }, [history]);

  if (!chartData || !chartConfig) return null;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Website Visits</CardTitle>
        <CardDescription>{timeString}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visits" nameKey={"label"} />
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visits" hideLabel />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
