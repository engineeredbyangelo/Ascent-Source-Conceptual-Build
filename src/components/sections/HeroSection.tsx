import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const HeroSection = () => {
  return (
    <SectionContainer className="min-h-[200vh]" id="hero">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-8"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="tech-label tracking-[0.3em]"
          >
            Conceptual Fusion Technology
          </motion.p>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.05em] leading-[0.85] text-foreground">
            ENERGY FOR
            <br />
            <span className="text-primary glow-text">THE NEXT</span>
            <br />
            <span className="text-foreground">CIVILIZATION</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="body-text max-w-md mx-auto text-lg"
          >
            Power that scales from cities to homes.
            The Ascent Source reimagines fusion for a decentralized world.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex flex-col items-center gap-3 mt-20"
        >
          <span className="tech-label text-muted-foreground/40 tracking-[0.25em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
