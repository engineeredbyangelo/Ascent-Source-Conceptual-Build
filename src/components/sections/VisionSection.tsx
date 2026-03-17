import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const VisionSection = () => {
  return (
    <SectionContainer className="min-h-screen" id="vision">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-10"
        >
          <p className="tech-label text-primary">The Vision</p>

          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.85] text-foreground">
            POWER THE
            <br />
            <span className="text-primary glow-text">NEXT CENTURY</span>
          </h2>

          <div className="w-24 h-px bg-primary/40 mx-auto" />

          <p className="body-text max-w-lg mx-auto text-lg md:text-xl text-pretty leading-relaxed">
            Ascent Source isn't a product announcement. It's an invitation
            to imagine energy infrastructure designed for abundance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-32 space-y-4"
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary/40 to-transparent mx-auto" />
          <p className="font-mono text-xs text-muted-foreground/40 tracking-widest">
            ASCENT SOURCE — CONCEPTUAL TECHNOLOGY
          </p>
          <p className="font-mono text-xs text-muted-foreground/30">
            © 2026 Ascent Labs
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default VisionSection;
