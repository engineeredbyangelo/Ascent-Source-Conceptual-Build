import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Technology", href: "/#technology" },
  { label: "Security", href: "/#security" },
  { label: "Vision", href: "/#vision" },
  { label: "Discover", href: "/discover" },
];

const TopNav = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.7]);
  const borderOpacity = useTransform(scrollY, [0, 200], [0, 0.15]);
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
    >
      <motion.div
        style={{
          backgroundColor: `hsl(0 0% 4% / ${bgOpacity.get()})`,
        }}
        className="relative backdrop-blur-xl"
      >
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-background/70 backdrop-blur-xl"
        />
        <motion.div
          style={{ opacity: borderOpacity }}
          className="absolute bottom-0 left-0 right-0 h-px bg-white/20"
        />

        <nav className="relative pointer-events-auto max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(187_100%_50%/0.8)]"
            />
            <span className="font-mono text-xs tracking-[0.3em] text-foreground/90 group-hover:text-primary transition-colors">
              ASCENT
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/discover" && location.pathname === "/discover";
              return (
                <li key={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <Link
                      to={item.href}
                      className={`relative px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              );
            })}
          </ul>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="md:hidden"
          >
            <Link
              to="/discover"
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary"
            >
              Discover →
            </Link>
          </motion.div>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default TopNav;
