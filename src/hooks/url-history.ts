import { getWebsiteVisit } from "@/api/chrome_history";
import { useState, useEffect } from "react";

const useChromeUrlHistory = (url: string) => {
  const [history, setHistory] = useState<chrome.history.VisitItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const urlItems = await getWebsiteVisit(url);
        setHistory(urlItems);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, [url]);

  return history;
};

export default useChromeUrlHistory;
