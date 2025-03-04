import { UrlTransitionsPieChart } from "@/components/charts/UrlTransitionsPieChart";
import { WebUsagePieChart } from "@/components/charts/WebUsagePieChart";
import { TIME_PERIOD } from "@/types";

function HomePage() {
  return (
    <>
      <div className="w-full grid grid-cols-2 gap-4">
        <WebUsagePieChart
          timePeriod={TIME_PERIOD.DAY}
          timeDuration={1}
          timeString="Today"
        />
        <UrlTransitionsPieChart />
      </div>
    </>
  );
}

export default HomePage;
