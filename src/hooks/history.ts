import { getFrequentedWebsites } from "@/api/chrome_history";
import { HistorySchema, TIME_PERIOD } from "@/types";
import { adaptHistoryItem, getTopFiveUniqueSites } from "@/util";
import { useQuery } from "@tanstack/react-query";

export function useTopFiveHistory(
  timePeriod: TIME_PERIOD,
  timeDuration: number
) {
  return useQuery({
    queryKey: ["history", "topFive", timePeriod, timeDuration],
    queryFn: async (): Promise<HistorySchema[]> => {
      const historyItems = await getFrequentedWebsites(
        timePeriod,
        timeDuration
      );
      return adaptHistoryItem(getTopFiveUniqueSites(historyItems));
    },
  });
}

export function useHistory(timePeriod: TIME_PERIOD, timeDuration: number) {
  return useQuery({
    queryKey: ["history", timePeriod, timeDuration],
    queryFn: async (): Promise<HistorySchema[]> => {
      const historyItems = await getFrequentedWebsites(
        timePeriod ?? TIME_PERIOD.MONTH,
        timeDuration ?? 12
      );
      return adaptHistoryItem(historyItems);
    },
  });
}

export function usePageVisitsToday(date: string) {
  return useQuery({
    queryKey: ["page-visits-today", date],
    queryFn: async (): Promise<number> => {
      const lastTwoDays = await getFrequentedWebsites(TIME_PERIOD.WEEK, 2);
      const lastDay = await getFrequentedWebsites(TIME_PERIOD.WEEK, 1);

      const lastTwoDaysVisitCount = lastTwoDays
        .filter((entry) => {
          return entry.visitCount !== undefined;
        })
        .reduce((acc, item) => acc + item.visitCount!, 0);
      const lastDayVisitCount = lastDay
        .filter((entry) => {
          return entry.visitCount !== undefined;
        })
        .reduce((acc, item) => acc + item.visitCount!, 0);

      return lastTwoDaysVisitCount - lastDayVisitCount;
    },
  });
}
