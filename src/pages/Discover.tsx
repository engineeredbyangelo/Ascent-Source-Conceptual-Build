import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Globe, Shield, Flame, Droplets, Atom } from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true, margin: "-80px" },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

const Discover = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Hero */}
        <motion.header className="pt-32 pb-24" {...fade}>
          <p className="tech-label text-primary mb-6">Discover Ascent Source</p>
          <h1 className="heading-hero glow-text mb-8">
            A Star<br />in a Box
          </h1>
          <p className="body-text max-w-2xl text-lg md:text-xl leading-relaxed">
            A conceptual fusion energy technology designed to reimagine how civilization
            generates and distributes power — through decentralized, zero-carbon reactors
            delivering gigawatt-scale energy worldwide.
          </p>
          <div className="mt-12 h-px glow-line" />
        </motion.header>

        {/* The Problem */}
        <motion.section className="py-24" {...fade}>
          <p className="tech-label text-primary mb-4">The Problem</p>
          <h2 className="heading-section mb-6">
            Built for the<br />Wrong Century
          </h2>
          <p className="body-text mb-12 max-w-2xl">
            Modern energy infrastructure — centralized plants, aging transmission lines — creates
            fragile networks vulnerable to cascading failures. Global energy demand is projected to
            increase <span className="text-foreground font-semibold">50% by 2040</span>.
          </p>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" {...staggerContainer}>
            {[
              {
                icon: Flame,
                stat: "70%+",
                label: "Climate Acceleration",
                desc: "Fossil fuels' share of global greenhouse gas emissions",
              },
              {
                icon: Globe,
                stat: "750M+",
                label: "Energy Inequity",
                desc: "People lacking reliable access to electricity",
              },
              {
                icon: Zap,
                stat: "∞",
                label: "Grid Fragility",
                desc: "Single points of failure affecting millions",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="hud-panel p-6 group hover:border-primary/30 transition-colors"
                variants={staggerItem}
              >
                <item.icon className="w-5 h-5 text-primary mb-4" />
                <p className="font-display text-3xl font-bold text-foreground mb-1">
                  {item.stat}
                </p>
                <p className="tech-label text-primary mb-2">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <div className="h-px glow-line" />

        {/* The Concept */}
        <motion.section className="py-24" {...fade}>
          <p className="tech-label text-primary mb-4">The Concept</p>
          <h2 className="heading-section mb-6">
            Compact Fusion<br />Reactor Technology
          </h2>
          <p className="body-text mb-16 max-w-2xl">
            A magnetically confined plasma reactor — a compact device replicating the energy
            process of stars. Hydrogen isotopes heated to{" "}
            <span className="text-primary font-mono">100M°C</span> within a controlled magnetic
            field sustain continuous fusion with zero carbon emissions.
          </p>

          {/* Design Principles */}
          <p className="tech-label text-primary mb-6">Design Principles</p>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16" {...staggerContainer}>
            {[
              {
                title: "Decentralization",
                desc: "Small-footprint reactors deployed at the community level, eliminating transmission losses",
              },
              {
                title: "Zero Carbon",
                desc: "Fusion produces no greenhouse gases — only helium as a byproduct",
              },
              {
                title: "Fuel Abundance",
                desc: "Deuterium from seawater provides virtually unlimited fuel supply",
              },
              {
                title: "Intrinsic Safety",
                desc: "No meltdown risk — if containment is lost, the reaction simply stops",
              },
              {
                title: "Scalability",
                desc: "Modular design scales from neighborhoods to megacities",
              },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                className={`p-5 border border-border rounded-lg bg-card/30 ${i === 4 ? "sm:col-span-2" : ""}`}
                variants={staggerItem}
              >
                <p className="font-display text-foreground font-medium mb-1">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works */}
          <p className="tech-label text-primary mb-6">How It Works</p>
          <motion.div className="space-y-6" {...staggerContainer}>
            {[
              {
                step: "01",
                title: "Plasma Ignition",
                desc: "Hydrogen isotopes (deuterium and tritium) are ionized and injected into the reactor chamber",
              },
              {
                step: "02",
                title: "Magnetic Confinement",
                desc: "Superconducting coils create a toroidal field suspending plasma away from all surfaces",
              },
              {
                step: "03",
                title: "Sustained Fusion",
                desc: "At sufficient temperature and pressure, hydrogen nuclei fuse into helium, releasing energy as high-velocity neutrons",
              },
              {
                step: "04",
                title: "Energy Capture",
                desc: "A lithium blanket absorbs neutron energy as heat, driving turbines for electricity generation",
              },
              {
                step: "05",
                title: "Fuel Cycling",
                desc: "The lithium blanket breeds tritium, creating a self-sustaining fuel loop",
              },
            ].map((s) => (
              <motion.div key={s.step} className="flex gap-5 items-start" variants={staggerItem}>
                <span className="font-mono text-primary text-sm mt-1 shrink-0">{s.step}</span>
                <div>
                  <p className="font-display text-foreground font-medium">{s.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <div className="h-px glow-line" />

        {/* Why Fusion */}
        <motion.section className="py-24" {...fade}>
          <p className="tech-label text-primary mb-4">Why Fusion? Why Now?</p>
          <h2 className="heading-section mb-16">
            Cleaner Than Clean
          </h2>

          <motion.div className="space-y-16" {...staggerContainer}>
            {/* Cleaner */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <p className="heading-feature">Safer Than Fission</p>
              </div>
              <p className="body-text mb-6">
                Unlike traditional nuclear, fusion produces no long-lived radioactive waste, carries
                zero risk of meltdown, and requires no enriched uranium — eliminating proliferation concerns.
              </p>
              <div className="pl-5 border-l-2 border-primary/40">
                <p className="font-display text-2xl md:text-3xl text-foreground font-semibold">
                  4,000,000×
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  greater energy density than coal per unit mass
                </p>
              </div>
            </motion.div>

            {/* Renewable */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-5 h-5 text-primary" />
                <p className="heading-feature">Renewable at Cosmic Scale</p>
              </div>
              <p className="body-text mb-6">
                Earth's oceans hold enough deuterium to power civilization for billions of years —
                fusion is renewable on a timescale that outlasts our sun.
              </p>
              <div className="pl-5 border-l-2 border-primary/40">
                <p className="font-display text-2xl md:text-3xl text-foreground font-semibold">
                  1 gallon = 300 gallons
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  One gallon of seawater contains the energy equivalent of 300 gallons of gasoline
                </p>
              </div>
            </motion.div>

            {/* Safer */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center gap-3 mb-4">
                <Atom className="w-5 h-5 text-primary" />
                <p className="heading-feature">Inherently Safe</p>
              </div>
              <p className="body-text">
                Any disruption causes the reaction to extinguish immediately. No chain reaction to
                control, no critical mass to manage, and no possibility of a catastrophic event.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        <div className="h-px glow-line" />

        {/* 4.2 GW Vision */}
        <motion.section className="py-24" {...fade}>
          <p className="tech-label text-primary mb-4">Output Capacity</p>
          <h2 className="heading-section mb-4">
            <span className="text-primary glow-text">4.2</span> Gigawatts
          </h2>
          <p className="body-text mb-10 max-w-2xl">
            A single Ascent Source reactor produces 4.2 GW of continuous thermal output — enough
            to power approximately 3 million homes.
          </p>
          <motion.div className="space-y-3" {...staggerContainer}>
            {[
              "Eliminate transmission losses (currently 5–10% of all generated electricity)",
              "Provide energy sovereignty to regions dependent on fuel imports",
              "Enable rapid deployment to disaster zones and developing nations",
              "Decouple economic growth from carbon emissions",
            ].map((item) => (
              <motion.div key={item} className="flex gap-3 items-start" variants={staggerItem}>
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <p className="text-muted-foreground">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <div className="h-px glow-line" />

        {/* Projected Impact */}
        <motion.section className="py-24" {...fade}>
          <p className="tech-label text-primary mb-4">Projected Impact</p>
          <h2 className="heading-section mb-12">
            Grid Comparison
          </h2>

          <motion.div className="grid grid-cols-3 gap-px bg-border rounded-lg overflow-hidden" {...staggerContainer}>
            {/* Header */}
            <motion.div className="bg-card/60 p-4" variants={staggerItem}>
              <p className="tech-label">Metric</p>
            </motion.div>
            <motion.div className="bg-card/60 p-4" variants={staggerItem}>
              <p className="tech-label">Current Grid</p>
            </motion.div>
            <motion.div className="bg-card/60 p-4" variants={staggerItem}>
              <p className="tech-label text-primary">Ascent Source</p>
            </motion.div>
            {/* Rows */}
            {[
              ["Carbon Emissions", "25+ Gt CO₂/year", "Zero"],
              ["Grid Resilience", "Single points of failure", "Distributed, fault-tolerant"],
              ["Fuel Supply", "Finite (decades)", "Virtually infinite"],
              ["Waste Profile", "Toxic, long-lived", "Helium (inert, safe)"],
              ["Deployment", "Fixed, centralized", "Modular, anywhere"],
            ].map(([metric, current, ascent]) => (
              <motion.div key={metric} className="contents" variants={staggerItem}>
                <div className="bg-card/30 p-4 border-t border-border">
                  <p className="text-sm text-foreground font-medium">{metric}</p>
                </div>
                <div className="bg-card/30 p-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">{current}</p>
                </div>
                <div className="bg-card/30 p-4 border-t border-border">
                  <p className="text-sm text-primary font-medium">{ascent}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <div className="h-px glow-line" />

        {/* A Push for the Future */}
        <motion.section className="py-32" {...fade}>
          <p className="tech-label text-primary mb-4">A Push for the Future</p>
          <h2 className="heading-section mb-10">
            Three Principles
          </h2>
          <motion.div className="space-y-8 mb-16" {...staggerContainer}>
            {[
              {
                num: "01",
                title: "Energy should be clean",
                desc: "Zero emissions, zero waste, zero compromise",
              },
              {
                num: "02",
                title: "Energy should be decentralized",
                desc: "Resilient, local, and universally accessible",
              },
              {
                num: "03",
                title: "Energy should be abundant",
                desc: "Enough for every person, every city, every ambition",
              },
            ].map((p) => (
              <motion.div key={p.num} className="flex gap-5 items-start" variants={staggerItem}>
                <span className="font-mono text-primary text-sm mt-1">{p.num}</span>
                <div>
                  <p className="font-display text-xl text-foreground font-medium">{p.title}</p>
                  <p className="text-muted-foreground mt-1">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <p className="body-text italic text-center">
            The reactor age isn't coming. It's already being imagined.
          </p>

          <div className="mt-16 text-center">
            <p className="tech-label mb-2">Ascent Source — Conceptual Technology by Ascent Labs</p>
            <p className="text-xs text-muted-foreground">© 2026 Ascent Labs. All rights reserved.</p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Discover;
