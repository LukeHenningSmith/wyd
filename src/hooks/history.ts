import {
  getFrequentedWebsites,
  getWebVisitsBetweenDates,
} from "@/api/chrome_history";
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

export function useUniquePageVistsToday(date: string) {
  return useQuery({
    queryKey: ["unique-page-visits-today", date],
    queryFn: async (): Promise<number> => {
      const lastDay = await getWebVisitsBetweenDates(
        new Date(Date.now() - 24 * 60 * 60 * 1000),
        new Date()
      );
      return lastDay.length;
    },
  });
}

export function useUniquePageVistsWeek() {
  return useQuery({
    queryKey: [
      "unique-page-visits-week",
      new Date().toISOString().split("T")[0],
    ],
    queryFn: async (): Promise<number[]> => {
      const days = [];
      for (let i = 7; i > 0; i--) {
        const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000 * i);
        const endDate = new Date(Date.now() - 24 * 60 * 60 * 1000 * (i - 1));
        const dayVisits = await getWebVisitsBetweenDates(startDate, endDate);
        days.push(dayVisits.length);
      }
      return days;
    },
  });
}
