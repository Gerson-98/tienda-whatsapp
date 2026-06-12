---
name: VentPro
description: Aluminum & PVC window manufacturer in Guatemala — premium, architectural, light-through-glass identity
colors:
  glass-blue: "#255C7E"
  glass-blue-dark: "#1AA5E6"
  golden-amber: "#F5950F"
  golden-amber-dark: "#F6A028"
  canvas: "#F3F5F7"
  canvas-dark: "#0D131C"
  ink: "#172230"
  ink-dark: "#F1F6F9"
  surface: "#EAEDF1"
  surface-tint: "#D9E8F2"
  surface-tint-ink: "#1D4863"
  mist: "#E2E6E9"
  mist-ink: "#627084"
  hairline: "#D3D9DE"
  alert: "#EF4444"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.glass-blue}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    height: "40px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.glass-blue}"
    rounded: "{rounded.lg}"
    padding: "10px 22px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "40px"
---

# Design System: VentPro

## 1. Overview

**Creative North Star: "The Glass Pavilion"**

VentPro's interface is the digital equivalent of a manufacturer's flagship showroom: a
glass-walled pavilion where light, structure, and material quality are the whole pitch.
Every surface should read as architectural — deep, serious blue as the building's frame,
warm amber as the sunlight passing through the glazing it sells. The system already
encodes this in its CSS comments ("Celeste profundo y serio — identidad de marca",
"Ámbar cálido — luz solar atravesando el vidrio"); this spec formalizes and extends that
intent toward the precision of Schüco and Reynaers and the interaction polish of Stripe.

Density stays moderate — generous section padding (80px), confident typographic
hierarchy, and restrained color use (blue + amber, nothing else competes). Depth comes
from light and translucency (glass-sheen sweeps, cursor-following glass-glow, animated
light rays, a header that frosts on scroll) rather than heavy drop shadows or
decoration. The system explicitly rejects the **generic AI/template SaaS look**
(gradient-text headlines, tiny uppercase tracked eyebrows on every section, numbered
01/02/03 scaffolding, identical three-card grids, hero-metric clichés, cream/sand
backgrounds) and the **cheap local-competitor look** (cluttered layouts, stock-photo
heavy heroes, low-contrast or busy color use, dated card grids).

**Key Characteristics:**
- Two-color discipline: Deep Glass Blue carries structure and authority; Golden Hour
  Amber is the rare, deliberate accent (badges, underlines, highlights).
- Architectural typography: Plus Jakarta Sans at heavy weights for display, tracked
  tight, paired with DM Sans for calm, readable body copy.
- Light-as-material: glass-sheen, glass-glow, and light-ray motifs are the system's
  signature motion language — never purely decorative, always reinforcing "light
  through glass".
- Soft, glass-layered elevation: flat-leaning surfaces, subtle borders, depth via
  blur/translucency rather than shadow stacks.
- Full light/dark support: the same roles (background, card, primary, secondary,
  accent) re-map for a cool night palette without changing the underlying structure.

## 2. Colors

The palette is deliberately narrow: one serious structural blue, one warm amber accent,
and a tight neutral ramp. Both brand colors carry distinct light- and dark-mode values
so the "glass at day" / "glass at night" feeling holds in both themes.

### Primary
- **Deep Glass Blue** (`#255C7E` light / `#1AA5E6` dark): the structural color — header
  backgrounds, primary buttons, links, active nav states, icon accents. In dark mode it
  brightens to a lit-from-within cyan-blue rather than staying muted, so the "glass at
  night" feeling reads as illuminated, not dim.

### Secondary
- **Golden Hour Amber** (`#F5950F` light / `#F6A028` dark): the light motif — used
  sparingly for badges ("+200 proyectos"), section eyebrow labels, the light-ray
  background effect, and as the second stop in any gradient/highlight. Never the
  dominant color of a surface.

### Neutral
- **Canvas** (`#F3F5F7` light / `#0D131C` dark): page background. A cool, barely-tinted
  near-white (not cream) by day; a deep blue-black by night.
- **Ink** (`#172230` light / `#F1F6F9` dark): primary text color.
- **Surface** (`#EAEDF1` light): card and panel fill, one step darker than canvas for
  gentle separation without a hard edge.
- **Surface Tint** (`#D9E8F2` / ink `#1D4863`): soft "frosted glass" backgrounds for
  icon chips and highlighted callouts — a tinted wash of the primary blue.
