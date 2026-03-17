import { CoreValuesSection } from "@/components/sections/CoreValueSection";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import FeaturedTours from "@/components/sections/FeaturedTours";
import TransfersSection from "@/components/sections/TransfersSection";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedTours />
      <WhyUsSection />
      <TransfersSection />
      <CoreValuesSection />
    </>
  );
}
