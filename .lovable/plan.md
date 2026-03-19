

## Plan: Add `/discover` Route with Styled DiscoverAscent Page

Create a new page component that renders the DiscoverAscent.md content as a beautifully styled, long-form editorial page matching the site's dark, futuristic aesthetic.

### New File: `src/pages/Discover.tsx`

A full-page component with the site's dark background, containing all the DiscoverAscent content rendered as styled JSX (not parsed markdown). Sections include:

- **Hero header** with "Discover Ascent Source" title using `heading-hero` / `glow-text`, subtitle "A Star in a Box"
- **The Problem** section with stat cards for climate, inequity, and grid fragility
- **The Concept** section with design principles rendered as a styled grid (not an HTML table) and the 5-step "How It Works" as numbered items
- **Why Fusion** section with three sub-sections (Cleaner, Renewable, Safer) using pull-quote style for key stats
- **4.2 Gigawatt Vision** with bullet points
- **Projected Impact** as a comparison grid (Current Grid vs Ascent Source)
- **A Push for the Future** closing section with the three principles
- **Back to home** link at the top

Uses existing utility classes: `tech-label`, `heading-section`, `heading-feature`, `body-text`, `glow-text`, `font-display`, `font-mono`. Framer-motion fade-in animations on each section. Consistent spacing with `py-24` / `py-32` between sections. Max-width prose container (`max-w-4xl mx-auto`).

### Edit: `src/App.tsx`

Add route: `<Route path="/discover" element={<Discover />} />`

### Files

| File | Change |
|------|--------|
| `src/pages/Discover.tsx` | New page component |
| `src/App.tsx` | Add `/discover` route |

