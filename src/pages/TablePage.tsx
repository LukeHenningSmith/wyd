// import { HistoryTable } from "@/components/HistoryTable";
import VisitCards from "@/components/VisitCards";
import useTempChromeHistory from "@/hooks/temp";
import { TIME_PERIOD } from "@/types";

function TablePage() {
  const history = useTempChromeHistory(TIME_PERIOD.DAY, 1);

  return <VisitCards history={history} />;

  // return <HistoryTable />;
}

export default TablePage;
