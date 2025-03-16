import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TIME_PERIOD } from "@/types";
import { useTopFiveChromeHistory } from "@/hooks/chrome-history";
import { useMemo } from "react";
import { CHART_COLORS } from "@/constants";

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig;

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

type Props = {
  timePeriod: TIME_PERIOD;
  timeDuration: number;
};

export function PageVisitsChart({ timePeriod, timeDuration }: Props) {
  const history = useTopFiveChromeHistory(timePeriod, timeDuration);

  const chartConfig: ChartConfig = useMemo(() => {
    const config: ChartConfig = {};
    history.forEach((item, index) => {
      config[item.label] = {
        label: item.label,
        color: CHART_COLORS[index % CHART_COLORS.length],
      };
    });
    return config;
  }, [history]);

  const chartData = useMemo(() => {
    return history.map((item, index) => {
      return {
        label: item.label,
        visits: item.visits,
        fill: CHART_COLORS[index % CHART_COLORS.length],
        url: item.url,
      };
    });
  }, [history]);

  if (!chartData || !chartConfig) return null;

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{ right: 80 }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="label"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey="visits" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar dataKey="visits" layout="vertical" radius={4} width={20}>
          <LabelList
            dataKey="label"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
            width={600}
          />
          {/* <LabelList
            dataKey="visits"
            position="insideLeft"
            offset={8}
            className="fill-background"
            fontSize={12}
          /> */}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
