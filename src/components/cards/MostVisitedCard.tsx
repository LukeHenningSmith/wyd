import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageVisitsChart } from "../charts/PageVisitsChart";
import { TIME_PERIOD } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MostVisitedCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your favourite websites</CardTitle>
        <CardDescription>
          Website visits as of the selected time period
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
    </Card>
  );
}
