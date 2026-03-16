

## Plan: Hover Interactions, Remove Schematics Button, and Animated Plasma Flow

### 1. Future City Panel Hover Interactions

In `FutureCitySection.tsx`, enhance each panel with interactive hover states:
- On hover, scale up the central reactor glow element (the small `bg-primary` dot) using `group-hover` classes — increase shadow spread and brightness
- Animate energy lines: add CSS `@keyframes` pulse animation that activates on `group-hover` — energy connection lines glow brighter and pulse outward
- Add a subtle scale transform to the visual container on hover (`group-hover:scale-105`)
- Increase border glow on hover (`hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]`)

### 2. Remove "ACCESS SCHEMATICS" Button

In `HeroSection.tsx`, remove the `<button className="hud-button-primary">ACCESS SCHEMATICS</button>` element entirely.

### 3. Animated Plasma Flow in Exploded View

In `ReactorCore.tsx`, add visible spinning plasma particles inside the torus during the explode phase:

- **Plasma flow particles**: Create ~20-30 small spheres positioned along the torus path (radius 1.5) that orbit continuously using `useFrame`. Each particle follows the torus circumference at slightly different speeds, simulating plasma flowing through the magnetic containment
- **Visibility tied to explodeProgress**: Particles become visible as `explodeProgress > 0.1` and increase in opacity/emissive intensity as the shell opens, so users can see the plasma spinning inside the exposed tubes
- **Visual treatment**: Small spheres (radius ~0.06) with orange/white emissive material (`#ffcc66`, emissive `#ff8844`), additive blending, creating a "hot gas flowing through a tube" effect
- **Speed variation**: Particles at different orbital speeds (some faster, some slower) with slight vertical wobble to look organic

Additionally in `ReactorCore.tsx`:
- Increase the plasma torus emissive intensity as `explodeProgress` increases (from 1.5 to 3.0) so the plasma becomes more visible when the shell opens
- Add inner detail structures visible during explode: small coolant pipe meshes (thin cylinders) between the toroidal coils, visible only when `explodeProgress > 0.3`

### Files to Edit

| File | Change |
|------|--------|
| `src/components/sections/HeroSection.tsx` | Remove ACCESS SCHEMATICS button |
| `src/components/sections/FutureCitySection.tsx` | Add hover glow/scale/pulse interactions to panels |
| `src/components/3d/ReactorCore.tsx` | Add orbiting plasma particles, inner detail structures, and explode-driven emissive ramp |

