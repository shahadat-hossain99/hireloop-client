import CTASection from "@/components/Home/CTASection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroBanner from "@/components/Home/HeroBanner";
import HeroSection from "@/components/Home/HeroSection";
import PricingSection from "@/components/Home/PricingSection";
import StatsSection from "@/components/Home/StatsSection";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-black">
      {/* <HeroBanner></HeroBanner>
      <StatsSection></StatsSection> */}
      <HeroSection></HeroSection>
      <FeaturesSection></FeaturesSection>
      <PricingSection></PricingSection>
      <CTASection></CTASection>
    </div>
  );
}
