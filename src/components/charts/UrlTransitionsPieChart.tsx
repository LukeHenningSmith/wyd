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
import { useMemo } from "react";
import useChromeUrlHistory from "@/hooks/url-history";
import { getDescription, transitionTypes } from "@/constants";

const colors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const URL = "https://www.youtube.com/";

export function UrlTransitionsPieChart() {
  const urlHistory = useChromeUrlHistory(URL);

  const groupedTransitions = useMemo(() => {
    const transitionMap: { [key: string]: number } = {};
    urlHistory.forEach((item) => {
      const transition = item.transition || "No transition";
      if (!transitionMap[transition]) {
        transitionMap[transition] = 0;
      }
      transitionMap[transition]++;
    });

    return Object.keys(transitionMap).map((transition) => ({
      transition,
      count: transitionMap[transition],
    }));
  }, [urlHistory]);

  const chartConfig: ChartConfig = useMemo(() => {
    const config: ChartConfig = {};
    groupedTransitions.forEach((item, index) => {
      config[item.transition] = {
        label: item.transition,
        color: colors[index % colors.length],
      };
    });
    return config;
  }, [groupedTransitions]);

  const chartData = useMemo(() => {
    return groupedTransitions.map((item, index) => {
      return {
        label: item.transition,
        count: item.count,
        description: getDescription(
          item.transition as keyof typeof transitionTypes
        ),
        fill: colors[index % colors.length],
        url: URL,
      };
    });
  }, [groupedTransitions]);

  if (!chartData || !chartConfig) return null;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Url Transitions count</CardTitle>
        <CardDescription>{URL}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={chartData} dataKey="count" nameKey={"label"} />
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
