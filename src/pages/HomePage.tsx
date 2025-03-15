import BiggestMoversCard from "@/components/cards/BiggestMoversCard";
import BookmarkUsageCard from "@/components/cards/BookmarkUsageCard";
import { DailyActivityCard } from "@/components/cards/DailyActivityCard";
import MostVisitedCard from "@/components/cards/MostVisitedCard";

function HomePage() {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <DailyActivityCard />
        <BiggestMoversCard />
      </div>
      <div className="flex flex-col gap-4">
        <MostVisitedCard />
        <BookmarkUsageCard />
      </div>
    </div>
  );
}

export default HomePage;
