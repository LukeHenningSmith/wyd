import {
  getFrequentedWebsites,
  getWebVisitsBetweenDates,
} from "@/api/chrome_history";
import { HistoryChange, HistorySchema, TIME_PERIOD } from "@/types";
import { adaptHistoryItem, getTopFiveUniqueSites } from "@/util";
import { useQuery } from "@tanstack/react-query";

const MS_IN_DAY = 24 * 60 * 60 * 1000; //Milliseconds in a day

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
      console.log("useHistory hook running");
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
        new Date(Date.now() - MS_IN_DAY),
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
        const startDate = new Date(Date.now() - MS_IN_DAY * i);
        const endDate = new Date(Date.now() - MS_IN_DAY * (i - 1));
        const dayVisits = await getWebVisitsBetweenDates(startDate, endDate);
        days.push(dayVisits.length);
      }
      return days;
    },
  });
}

export function usePopularTrends(
  timePeriod: TIME_PERIOD,
  timeDuration: number
) {
  return useQuery({
    queryKey: ["popular-trends", timePeriod, timeDuration],
    queryFn: async (): Promise<HistoryChange[]> => {
      const twoMonthsAgo = new Date(Date.now() - MS_IN_DAY * 30 * 2);
      const monthAgo = new Date(Date.now() - MS_IN_DAY * 30);
      const now = new Date();

      const thisMonthHistory = await getWebVisitsBetweenDates(monthAgo, now);
      const thisMonthTop5 = getTopFiveUniqueSites(thisMonthHistory);
      const lastMonthHistory = await getWebVisitsBetweenDates(
        twoMonthsAgo,
        monthAgo
      );

      return thisMonthTop5.map((site) => {
        const lastMonthVisits = lastMonthHistory.find(
          (item) => item.title === site.title
        );
        return {
          id: site.id,
          label: site.title || "No title",
          visits: site.visitCount || 0,
          url: site.url,
          thisPeriod: site.visitCount ?? 0,
          lastPeriod: lastMonthVisits?.visitCount ?? 0,
        };
      });
    },
  });
}
