import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const pillars = [
  { number: "01", title: "Passive Failsafe Core", description: "Physics-based shutdown requires no operator intervention. The reactor cannot melt down — it's thermodynamically impossible." },
  { number: "02", title: "Autonomous Threat Detection", description: "AI-driven perimeter monitoring, anomaly detection, and real-time response across all deployment sites." },
  { number: "03", title: "Encrypted Energy Mesh", description: "All reactor-to-grid communications use quantum-resistant encryption, preventing interception or spoofing." },
  { number: "04", title: "Modular Containment Shells", description: "Multi-layered physical shielding rated for seismic, ballistic, and environmental extremes." },
  { number: "05", title: "Decentralized Redundancy", description: "No single point of failure. If one unit goes offline, the mesh redistributes load instantly." },
];

const SecuritySection = () => {
  return (
    <SectionContainer className="min-h-[200vh]" id="security">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-24"
        >
          <p className="tech-label text-primary mb-6">Infrastructure Security</p>
          <h2 className="heading-section text-foreground mb-6">
            SECURED
            <br />
            <span className="text-primary glow-text">BY DESIGN</span>
          </h2>
          <p className="body-text max-w-lg">
            Every Ascent Source unit is engineered with five interlocking security layers — from quantum-level encryption to physics-based failsafes.
          </p>
        </motion.div>

        <div className="space-y-0">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="border-t border-primary/10 py-8 md:py-10 group hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
                <div className="flex items-center gap-6 md:gap-10 md:w-2/5 shrink-0">
                  <span className="font-mono text-xs text-muted-foreground/40 tracking-widest w-6">
                    {pillar.number}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {pillar.title}
                  </h3>
                </div>
                <p className="body-text text-sm md:text-base text-muted-foreground md:pt-1 pl-12 md:pl-0">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-primary/10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-24 max-w-xl"
        >
          <div className="border-l-2 border-primary/30 pl-8">
            <p className="body-text text-lg md:text-xl leading-relaxed">
              Security isn't a feature — it's the foundation.
              <span className="text-primary font-medium"> Zero breaches. Zero meltdowns. By physics, not policy.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default SecuritySection;
