import { getFrequentedWebsites } from "@/api/chrome_history";
import { HistorySchema, TIME_PERIOD } from "@/types";
import { adaptHistoryItem, getTopFiveUniqueSites } from "@/util";
import { useState, useEffect } from "react";

export const useTopFiveChromeHistory = (
  timePeriod: TIME_PERIOD,
  timeDuration: number
) => {
  const [history, setHistory] = useState<HistorySchema[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyItems = await getFrequentedWebsites(
          timePeriod,
          timeDuration
        );
        setHistory(adaptHistoryItem(getTopFiveUniqueSites(historyItems)));
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, [timeDuration, timePeriod]);

  return history;
};

export const useChromeHistory = (
  timePeriod?: TIME_PERIOD,
  timeDuration?: number
) => {
  const [history, setHistory] = useState<HistorySchema[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Defaults to last year
        const historyItems = await getFrequentedWebsites(
          timePeriod ?? TIME_PERIOD.MONTH,
          timeDuration ?? 12
        );
        setHistory(adaptHistoryItem(historyItems));
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, [timeDuration, timePeriod]);

  return history;
};
