import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const topics = [
  {
    title: "ARC Fusion Inspiration",
    body: "Based on MIT's ARC reactor concept — a compact, high-field tokamak using high-temperature superconducting magnets to achieve net-positive fusion.",
  },
  {
    title: "Decentralized Power",
    body: "No centralized grid dependency. Each Source unit operates independently, forming mesh networks that self-balance load across communities.",
  },
  {
    title: "Energy Density",
    body: "Fusion fuel (deuterium) is virtually unlimited. One gallon of seawater contains enough deuterium to produce energy equivalent to 300 gallons of gasoline.",
  },
  {
    title: "Modular Infrastructure",
    body: "Factory-produced, truck-transportable units. Install anywhere — from metropolitan substations to remote outposts — in under 72 hours.",
  },
];

const TechSection = () => {
  return (
    <SectionContainer className="min-h-[150vh]" id="technology">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="tech-label text-primary mb-4">Technical Foundation</p>
          <h2 className="heading-section text-foreground">
            HOW IT <span className="text-primary">WORKS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.12,
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="hud-panel p-8 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-primary/60" />
                <h3 className="font-mono text-sm tracking-wider text-foreground">
                  {topic.title}
                </h3>
              </div>
              <p className="body-text text-sm leading-relaxed">{topic.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default TechSection;
