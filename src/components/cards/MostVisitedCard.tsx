import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageVisitsChart } from "../charts/PageVisitsChart";
import { TIME_PERIOD } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";

export default function MostVisitedCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your favourite websites</CardTitle>
        <CardDescription>
          Shows website visits over selected time period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="this-week">This Week</TabsTrigger>
            <TabsTrigger value="this-month">This Month</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="mt-4">
            <PageVisitsChart timePeriod={TIME_PERIOD.DAY} timeDuration={1} />
          </TabsContent>
          <TabsContent value="this-week" className="mt-4">
            <PageVisitsChart timePeriod={TIME_PERIOD.WEEK} timeDuration={1} />
          </TabsContent>
          <TabsContent value="this-month" className="mt-4">
            <PageVisitsChart timePeriod={TIME_PERIOD.MONTH} timeDuration={1} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* TODO: make this value dynamic */}

        <div className="flex gap-2 leading-none text-muted-foreground text-sm">
          Overall site usage up by 5.2% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
