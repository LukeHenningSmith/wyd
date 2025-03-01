import { getHistory } from "@/api/chrome_history";
import VisitCards from "@/components/VisitCards";
import { TIME_PERIOD } from "@/types";
import { useEffect, useState } from "react";

function TablePage() {
  const [history, setHistory] = useState<chrome.history.HistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyItems = await getHistory(TIME_PERIOD.MONTH, 3);

        setHistory(historyItems);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, []);

  return <VisitCards history={history} />;
}

export default TablePage;
