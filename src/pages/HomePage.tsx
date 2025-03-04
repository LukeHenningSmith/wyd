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
        <WebUsagePieChart
          timePeriod={TIME_PERIOD.WEEK}
          timeDuration={1}
          timeString="This Week"
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-4 my-4">
        <WebUsagePieChart
          timePeriod={TIME_PERIOD.MONTH}
          timeDuration={1}
          timeString="This Month"
        />
        <WebUsagePieChart
          timePeriod={TIME_PERIOD.MONTH}
          timeDuration={3}
          timeString="This Quarter"
        />
      </div>
    </>
  );
}

export default HomePage;
