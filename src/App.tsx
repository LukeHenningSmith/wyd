import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { WebUsagePieChart } from "./components/WebUsagePieChart";
// import VisitCards from "./components/VisitCards";
import Header from "./components/header/Header";

function App() {
  const [history, setHistory] = useState<chrome.history.HistoryItem[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("history");

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
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="App" style={{ width: "700px" }}>
        <div className="w-full flex-col py-4 px-8 mt-20 justify-center items-center">
          {/* TODO: Use React Router's createMemoryRouter for page navigation */}
          <div className="w-full grid grid-cols-2 gap-4">
            <WebUsagePieChart data={topFiveUniqueSites} />
            <WebUsagePieChart data={topFiveUniqueSites} />
          </div>

          <div className="w-full grid grid-cols-2 gap-4 my-4">
            <WebUsagePieChart data={topFiveUniqueSites} />
            <WebUsagePieChart data={topFiveUniqueSites} />
          </div>

          {/* <VisitCards history={history} /> */}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
