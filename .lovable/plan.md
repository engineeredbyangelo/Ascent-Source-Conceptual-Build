## Plan: Add Cards to Section Text + Decrease Reactor Opacity (slightly)

### 1. Decrease Reactor Opacity (

In `ReactorScene.tsx`, add a scroll-driven opacity fade. As the user scrolls past the hero, the reactor group's materials will become more transparent using a shared opacity multiplier. The simplest approach: wrap the reactor `<group>` in a component that sets `visible` opacity via a `meshBasicMaterial` on a large dark sphere behind content, or more practically, add a **semi-transparent overlay div** on top of the canvas that increases opacity as the user scrolls.

**Approach:** In `ReactorCanvas.tsx`, add a dark overlay `<div>` inside the fixed container whose opacity scales with `scrollProgress` (e.g., `opacity: 0.3 + scrollProgress * 0.4`), capping at ~0.7. This dims the 3D scene behind text sections without modifying every 3D material.

### 2. Wrap Section Text in Cards

Add `hud-panel` card wrappers to text content in sections that currently lack them:

- **HeroSection**: Wrap the heading/body/button block in a card with padding and the `hud-panel` class
- **PhilosophySection**: Wrap each statement `<h2>` in a card
- **AscentSourceSection**: Wrap the header text block (title + description) in a card
- **FutureCitySection**: Wrap the header text and the city element labels in cards
- **TechSection**: Already uses `hud-panel` — no change needed
- **VisionSection**: Wrap the heading/body/CTA block in a card
- **ExplodedSection**: Already uses `hud-panel` — no change needed

### Files to Edit


| File                                              | Change                                           |
| ------------------------------------------------- | ------------------------------------------------ |
| `src/components/3d/ReactorCanvas.tsx`             | Add scroll-driven dark overlay div               |
| `src/components/sections/HeroSection.tsx`         | Wrap text content in `hud-panel` card            |
| `src/components/sections/PhilosophySection.tsx`   | Wrap each statement in `hud-panel` card          |
| `src/components/sections/AscentSourceSection.tsx` | Wrap header text in `hud-panel` card             |
| `src/components/sections/FutureCitySection.tsx`   | Wrap header + city elements in `hud-panel` cards |
| `src/components/sections/VisionSection.tsx`       | Wrap text content in `hud-panel` card            |
