// import BookmarkUsageCard from "@/components/cards/BookmarkUsageCard";
import { DailyActivityCard } from "@/components/cards/DailyActivityCard";
import MostVisitedCard from "@/components/cards/MostVisitedCard";
import TrendingCard from "@/components/cards/TrendingCard";

function HomePage() {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <DailyActivityCard />
        <TrendingCard />
      </div>
      <div className="flex flex-col gap-4">
        <MostVisitedCard />
        {/* TODO: Replace with another small widget */}
        {/* <BookmarkUsageCard /> */}
      </div>
    </div>
  );
}

export default HomePage;
