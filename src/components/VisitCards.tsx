import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type VisitCardsProps = {
  history: chrome.history.HistoryItem[];
};

function VisitCards({ history }: VisitCardsProps) {
  return (
    <>
      {history
        .sort((a, b) => {
          if (!a.visitCount) return 1;
          if (!b.visitCount) return -1;
          return b.visitCount - a.visitCount;
        })
        .slice(0, 10) //top 10
        .map((item, index) => (
          <Card key={index} className="m-2">
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
    </>
  );
}

export default VisitCards;
