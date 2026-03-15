import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const HeroSection = () => {
  return (
    <SectionContainer className="min-h-[200vh]" id="hero">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="tech-label mb-6">Conceptual Fusion Technology</p>
          <h1 className="heading-hero text-foreground mb-6">
            ENERGY FOR THE
            <br />
            <span className="text-primary glow-text">NEXT CIVILIZATION</span>
          </h1>
          <p className="body-text max-w-lg mx-auto mb-12">
            Power that scales from cities to homes.
            <br />
            The Ascent Source reimagines fusion for a decentralized world.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <button className="hud-button-primary">
            ACCESS SCHEMATICS
          </button>
          <div className="mt-12 flex flex-col items-center gap-2">
            <span className="tech-label text-muted-foreground/40">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
