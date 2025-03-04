import { getFrequentedWebsites } from "@/api/chrome_history";
import { HistorySchema, TIME_PERIOD } from "@/types";
import { adaptHistoryItem, getTopFiveUniqueSites } from "@/util";
import { useState, useEffect } from "react";

const useChromeHistory = (timePeriod: TIME_PERIOD, timeDuration: number) => {
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

export default useChromeHistory;
