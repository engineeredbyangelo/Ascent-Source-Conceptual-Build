import ReactorCanvas from "@/components/3d/ReactorCanvas";
import HudOverlay from "@/components/ui/HudOverlay";
import HeroSection from "@/components/sections/HeroSection";
import ExplodedSection from "@/components/sections/ExplodedSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import AscentSourceSection from "@/components/sections/AscentSourceSection";
import FutureCitySection from "@/components/sections/FutureCitySection";
import SecuritySection from "@/components/sections/SecuritySection";
import TechSection from "@/components/sections/TechSection";
import VisionSection from "@/components/sections/VisionSection";
import useScrollProgress from "@/hooks/useScrollProgress";

const Index = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="relative bg-background">
      {/* 3D Canvas - fixed background */}
      <ReactorCanvas scrollProgress={scrollProgress} />

      {/* HUD Overlay */}
      <HudOverlay />

      {/* Scroll narrative sections */}
      <main className="relative z-10">
        <HeroSection />
        <ExplodedSection />
        <PhilosophySection />
        <AscentSourceSection />
        <FutureCitySection />
        <SecuritySection />
        <TechSection />
        <VisionSection />
      </main>
    </div>
  );
};

export default Index;
