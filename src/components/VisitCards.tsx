import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type VisitCardsProps = {
  history: chrome.history.HistoryItem[];
};

function VisitCards({ history }: VisitCardsProps) {
  return (
    <>
      {history.map((item, index) => (
        <Card key={index} className="my-2">
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
    </>
  );
}

export default VisitCards;
