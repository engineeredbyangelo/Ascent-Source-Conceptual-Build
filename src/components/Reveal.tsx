import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds */
  delay?: number;
  /** Curtain direction */
  direction?: "up" | "down" | "left" | "right";
  /** Animate every time it enters view */
  repeat?: boolean;
  as?: "div" | "section" | "h1" | "h2" | "h3" | "p" | "span" | "li";
}

/**
 * Curtain-style reveal. Uses clip-path to lift the content into view rather
 * than a flat fade, producing a "curtain lifting" feel.
 */
const Reveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  repeat = false,
  as = "div",
}: RevealProps) => {
  const reduce = useReducedMotion();

  const clipFrom = {
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  }[direction];

  const yFrom = direction === "up" ? 24 : direction === "down" ? -24 : 0;
  const xFrom = direction === "left" ? 24 : direction === "right" ? -24 : 0;

  const variants: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: {
          opacity: 0,
          y: yFrom,
          x: xFrom,
          clipPath: clipFrom,
          filter: "blur(6px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          clipPath: "inset(0% 0 0 0)",
          filter: "blur(0px)",
          transition: {
            duration: 1.1,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
