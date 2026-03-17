import { HeroBanner } from "@/components/sections/HeroBanner";
import FeaturedTours from "@/components/sections/FeaturedTours";
import OurToursSection from "@/components/sections/OurToursSection";
import GuestsLoveWineroad from "@/components/sections/GuestsLoveWineroad";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedTours />
      <OurToursSection />
      <GuestsLoveWineroad />
    </>
  );
}
