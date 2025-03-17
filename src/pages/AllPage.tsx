import { AllHistoryTable } from "@/components/tables/AllHistoryTable";
import { useChromeHistory } from "@/hooks/chrome-history";
import { TIME_PERIOD } from "@/types";

function AllPage() {
  const history = useChromeHistory(TIME_PERIOD.MONTH, 12);

  return <AllHistoryTable data={history} />;
}

export default AllPage;
