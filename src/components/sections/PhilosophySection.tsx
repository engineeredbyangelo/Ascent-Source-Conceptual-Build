import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";
import GlowDivider from "@/components/layout/GlowDivider";

const statements = [
  "Centralized grids are fragile.",
  "Clean energy must decentralize.",
  "Power should exist everywhere.",
];

const PhilosophySection = () => {
  return (
    <SectionContainer className="min-h-[180vh]" id="philosophy">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="tech-label text-primary mb-16"
        >
          Energy Philosophy
        </motion.p>

        <div className="space-y-20">
          {statements.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1,
                ease: [0.23, 1, 0.32, 1],
                delay: 0.1,
              }}
            >
              <h2 className="heading-section text-foreground text-balance">
                {text}
              </h2>
              {i < statements.length - 1 && <GlowDivider className="mt-20" />}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="body-text max-w-xl mt-20 text-pretty"
        >
          The Ascent Source is not a battery. It is a star in a box.
          4.2 Gigawatts of decentralized, zero-carbon potential.
        </motion.p>
      </div>
    </SectionContainer>
  );
};

export default PhilosophySection;
