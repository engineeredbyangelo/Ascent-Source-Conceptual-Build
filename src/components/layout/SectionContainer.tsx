import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionContainer = ({ children, className, id }: SectionContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        "relative z-10 min-h-screen flex items-center",
        "px-6 sm:px-8 md:px-12 lg:px-16",
        className
      )}
    >
      <div className="w-full max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

export default SectionContainer;
