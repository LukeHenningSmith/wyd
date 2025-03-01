import { getHistory } from "@/api/chrome_history";
import { WebUsagePieChart } from "@/components/charts/WebUsagePieChart";
import { TIME_PERIOD } from "@/types";
import { useEffect, useMemo, useState } from "react";

function HomePage() {
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

  const topFiveUniqueSites = useMemo(() => {
    return history
      .sort((a, b) => {
        if (!a.visitCount) return 1;
        if (!b.visitCount) return -1;
        return b.visitCount - a.visitCount;
      })
      .reduce((acc: chrome.history.HistoryItem[], item) => {
        const existingItem = acc.find((site) => site.title === item.title);
        if (existingItem) {
          existingItem.visitCount =
            (existingItem.visitCount || 0) + (item.visitCount || 0);
          existingItem.url += `, ${item.url}`;
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, [])
      .slice(0, 5)
      .map((item) => {
        return {
          id: item.id,
          label: item.title || "No title",
          visits: item.visitCount || 0,
          url: item.url,
        };
      });
  }, [history]);

  return (
    <>
      <div className="w-full grid grid-cols-2 gap-4">
        <WebUsagePieChart data={topFiveUniqueSites} />
        <WebUsagePieChart data={topFiveUniqueSites} />
      </div>
      <div className="w-full grid grid-cols-2 gap-4 my-4">
        <WebUsagePieChart data={topFiveUniqueSites} />
        <WebUsagePieChart data={topFiveUniqueSites} />
      </div>
    </>
  );
}

export default HomePage;
