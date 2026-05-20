import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import SectionContainer from "@/components/layout/SectionContainer";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax depth on hero copy
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionContainer className="min-h-[200vh]" id="hero">
      <div ref={ref} className="flex flex-col items-center text-center w-full">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="space-y-8 will-change-transform"
        >
          {/* Curtain-reveal eyebrow */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="tech-label tracking-[0.3em]">
              Conceptual Fusion Technology
            </p>
          </motion.div>

          {/* Curtain-reveal headline: each line lifts independently */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.05em] leading-[0.85] text-foreground overflow-hidden">
            {["ENERGY FOR", "THE NEXT", "CIVILIZATION"].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 0.35 + i * 0.12,
                    duration: 1.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`block ${i === 1 ? "text-primary glow-text" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="body-text max-w-md mx-auto text-lg"
          >
            Power that scales from cities to homes.
            The Ascent Source reimagines fusion for a decentralized world.
          </motion.p>
        </motion.div>

        <motion.div
          style={{ y: subY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex flex-col items-center gap-6 mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <Link
              to="/discover"
              className="hud-button-primary inline-flex items-center gap-3 rounded-lg no-underline"
            >
              Discover the Technology
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <span className="tech-label text-muted-foreground/40 tracking-[0.25em]">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
