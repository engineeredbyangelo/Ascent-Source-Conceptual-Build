

## Plan: Add Reactor Security Section

Create a new section component that explains how Ascent reactors are secured within different infrastructure types, placed after the Future City (2040 Projection) section and before the Tech section.

### New File: `src/components/sections/SecuritySection.tsx`

A section titled something like "SECURED BY DESIGN" with the `tech-label` "Infrastructure Security". It will feature 4-5 security pillars presented as staggered, animated rows (matching the editorial style of other sections):

**Security pillars:**
1. **Passive Failsafe Core** — Physics-based shutdown; no operator intervention needed. The reactor cannot melt down.
2. **Autonomous Threat Detection** — AI-driven perimeter monitoring, anomaly detection, and real-time response across all deployment sites.
3. **Encrypted Energy Mesh** — All reactor-to-grid communications use quantum-resistant encryption, preventing interception or spoofing.
4. **Modular Containment Shells** — Multi-layered physical shielding rated for seismic, ballistic, and environmental extremes.
5. **Decentralized Redundancy** — No single point of failure. If one unit goes offline, the mesh redistributes load instantly.

**Layout:** Numbered rows (01–05) with bold heading text on the left and a brief description on the right, separated by a thin primary-colored divider line. Each row animates in on scroll with staggered delays. A concluding statement below reinforces the security narrative.

**Style:** Uses existing `SectionContainer`, `motion` animations, `tech-label`, and `font-display` typography — consistent with Philosophy and Ascent Source sections.

### Edit: `src/pages/Index.tsx`

Import `SecuritySection` and place it between `<FutureCitySection />` and `<TechSection />`.

### Files

| File | Change |
|------|--------|
| `src/components/sections/SecuritySection.tsx` | New component |
| `src/pages/Index.tsx` | Add SecuritySection after FutureCitySection |

