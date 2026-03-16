import { motion } from "framer-motion";
import SectionContainer from "@/components/layout/SectionContainer";

const scenes = [
  {
    title: "Residential Towers",
    description: "Entire districts powered by a single compact reactor, delivering clean energy to thousands of homes.",
    visual: (
      <div className="relative h-40 flex items-end justify-center gap-1.5 px-4 pb-2">
        {[65, 85, 50, 75, 90, 60, 80].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: `${h}%`, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="w-3 sm:w-4 rounded-t-sm border-t border-l border-r border-primary/30"
            style={{
              background: `linear-gradient(to top, hsl(var(--primary) / 0.25), hsl(var(--primary) / 0.05))`,
            }}
          >
            {/* Window lights */}
            <div className="flex flex-col items-center gap-1.5 pt-2">
              {Array.from({ length: Math.floor(h / 20) }).map((_, j) => (
                <div key={j} className="w-1 h-1 rounded-full bg-primary/60" />
              ))}
            </div>
          </motion.div>
        ))}
        {/* Reactor core at base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.8)]" />
        </div>
        {/* Energy flow lines */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    ),
  },
  {
    title: "Electric Transit",
    description: "Fusion-powered transit networks moving millions silently and emission-free across entire regions.",
    visual: (
      <div className="relative h-40 flex items-center justify-center overflow-hidden">
        {/* Track lines */}
        <div className="absolute w-full h-px top-1/2 bg-muted/40" />
        <div className="absolute w-full h-px top-[40%] bg-muted/20" />
        <div className="absolute w-full h-px top-[60%] bg-muted/20" />
        {/* Energy pulses along tracks */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-8 rounded-full"
            style={{
              top: `${40 + i * 10}%`,
              background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.8), transparent)`,
            }}
            animate={{ x: [-200, 200] }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.7,
            }}
          />
        ))}
        {/* Central station reactor */}
        <div className="relative z-10 w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]" />
          </div>
        </div>
        {/* Radial energy rings */}
        <motion.div
          className="absolute w-20 h-20 rounded-full border border-primary/20"
          animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    ),
  },
  {
    title: "Wireless Energy Grid",
    description: "A decentralized mesh network beaming power wirelessly, eliminating infrastructure bottlenecks.",
    visual: (
      <div className="relative h-40 flex items-center justify-center">
        {/* Grid nodes */}
        {[
          { x: 50, y: 50 }, { x: 25, y: 30 }, { x: 75, y: 30 },
          { x: 25, y: 70 }, { x: 75, y: 70 }, { x: 50, y: 20 },
          { x: 50, y: 80 }, { x: 15, y: 50 }, { x: 85, y: 50 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className={`rounded-full flex items-center justify-center ${i === 0 ? 'w-5 h-5 bg-primary/30 border border-primary/60' : 'w-2.5 h-2.5 bg-primary/20 border border-primary/30'}`}>
              {i === 0 && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)]" />}
            </div>
          </motion.div>
        ))}
        {/* Connection lines from center */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[
            [50, 50, 25, 30], [50, 50, 75, 30], [50, 50, 25, 70],
            [50, 50, 75, 70], [50, 50, 50, 20], [50, 50, 50, 80],
            [50, 50, 15, 50], [50, 50, 85, 50],
          ].map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="hsl(187 100% 50% / 0.15)"
              strokeWidth="0.3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            />
          ))}
        </svg>
      </div>
    ),
  },
  {
    title: "Micro Reactors",
    description: "Compact fusion units deployed anywhere — remote communities, ships, space stations — energy independence at any scale.",
    visual: (
      <div className="relative h-40 flex items-center justify-center">
        {/* Landscape dots */}
        {[
          { x: 20, y: 35 }, { x: 45, y: 55 }, { x: 70, y: 40 },
          { x: 35, y: 70 }, { x: 80, y: 65 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center gap-1"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
            </div>
            {/* Energy radius */}
            <motion.div
              className="absolute w-12 h-12 rounded-full border border-primary/10"
              animate={{ scale: [1, 1.3], opacity: [0.2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            />
          </motion.div>
        ))}
        {/* Terrain line */}
        <div className="absolute bottom-6 w-4/5 h-px bg-gradient-to-r from-transparent via-muted/30 to-transparent" />
      </div>
    ),
  },
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

        {/* Visual storytelling panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenes.map((scene, i) => (
            <motion.div
              key={scene.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="hud-panel p-6 group hover:border-primary/30 transition-colors duration-500"
            >
              {/* Visual */}
              <div className="mb-4 overflow-hidden rounded-md">
                {scene.visual}
              </div>
              {/* Text */}
              <h3 className="font-mono text-sm tracking-[0.15em] uppercase text-primary mb-2">
                {scene.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {scene.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default FutureCitySection;