- **Mist** (`#E2E6E9` / ink `#627084`): muted backgrounds and secondary/metadata text.
- **Hairline** (`#D3D9DE`): borders and dividers — always 1px, never decorative.
- **Alert** (`#EF4444`): destructive actions and error states only.

### Named Rules
**The Two-Color Rule.** Only Deep Glass Blue and Golden Hour Amber carry brand meaning.
Every other color on screen is a neutral (canvas/surface/mist/hairline/ink). If a third
"brand" color appears, it's a mistake.

**The Lit-Glass Dark Mode Rule.** Dark mode is not "light mode dimmed." Canvas drops to
near-black, but Primary and Secondary both get *brighter and more saturated* — the glass
is lit from within, not muted by the dark.

## 3. Typography

**Display Font:** Plus Jakarta Sans (weights 400–800), with `system-ui, sans-serif` fallback
**Body Font:** DM Sans (weights 300–500, italics available), with `system-ui, sans-serif` fallback

**Character:** A confident geometric display face at heavy weight, tracked tight,
paired with a calmer, slightly humanist body face. The pairing should feel like a
building's signage system (display) next to its printed brochure (body) — same family
of precision, different registers.

### Hierarchy
- **Display** (weight 800/"font-black", `text-4xl` → `text-7xl` responsive,
  `tracking-tighter` ≈ -0.03em, `leading-none`): hero headlines and page titles. Always
  `text-wrap: balance`.
- **Headline** (weight 700–800, `text-4xl` / `text-5xl`, `tracking-tighter`): section
  titles ("Nuestros pilares", "Un recorrido de 15 años").
- **Title** (weight 600–700, `text-xl` / `text-2xl`, `leading-none tracking-tight`):
  card titles, dialog headers.
- **Body** (weight 400, `text-base` / `text-sm`, `leading-relaxed`, `ss01`/`cv11` font
  features enabled): paragraphs and descriptions, capped at ~65–75ch. Secondary copy
  uses Mist-ink (`#627084` / dark `muted-foreground`).
- **Label** (weight 500–600, `text-xs`/`text-sm`, `uppercase tracking-widest` or
  `tracking-wider`): nav links, badges, eyebrow labels — used sparingly per section,
  never stacked on every block (see Do's and Don'ts).

### Named Rules
**The Tight-but-not-Touching Rule.** Display headings track to about -0.03em
(`tracking-tighter`), never beyond -0.04em. Letters stay crisp and architectural without
touching.

## 4. Elevation

**Soft & glass-layered.** Surfaces sit close to flat — cards use a 1px Hairline border
and only a whisper of shadow (`shadow-sm`). Depth and "premium" feel come instead from
light and translucency: a header that goes from transparent (over the hero) to
`background/85` with `backdrop-blur-md` on scroll, a cursor-following radial glow
(`glass-glow`) on key panels, a diagonal light-sweep on hover (`glass-sheen`), and
animated diagonal light-ray gradients behind hero sections. Heavy, dark, multi-layer
drop shadows never appear.

### Shadow Vocabulary
- **Whisper** (`shadow-sm`): the only shadow in the system. Used on cards, buttons, and
  the scrolled header — a 1px-soft lift, nothing theatrical.

### Named Rules
**The Light-Not-Shadow Rule.** When something needs to feel elevated or premium, reach
for translucency, blur, or a glow effect before reaching for a heavier shadow. Depth is
expressed as "more light," not "more shadow."

## 5. Components

Components read as **precise and architectural**: clean geometry, confident contrast,
restrained motion. Pills are reserved for primary calls-to-action — everything else uses
the tighter `rounded-lg`/`rounded-md` geometry of a structural grid.

### Buttons
- **Shape:** Default/secondary/outline/ghost buttons use `rounded-lg` (12px). Primary
  calls-to-action ("Cotizar ahora") additionally apply `rounded-full` — the one
  deliberate pill in the system, reserved for the site's main conversion action.
- **Primary:** Deep Glass Blue fill, white text, `h-10 px-6` (40px tall). Hover dims to
  90% opacity — a quiet shift, not a color change.
- **Outline:** transparent fill, 2px Deep Glass Blue border and text; hover inverts to a
  solid Deep Glass Blue fill with white text.
- **Secondary:** Golden Hour Amber fill with dark ink text; hover to 80% opacity.
- **Ghost / Link:** no fill; hover introduces Mist background (ghost) or an underline
  (link). Used for tertiary actions only.
