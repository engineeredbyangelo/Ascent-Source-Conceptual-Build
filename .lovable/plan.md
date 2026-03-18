

## Plan: Close Reactor After 2040 Projection & Dim for Security Section

### Problem
The `explodePhase` ramps up from scroll 0.15–0.30 and stays at 1.0 forever after. The reactor remains exploded and small through the Security section and beyond.

### Solution

**File: `src/components/3d/ReactorScene.tsx`**

Add a new `closePhase` that ramps from 0 to 1 around scroll progress ~0.5–0.6 (after FutureCity, entering Security). Use it to reverse the explode effect:

```
const closePhase = Math.max(0, Math.min((scrollProgress - 0.5) / 0.1, 1));
const effectiveExplode = explodePhase * (1 - closePhase);
```

Pass `effectiveExplode` instead of `explodePhase` to all child components (ReactorCore, PlasmaRing, MagneticCoil). This closes the reactor shell back up as the user scrolls into the Security section.

Also adjust scale/position so the reactor returns to a reasonable size (undo the compress/zoom-out shrinking) and stays visible but not dominant — centered and gently rotating.

**File: `src/components/3d/ReactorCanvas.tsx`**

Adjust the overlay opacity curve so it increases more during the Security section range (~0.5–0.7 scroll progress), making text easier to read while the reactor is still faintly visible behind.

### Files to Edit

| File | Change |
|------|--------|
| `src/components/3d/ReactorScene.tsx` | Add closePhase, compute effectiveExplode, pass to children, adjust scale/position |
| `src/components/3d/ReactorCanvas.tsx` | Increase overlay opacity in security section scroll range |

