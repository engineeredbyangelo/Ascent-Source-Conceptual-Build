import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const topics = [
  {
    title: "ARC Fusion Inspiration",
    body: "Based on MIT's ARC reactor concept — a compact, high-field tokamak using high-temperature superconducting magnets to achieve net-positive fusion.",
    stat: "150M°C",
    statLabel: "Plasma temperature",
  },
  {
    title: "Decentralized Power",
    body: "No centralized grid dependency. Each Source unit operates independently, forming mesh networks that self-balance load across communities.",
    stat: "100%",
    statLabel: "Grid independent",
  },
  {
    title: "Energy Density",
    body: "Fusion fuel (deuterium) is virtually unlimited. One gallon of seawater contains enough deuterium to produce energy equivalent to 300 gallons of gasoline.",
    stat: "300×",
    statLabel: "Energy density vs gasoline",
  },
  {
    title: "Modular Infrastructure",
    body: "Factory-produced, truck-transportable units. Install anywhere — from metropolitan substations to remote outposts — in under 72 hours.",
    stat: "72h",
    statLabel: "Deploy time",
  },
];

const TechSection = () => {
  return (
    <SectionContainer className="min-h-[180vh]" id="technology">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="tech-label text-primary mb-4">Technical Foundation</p>
            <h2 className="heading-section text-foreground">
              HOW IT <span className="text-primary">WORKS</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="body-text max-w-md text-sm"
          >
            Four pillars of technology that make compact fusion a reality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.9,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="hud-panel p-8 md:p-10 group hover:border-primary/20 transition-all duration-500"
            >
              {/* Stat callout */}
              <div className="mb-6">
                <span className="font-display text-4xl md:text-5xl font-bold text-primary/80 group-hover:text-primary transition-colors duration-300">
                  {topic.stat}
                </span>
                <p className="tech-label text-muted-foreground/60 mt-1">{topic.statLabel}</p>
              </div>

              <div className="w-full h-px bg-border/30 mb-6" />

              <h3 className="font-mono text-sm tracking-wider text-foreground mb-3">
                {topic.title}
              </h3>
              <p className="body-text text-sm leading-relaxed">{topic.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default TechSection;
