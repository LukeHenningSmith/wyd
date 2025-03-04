// import { HistoryTable } from "@/components/HistoryTable";
import VisitCards from "@/components/VisitCards";
import useChromeHistory from "@/hooks/chrome-history";
import { TIME_PERIOD } from "@/types";

function TablePage() {
  const history = useChromeHistory(TIME_PERIOD.DAY, 1);

  return <VisitCards history={history} />;

  // return <HistoryTable />;
}

export default TablePage;
