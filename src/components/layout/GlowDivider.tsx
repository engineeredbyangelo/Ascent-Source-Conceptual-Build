import { cn } from "@/lib/utils";

const GlowDivider = ({ className }: { className?: string }) => (
  <div className={cn("relative z-10 py-8", className)}>
    <div className="glow-line h-px w-full max-w-2xl mx-auto opacity-40" />
  </div>
);

export default GlowDivider;
