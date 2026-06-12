# Product

## Register

brand

## Users

VentPro serves a mixed audience in Guatemala: residential homeowners researching window
replacement or new-build windows, and B2B buyers (contractors, architects, developers)
specifying aluminum/PVC windows for projects. Both groups land on the same marketing site
and are pushed toward the same primary action: request a quote (`/cotizacion`). Residential
visitors are evaluating trust, quality, and aesthetics for their own home; B2B visitors are
evaluating capability, scale, and professionalism before reaching out for a spec quote.

A small secondary surface (`/admin`) lets staff review incoming quote/contact submissions
and manage product/project content (now backed by Sanity). This is a product (tool) surface,
not part of the brand experience.

## Product Purpose

VentPro fabricates and installs aluminum and PVC windows in Guatemala (founded 2010, 200+
projects delivered). The site's job is to convert visitors — residential and B2B alike —
into quote requests by establishing VentPro as a premium, serious manufacturer rather than
a small local shop. Success looks like: visitors immediately read the brand as
architectural-grade and trustworthy, browse products/projects with confidence, and complete
the quote flow.

## Brand Personality

Premium, architectural, serious-but-approachable. Refine — don't replace — the existing
"light through glass" identity: a deep, serious celeste/blue as the core brand color (their
own description: "Celeste profundo y serio... identidad de marca") paired with a warm amber
accent ("luz solar atravesando el vidrio"), expressed through glass-sheen/glow effects and
light-ray motifs.

**References (and what to take from each):**
- **schuco.com** — clean architectural layout, premium bold typography, serious but
  approachable tone, excellent use of whitespace.
- **reynaers.com** — bold hero sections, strong visual hierarchy, professional.
- **stripe.com** — smooth micro-animations, precise spacing, trust-building polish.

Shared thread across all three: minimal clutter, strong typography, premium feel without
being cold. VentPro should push toward this — more architectural confidence and whitespace
discipline, with Stripe-grade motion polish on interactions — while keeping its own
celeste/amber "light and glass" color identity rather than adopting theirs.

## Anti-references

- **Generic AI/template SaaS look**: gradient-text headlines, tiny uppercase tracked
  eyebrows on every section, numbered 01/02/03 scaffolding, identical 3-card grids,
  hero-metric clichés, cream/sand body backgrounds. None of this belongs on VentPro.
- **Cheap/local competitor look**: dated layouts, cluttered pages, stock-photo-heavy
  hero images, inconsistent spacing, low-contrast or busy color use. VentPro must read as
  a step above typical local aluminum/window company sites.

## Design Principles

1. **Premium architectural confidence** — every page should feel like the site of a serious
   building-materials manufacturer (Schüco/Reynaers-grade), not a templated small-business
   site. Lead with whitespace, typographic hierarchy, and restraint over decoration.
2. **Show the work, don't just claim it** — the project gallery, stats (200+ proyectos,
   15 years), and real photography carry more trust than copy. Let proof points and imagery
   lead; keep marketing copy lean.
3. **One identity, two audiences** — residential and B2B visitors share the same premium
   voice and visual system. Don't fork into separate "consumer" vs "enterprise" styling;
   the quote flow and trust signals serve both.
4. **Calm, purposeful motion** — micro-interactions and reveals (Stripe-grade smoothness)
   reinforce quality and precision. Motion should feel engineered, never decorative filler.
5. **Light and glass as the throughline** — the celeste/amber "light through glass" identity
   (glass-sheen, glass-glow, light-rays) is VentPro's visual metaphor and should be refined
   and extended, not replaced, as the design matures toward the premium references above.

## Accessibility & Inclusion

WCAG AA as the baseline (color contrast, focus states, keyboard navigation). Respect
`prefers-reduced-motion` for all animation (the codebase already gates motion via
`useReducedMotion` and CSS media queries — maintain this pattern for new work). Spanish
(es-GT) is the primary language; copy and labels should remain in Spanish.
