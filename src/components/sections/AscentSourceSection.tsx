import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const useCases = [
  { label: "Homes", stat: "120 kW", icon: "⬡" },
  { label: "Offices", stat: "2.4 MW", icon: "⬢" },
  { label: "Vehicles", stat: "850 kW", icon: "◈" },
  { label: "Transit", stat: "12 MW", icon: "◇" },
  { label: "Telecom", stat: "480 kW", icon: "◎" },
];

const AscentSourceSection = () => {
  return (
    <SectionContainer className="min-h-[200vh]" id="source">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <p className="tech-label text-primary mb-6">Modular Infrastructure</p>
          <h2 className="heading-section text-foreground mb-6">
            THE ASCENT
            <br />
            <span className="text-primary glow-text">SOURCE UNIT</span>
          </h2>
          <p className="body-text max-w-lg mx-auto">
            Compressed to infrastructure scale. One unit powers a neighborhood.
            A cluster powers a city.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.label}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="hud-panel p-6 group hover:border-primary/30 transition-all duration-300 cursor-default"
            >
              <div className="text-2xl mb-4 text-primary/60 group-hover:text-primary transition-colors">
                {uc.icon}
              </div>
              <h3 className="font-mono text-sm tracking-wider text-foreground mb-1">
                {uc.label}
              </h3>
              <p className="data-readout text-lg">{uc.stat}</p>
              <p className="text-xs text-muted-foreground mt-2">per unit capacity</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default AscentSourceSection;
