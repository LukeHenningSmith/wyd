import { usePopularTrends } from "@/hooks/history";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TIME_PERIOD } from "@/types";
import TrendEntry from "./components/TrendEntry";
import { Button } from "../ui/button";
import { useState } from "react";

export default function TrendingCard() {
  const popularTrendsQuery = usePopularTrends(TIME_PERIOD.MONTH, 1);
  const [viewAll, setViewAll] = useState(false);

  if (popularTrendsQuery.isLoading) return null; //TODO: Replace with loading indicator
  return (
    <Card>
      <CardHeader>
        <CardTitle>Changes in your favourite sites</CardTitle>
        <CardDescription>
          Monthly changes in your top visited websites.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          {popularTrendsQuery.data?.slice(0, viewAll ? 5 : 2).map((site) => (
            <TrendEntry site={site} />
          ))}
          {!viewAll && (
            <div className="flex w-full items-center justify-center ">
              <Button
                variant="outline"
                size={"sm"}
                onClick={() => setViewAll(true)}
              >
                Show More
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
