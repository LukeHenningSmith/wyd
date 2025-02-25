import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Button } from "./components/ui/button";
import MyChart from "./components/MyChart";
import { MyPieChart } from "./components/MyPieChart";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

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

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex justify-end p-4">
        <ModeToggle />
      </div>
      <div className="App" style={{ width: "800px" }}>
        <div className="max-w-md">
          <MyChart />
          <MyPieChart />
        </div>
        {history
          .sort((a, b) => {
            if (!a.visitCount) return 1;
            if (!b.visitCount) return -1;
            return b.visitCount - a.visitCount;
          })
          .map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <h3 className="card-title">{item.title || "No title"}</h3>
              </CardHeader>
              <CardContent>
                <p>{item.url}</p>
                <p>
                  Last visited:{" "}
                  {new Date(item.lastVisitTime || 0).toLocaleString()}
                </p>
                <p>Visit count: {item.visitCount}</p>
                <Button
                  onClick={() => {
                    chrome.tabs.create({ url: item.url });
                  }}
                >
                  Visit
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </ThemeProvider>
  );
}

export default App;
