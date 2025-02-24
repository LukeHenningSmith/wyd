import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Button } from "./components/ui/button";

function App() {
  const [history, setHistory] = useState<chrome.history.HistoryItem[]>([]);

  useEffect(() => {
    chrome.history.search({ text: "", maxResults: 100 }, function (results) {
      const historyList: chrome.history.HistoryItem[] = [];
      results.forEach(function (item) {
        historyList.push(item);
      });
      setHistory(historyList);
    });
  }, []);

  return (
    <div className="App" style={{ width: "800px" }}>
      {history.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <h3 className="card-title">{item.title || "No title"}</h3>
          </CardHeader>
          <CardContent>
            <p>{item.url}</p>
            <p>
              Last visited: {new Date(item.lastVisitTime || 0).toLocaleString()}
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
  );
}

export default App;
