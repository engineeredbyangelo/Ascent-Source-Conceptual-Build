import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const statements = [
  { text: "Centralized grids are fragile.", number: "01" },
  { text: "Clean energy must decentralize.", number: "02" },
  { text: "Power should exist everywhere.", number: "03" },
];

const PhilosophySection = () => {
  return (
    <SectionContainer className="min-h-[200vh]" id="philosophy">
      <div className="flex flex-col items-start max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="tech-label text-primary mb-20"
        >
          Energy Philosophy
        </motion.p>

        <div className="space-y-24 w-full">
          {statements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 1.2,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="flex items-start gap-8 md:gap-12"
            >
              <span className="font-mono text-sm text-primary/40 mt-3 shrink-0 tracking-widest">
                {item.number}
              </span>
              <div className="space-y-4">
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.9] text-foreground">
                  {item.text}
                </h2>
                <div className="w-16 h-px bg-primary/30" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-32 max-w-xl"
        >
          <div className="border-l-2 border-primary/30 pl-8">
            <p className="body-text text-lg md:text-xl leading-relaxed">
              The Ascent Source is not a battery. It is a star in a box.
              <span className="text-primary font-medium"> 4.2 Gigawatts</span> of decentralized, zero-carbon potential.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default PhilosophySection;
