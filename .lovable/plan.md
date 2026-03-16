

## Plan: Hero Card Removal, Glassmorphism Cards, and Future City Visual Storytelling

### 1. Remove Hero Section Card

Strip the `hud-panel` wrapper from `HeroSection.tsx` so the text floats directly over the full 3D reactor. Keep the text content and animations as-is.

### 2. Glassmorphism Card Style

Update `.hud-panel` in `index.css` to be lighter and more glass-like:
- Reduce background opacity from `85%` to ~`40-50%`
- Keep strong `backdrop-blur-xl`
- Add a subtle light border highlight (`border-white/10`)
- Remove the heavy box shadow, replace with a softer one

### 3. Redesign Future City Section — Visual Storytelling with Reactor

Replace the static city skyline CSS art and the 4 text cards with a visual storytelling layout:

**Structure:**
- Keep the "A WORLD POWERED BY ASCENT" heading (with glassmorphism card)
- Below it, show 4 **visual storytelling panels** in a 2×2 grid, each depicting a use case with:
  - An illustrative icon/visual (using CSS gradients, glowing elements, and reactor-inspired motifs)
  - A scene title (e.g., "Residential Towers")
  - A brief description of how Ascent powers it
  - A small glowing reactor element in each panel connecting them visually to the Ascent Source
- Remove the old CSS skyline bars

**The 4 scenes:**
1. **Residential Towers** — Glowing buildings with energy lines flowing from a central reactor
2. **Electric Transit** — Transit network visualization with energy pulses
3. **Wireless Energy Grid** — Network/mesh pattern radiating from reactor
4. **Micro Reactors** — Distributed small reactor units across a landscape

Each panel will use CSS/SVG visuals with glowing cyan energy lines connecting to a small reactor icon, creating the visual narrative of "things powered by Ascent."

### Files to Edit

| File | Change |
|------|--------|
| `src/index.css` | Update `.hud-panel` to glassmorphism style |
| `src/components/sections/HeroSection.tsx` | Remove `hud-panel` wrapper from text |
| `src/components/sections/FutureCitySection.tsx` | Replace skyline + text cards with visual storytelling panels |

