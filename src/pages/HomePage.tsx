import { DailyActivityCard } from "@/components/cards/DailyActivityCard";
import MostVisitedCard from "@/components/cards/MostVisitedCard";
import TrendingCard from "@/components/cards/TrendingCard";
import PageVisitsToday from "@/components/cards/PageVisitsToday";

function HomePage() {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <DailyActivityCard />
        <TrendingCard />
      </div>
      <div className="flex flex-col gap-4">
        <PageVisitsToday />
        <MostVisitedCard />
      </div>
    </div>
  );
}

export default HomePage;
