import { getHistory } from "@/api/chrome_history";
import { TIME_PERIOD } from "@/types";
import { useState, useEffect } from "react";

const useTempChromeHistory = (
  timePeriod: TIME_PERIOD,
  timeDuration: number
) => {
  const [history, setHistory] = useState<chrome.history.HistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyItems = await getHistory(timePeriod, timeDuration);
        setHistory(historyItems);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, [timeDuration, timePeriod]);

  return history;
};

export default useTempChromeHistory;
