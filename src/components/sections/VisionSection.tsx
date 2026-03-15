import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const VisionSection = () => {
  return (
    <SectionContainer className="min-h-screen" id="vision">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="tech-label text-primary mb-8">The Vision</p>
          <h2 className="heading-hero text-foreground mb-8">
            POWER THE
            <br />
            <span className="text-primary glow-text">NEXT CENTURY</span>
          </h2>
          <p className="body-text max-w-md mx-auto mb-12 text-pretty">
            Ascent Source isn't a product announcement. It's an invitation
            to imagine energy infrastructure designed for abundance.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="hud-button-primary">
              EXPLORE THE FUTURE OF ENERGY
            </button>
            <button className="hud-button">
              VIEW CORE SPECS
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24"
        >
          <p className="font-mono text-xs text-muted-foreground/40 tracking-widest">
            ASCENT SOURCE — CONCEPTUAL TECHNOLOGY
          </p>
          <p className="font-mono text-xs text-muted-foreground/30 mt-2">
            © 2026 Ascent Labs
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default VisionSection;
