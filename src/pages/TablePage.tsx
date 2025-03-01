import { getHistory } from "@/api/chrome_history";
import { HistoryTable } from "@/components/HistoryTable";
import { TIME_PERIOD } from "@/types";
import { useEffect, useState } from "react";

function TablePage() {
  const [, setHistory] = useState<chrome.history.HistoryItem[]>([]);

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

  return <HistoryTable />;
}

export default TablePage;
