import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const useCases = [
  { label: "Homes", stat: "120 kW", description: "Single family residential" },
  { label: "Offices", stat: "2.4 MW", description: "Commercial complexes" },
  { label: "Vehicles", stat: "850 kW", description: "EV charging networks" },
  { label: "Transit", stat: "12 MW", description: "Metro rail systems" },
  { label: "Telecom", stat: "480 kW", description: "Tower infrastructure" },
];

const AscentSourceSection = () => {
  return (
    <SectionContainer className="min-h-[200vh]" id="source">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-24"
        >
          <p className="tech-label text-primary mb-6">Modular Infrastructure</p>
          <h2 className="heading-section text-foreground mb-6">
            THE ASCENT
            <br />
            <span className="text-primary glow-text">SOURCE UNIT</span>
          </h2>
          <p className="body-text max-w-lg">
            Compressed to infrastructure scale. One unit powers a neighborhood.
            A cluster powers a city.
          </p>
        </motion.div>

        <div className="space-y-1">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="hud-panel p-6 md:p-8 group hover:border-primary/30 transition-all duration-300 cursor-default flex items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span className="font-mono text-xs text-muted-foreground/40 tracking-widest w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-mono text-sm tracking-wider text-foreground">
                    {uc.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{uc.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="data-readout text-xl md:text-2xl group-hover:text-primary transition-colors">{uc.stat}</p>
                <p className="text-xs text-muted-foreground/60">per unit</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default AscentSourceSection;
