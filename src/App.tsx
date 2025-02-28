import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { WebUsagePieChart } from "./components/WebUsagePieChart";
import VisitCards from "./components/VisitCards";

function App() {
  const [history, setHistory] = useState<chrome.history.HistoryItem[]>([]);

  useEffect(() => {
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const oneWeekAgo = new Date().getTime() - millisecondsPerWeek;
    chrome.history.search(
      {
        text: "",
        startTime: oneWeekAgo, // that was accessed less than one week ago.
        maxResults: 100,
      },
      function (results) {
        const historyList: chrome.history.HistoryItem[] = [];
        results.forEach(function (item) {
          historyList.push(item);
        });
        setHistory(historyList);
      }
    );
  }, []);

  /** Features to implement
   * 1. Landing page starts with two charts of most visited, with summary below. Has controls for last day, last week, last month.
   * 2. Clicking the 'view more' on the summary table opens a virtualised table of all the history.
   * 3. Clicking 'plot history' on the summary table opens a line chart of the history for a specific url.
   */

  // TODO: Put the top 5 most visited in a pie chart, and rest in 'other' category

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
    <ThemeProvider defaultTheme="dark">
      <div className="flex justify-between p-4 text-center h-16 items-center">
        <span className="text-2xl font-bold">WYD</span>
        <ModeToggle />
      </div>
      <div className="App" style={{ width: "600px" }}>
        <div className="w-full flex-col py-4 px-8 justify-center items-center">
          <WebUsagePieChart data={topFiveUniqueSites} />

          <VisitCards history={history} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
