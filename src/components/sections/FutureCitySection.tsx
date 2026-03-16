import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const cityElements = [
  "Glowing residential towers",
  "Electric transit networks",
  "Wireless energy grid",
  "Distributed micro reactors",
];

const FutureCitySection = () => {
  return (
    <SectionContainer className="min-h-[180vh]" id="city">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <div className="hud-panel p-8 sm:p-10 inline-block">
            <p className="tech-label text-primary mb-6">2040 Projection</p>
            <h2 className="heading-section text-foreground mb-6">
              A WORLD POWERED BY
              <br />
              <span className="text-primary glow-text">ASCENT</span>
            </h2>
          </div>
        </motion.div>

        {/* Stylized city visualization using CSS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-64 sm:h-80 md:h-96 mb-16 rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-carbon to-background/50">
            <div className="absolute bottom-0 w-full flex items-end justify-center gap-1 sm:gap-2 px-4">
              {Array.from({ length: 20 }).map((_, i) => {
                const h = 30 + Math.random() * 60;
                const w = 8 + Math.random() * 16;
                const delay = i * 0.05;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: `${h}%`, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="rounded-t-sm"
                    style={{
                      width: `${w}px`,
                      background: `linear-gradient(to top, hsl(187 100% 50% / 0.15), hsl(187 100% 50% / 0.03))`,
                      borderTop: "1px solid hsl(187 100% 50% / 0.3)",
                      borderLeft: "1px solid hsl(187 100% 50% / 0.1)",
                      borderRight: "1px solid hsl(187 100% 50% / 0.1)",
                    }}
                  />
                );
              })}
            </div>
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-primary/10 to-transparent" />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cityElements.map((el, i) => (
            <motion.div
              key={el}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
              className="hud-panel p-4 text-center"
            >
              <div className="w-1 h-1 rounded-full bg-primary mx-auto mb-3" />
              <p className="font-mono text-xs tracking-wider text-muted-foreground">{el}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default FutureCitySection;
