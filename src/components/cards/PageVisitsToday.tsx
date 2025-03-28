import { useUniquePageVistsToday } from "@/hooks/history";
import { Loader } from "../Loader";
import { Card, CardContent } from "../ui/card";

export default function PageVisitsToday() {
  const pageVisitsTodayQuery = useUniquePageVistsToday(
    new Date().toISOString().split("T")[0]
  );

  if (pageVisitsTodayQuery.isPending) {
    return (
      <Card>
        <CardContent>
          <div className="flex justify-center items-center h-[50px]">
            <Loader size="large" />
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-3xl">
              {pageVisitsTodayQuery.data}
            </span>
          </div>
          <div className="leading-none text-muted-foreground text-sm">
            Unique page visits today
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
