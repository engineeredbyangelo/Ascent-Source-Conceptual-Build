import { motion } from "framer-motion";

interface HudOverlayProps {
  scrollProgress: number;
}

const HudOverlay = ({ scrollProgress }: HudOverlayProps) => {
  const powerOutput = (scrollProgress * 4.2).toFixed(1);
  const stability = (95 + scrollProgress * 4.8).toFixed(1);
  const temperature = (15 + scrollProgress * 135).toFixed(0);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      {/* Top-left status */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-6 left-6 sm:top-8 sm:left-8"
      >
        <div className="tech-label mb-2">System Status</div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          <span className="data-readout">ONLINE</span>
        </div>
      </motion.div>

      {/* Top-right data */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 text-right"
      >
        <div className="tech-label mb-1">Power Output</div>
        <div className="data-readout text-lg">{powerOutput} GW</div>
      </motion.div>

      {/* Bottom-left data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8"
      >
        <div className="flex gap-8">
          <div>
            <div className="tech-label mb-1">Stability</div>
            <div className="data-readout">{stability}%</div>
          </div>
          <div>
            <div className="tech-label mb-1">Core Temp</div>
            <div className="data-readout">{temperature}M°C</div>
          </div>
        </div>
      </motion.div>

      {/* Bottom-right identifier */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-right"
      >
        <div className="tech-label">ASCENT SOURCE</div>
        <div className="font-mono text-xs text-muted-foreground/50 mt-1">v0.1.0-alpha</div>
      </motion.div>
    </div>
  );
};

export default HudOverlay;
