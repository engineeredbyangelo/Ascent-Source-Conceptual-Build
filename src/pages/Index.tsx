import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import ReactorCanvas from "@/components/3d/ReactorCanvas";
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
  const { scrollYProgress } = useScroll();

  // Spring-smoothed scroll for parallax depth on the reactor canvas.
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
  });

  const reactorY = useTransform(smoothed, [0, 1], ["0%", "-12%"]);
  const reactorScale = useTransform(smoothed, [0, 0.5, 1], [1, 1.04, 0.96]);

  return (
    <div className="relative bg-background">
      {/* 3D Canvas - fixed background with parallax depth */}
      <motion.div
        style={{ y: reactorY, scale: reactorScale }}
        className="fixed inset-0 z-0 will-change-transform"
      >
        <ReactorCanvas scrollProgress={scrollProgress} />
      </motion.div>




      {/* Scroll progress rail */}
      <motion.div
        style={{ scaleX: smoothed }}
        className="fixed top-0 left-0 right-0 h-px bg-primary origin-left z-50 shadow-[0_0_12px_hsl(187_100%_50%/0.8)]"
      />

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
