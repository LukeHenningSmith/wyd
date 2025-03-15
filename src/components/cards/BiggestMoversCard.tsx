import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TrendingUp } from "lucide-react";

function MovementCard() {
  return (
    <div className="border-b pb-2">
      <div className="flex justify-between">
        <div className="flex text-lg">Youtube</div>
        <span className="text-sm">850 views</span>
      </div>
      <div className="flex gap-2 font-medium leading-none">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      </div>
    </div>
  );
}

export default function BiggestMoversCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biggest changes</CardTitle>
        <CardDescription>Changes in monthly page visits.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          <MovementCard />
          <MovementCard />
        </div>
      </CardContent>
    </Card>
  );
}
