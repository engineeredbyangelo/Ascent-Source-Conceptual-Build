import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const components = [
  {
    label: "Plasma Torus",
    description: "High-temperature plasma loop sustained by magnetic fields at 150 million °C.",
  },
  {
    label: "Magnetic Containment",
    description: "Stabilizing fusion plasma with high-temperature superconducting coils.",
  },
  {
    label: "Cooling Lattice",
    description: "Hexagonal thermal management grid dissipating excess energy safely.",
  },
  {
    label: "Energy Converters",
    description: "Direct energy conversion from plasma to electrical output at 98% efficiency.",
  },
];

const panelVariants = {
  hidden: { opacity: 0, x: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

const ExplodedSection = () => {
  return (
    <SectionContainer className="min-h-[200vh]" id="engineering">
      <div className="flex flex-col lg:flex-row items-start gap-16">
        {/* Left spacer for 3D */}
        <div className="hidden lg:block lg:w-1/2" />

        {/* Right panels */}
        <div className="w-full lg:w-1/2 space-y-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="tech-label text-primary"
          >
            Engineering Breakdown
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="heading-section text-foreground"
          >
            INSIDE THE
            <br />
            <span className="text-primary">CONTAINMENT FIELD</span>
          </motion.h2>

          <div className="space-y-6 pt-4">
            {components.map((comp, i) => (
              <motion.div
                key={comp.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={panelVariants}
                className="hud-panel p-6 group cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:shadow-[0_0_12px_hsl(187_100%_50%/0.6)] transition-shadow" />
                  <div>
                    <h3 className="heading-feature text-foreground mb-2 font-mono text-base tracking-wide">
                      {comp.label}
                    </h3>
                    <p className="body-text text-sm">{comp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ExplodedSection;
