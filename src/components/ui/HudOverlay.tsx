import { motion } from "framer-motion";

const HudOverlay = () => {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      {/* Top-left brand identifier */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-6 left-6 sm:top-8 sm:left-8"
      >
        <div className="tech-label text-sm tracking-[0.3em]">ASCENT SOURCE</div>
        <div className="font-mono text-[10px] text-muted-foreground/40 mt-1">v0.1.0-alpha</div>
      </motion.div>
    </div>
  );
};

export default HudOverlay;