- **Focus:** 2px ring in the primary blue (`ring-ring`), offset 2px from the
  background — visible on every interactive element, never suppressed.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (16px) — generous but not pill-like.
- **Background:** Surface (`#EAEDF1` light), 1px Hairline border.
- **Shadow Strategy:** Whisper only (see Elevation). No nested cards, ever.
- **Internal Padding:** 24px (`p-6`), occasionally 32px (`p-8`) for feature/hero cards.

### Inputs / Fields
- **Style:** `h-10`, `rounded-md` (10px), 1px Hairline border, Canvas background.
- **Focus:** 2px ring in the primary blue, 2px offset — matches button focus treatment
  for consistency.
- **Error / Disabled:** error text in Alert red below the field; disabled drops opacity
  to 50% and disables pointer events.

### Navigation
- **Style:** Fixed header, full width. Over the hero it's transparent with white text;
  past a 60px scroll threshold it transitions (300ms) to `background/85` +
  `backdrop-blur-md` + Whisper shadow + Hairline bottom border, text switching to Ink.
- **Links:** uppercase, `tracking-wider`, with an animated underline
  (`.nav-underline`) that scales in from the left on hover/active — no background pills
  on nav items.
- **Mobile:** collapses to a slide-in sheet from the right, links in a vertical stack at
  `text-lg`, primary CTA repeated full-width at the bottom.

### Signature Component: Glass & Light Effects
The system's distinctive visual layer, used to reinforce the "light through glass"
metaphor without adding new colors:
- **`glass-sheen`**: a 50%-wide diagonal highlight that sweeps across an element on
  hover/focus over 0.85s — used on hero imagery panels.
- **`glass-glow`**: a 320px radial glow in Deep Glass Blue that follows the cursor
  position (`--mx`/`--my` custom properties), fading in on hover — used on interactive
  panels to suggest a glass surface catching light.
- **`light-rays`**: 3 blurred, slowly-drifting diagonal gradient beams in Golden Hour
  Amber, used as an ambient background layer behind hero sections (`mix-blend-mode:
  overlay`).
- All three respect `prefers-reduced-motion`: sweeps and drift animations are disabled,
  leaving the static glow/sheen state only.

## 6. Do's and Don'ts

### Do:
- **Do** keep brand color to Deep Glass Blue + Golden Hour Amber only; every other
  surface is a neutral from the Canvas/Surface/Mist/Hairline ramp.
- **Do** use `rounded-full` only for primary conversion CTAs ("Cotizar ahora" and
  equivalents); everything else uses `rounded-lg`/`rounded-md`/`rounded-2xl`.
- **Do** express elevation/premium feel through light — `glass-sheen`, `glass-glow`,
  `backdrop-blur`, light-rays — before reaching for a heavier shadow.
- **Do** gate every sheen/glow/ray animation behind `prefers-reduced-motion`, matching
  the existing pattern in `index.css` and `useReducedMotion()`.
- **Do** keep body copy in DM Sans at `leading-relaxed`, capped near 65–75ch, in
  Spanish (es-GT).
- **Do** track display headings to about -0.03em (`tracking-tighter`) — crisp but not
  touching.

### Don't:
- **Don't** introduce the "generic AI/template SaaS look": tiny uppercase tracked
  eyebrows above every section, numbered 01/02/03 section markers, identical
  three-card grids, hero-metric-stat clichés, or cream/sand body backgrounds. (Direct
  from PRODUCT.md anti-references.)
- **Don't** ship anything that reads as the "cheap local-competitor" pattern: cluttered
  layouts, stock-photo-heavy heroes, low-contrast text, busy or inconsistent spacing.
  (Direct from PRODUCT.md anti-references.)
- **Don't** add new "brand" colors beyond Deep Glass Blue and Golden Hour Amber — new
  accents are a Two-Color Rule violation.
- **Don't** stack heavy, dark, multi-layer drop shadows on cards or buttons — Whisper
  (`shadow-sm`) is the ceiling.
- **Don't** use `border-left`/`border-right` accent stripes on cards or callouts.
- **Don't** rely on `.text-gradient` (gradient-fill headline text) for new work — it's
  on the AI-template ban list. The two current uses (AboutPage timeline/pillars
  headings) are legacy candidates for a future `polish`/`quieter` pass; prefer solid
  Deep Glass Blue or Golden Hour Amber for emphasis instead.
- **Don't** let dark mode read as "light mode but grey" — Primary/Secondary must stay
  bright and saturated per the Lit-Glass Dark Mode Rule.
