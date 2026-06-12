---
target: galeria
total_score: 18
p0_count: 2
p1_count: 1
timestamp: 2026-06-12T20-30-00Z
slug: frontend-src-components-layout-projectgallery-tsx
---
# Critique: "galeria" (ProjectGallery.tsx — "Proyectos recientes" homepage section)

**Target file**: `frontend/src/components/layout/ProjectGallery.tsx`
**Context**: A homepage section component (not a standalone route), rendered on `/` between `WhyVentPro` and `ServicesSection`, wrapped in `<MotionSection animateOnLoad={true}>`. Shows up to 6 recent projects fetched from Sanity, with 6 hardcoded fallback projects.

## Design Health Score

| # | Heuristic | Score /4 | Key Finding |
|---|-----------|----------|-------------|
| 1 | Visibility of System Status | 1 | No loading state — 6 hardcoded `FALLBACK_PROJECTS` render instantly and indistinguishably from real content, then silently swap if/when the Sanity fetch resolves, with no transition. |
| 2 | Match Between System & Real World | 2 | "Proyectos recientes" promises real, recent work, but the fallback titles ("Residencia Moderna", "Ambiente Acogedor") are generic brochure copy. The hover overlay's `ArrowRight` icon promises navigation that doesn't exist. |
| 3 | User Control and Freedom | 3 | Passive showcase; "Ver todos" is a working exit to `/proyectos`. No retry on fetch failure, but low stakes for a teaser section. |
| 4 | Consistency and Standards | 1 | Visually identical hover treatment to `ProjectCard.tsx` (`/proyectos`) — `bg-primary/85` overlay, centered title, `ArrowRight` icon — but `ProjectCard` wraps in `<Link to="/cotizacion">` with `aria-label`/`focus-within`/lazy-load/`onError`, while this card is a bare `<motion.div>` with none of that. Same visual grammar, divergent behavior — the same "duplicated/divergent component" pattern flagged for ProjectCard/QuoteCartSummary previously. `/proyectos` also has `ProjectCardSkeleton`/`ErrorState`/`EmptyState`; this section has none. |
| 5 | Error Prevention | 1 | Inline `GalleryItem.description: string` contradicts the canonical `Project.description: string | null` (`types/project.ts`) — no null-coalescing on the Sanity mapping, a latent runtime bug if a project has no description and a future edit calls a string method on it. |
| 6 | Recognition Rather Than Recall | 3 | Card composition (image, title, description) is recognizable and consistent within the grid; "Ver todos" with arrow is a standard pattern. |
| 7 | Flexibility and Efficiency of Use | 2 | No way to act on a specific project from here — must go to "Ver todos" → `/proyectos` → click a card → reach `/cotizacion`, an extra discovery step caused by the missing link on this section's cards. |
| 8 | Aesthetic and Minimalist Design | 3 | Visually clean and on-brand — `rounded-2xl`, `border-border`/`bg-card`, `aspect-video`, restrained typography, no Two-Color Rule violations. Loses a point for the silent fallback potentially showing six near-identical "cozy interior" placeholder cards. |
| 9 | Help Recognize/Diagnose/Recover from Errors | 0 | Fetch errors go only to `logger.error` (console, invisible to users). No error state, no retry, no messaging. A failed fetch is indistinguishable from a successful one. |
| 10 | Help and Documentation | 2 | Low-stakes for a marketing teaser; not penalized heavily, but the silent failure mode means there's no path to recognize/diagnose anything went wrong. |

**Total: 18/40 — Poor.** Visually this is one of the better-composed sections on the site (matches DESIGN.md's "Glass Pavilion" vocabulary closely, no Two-Color violations, good motion). The score is dragged down almost entirely by behavioral gaps: cards that visually promise interactivity but do nothing, and a complete absence of loading/error/empty states despite hitting the same Sanity fetch shape that `/proyectos` already solved correctly.

## Anti-Patterns Verdict

- **Detector (`detect.mjs --json`)**: `[]`, exit 0 — no automated findings.
- **No `text-gradient`, no `rounded-3xl`** — clean on both DESIGN.md bans the detector does catch.
- **`uppercase tracking-widest` eyebrow** ("Portafolio", line 92) — confirmed present. Grep across the codebase shows this exact recipe (`text-xs/sm font-semibold uppercase tracking-widest text-secondary` or muted variant) repeated in `AboutPage.tsx`, `HeroCarousel.tsx`, `NotFoundPage.tsx`, `StatsSection.tsx`, and 3x in `Footer.tsx` — none sharing a common naming voice that would make this read as one deliberate "kicker" brand device. This is the repeated-AI-grammar eyebrow pattern DESIGN.md bans, though "Portafolio" itself is the least offensive instance (short, on-brand, doesn't compete visually). Flagged as a site-wide P3, not unique to this file.
- **Hover-arrow-that-goes-nowhere**: the card hover overlay borrows the exact "this is clickable" visual grammar from `ProjectCard.tsx` (a real link) but the card here is a static `<motion.div>` — a "looks-functional-but-isn't" gap, the more serious slop tell in this file.
- **Fallback copy**: 6 hardcoded placeholder project titles/descriptions ("Residencia Moderna", "Sala de Estar Luminosa", etc.) read as stock real-estate-brochure filler — exactly the generic "templated small-business" feel PRODUCT.md says VentPro must rise above, and they're what every visitor sees on a slow connection or before Sanity is populated.

## Overall Impression

This is the homepage's "proof of work" moment — per PRODUCT.md's "show the work, don't just claim it," this section is supposed to be the payoff after the hero/stats/differentiator setup, the point where a skeptical visitor (especially a B2B buyer) goes from "okay, nice claims" to "okay, they've actually built things." Structurally and visually it's one of the best-composed sections reviewed (clean grid, on-brand cards, calm staggered motion, reduced-motion respected). But functionally, every card in the grid visually promises "click me to learn more" via a hover overlay with an arrow icon — identical to the working `ProjectCard.tsx` on `/proyectos` — and delivers nothing. Combined with zero loading/error feedback and six fabricated fallback projects that can render as the *only* thing some visitors ever see, this section currently undermines exactly the credibility it's meant to build, at exactly the point in the homepage scroll where that credibility matters most.

## What's Working

1. **Visual composition matches DESIGN.md's "Glass Pavilion" vocabulary closely** — `rounded-2xl` cards, `border-border`/`bg-card` surfaces, `aspect-video` images with `group-hover:scale-105`, no Two-Color Rule violations, no heavy shadows or gradient text.
2. **Calm, purposeful entrance motion** (`staggerContainer`/`fadeUp`, gated by `useReducedMotion`) — exactly the "calm, purposeful motion" PRODUCT.md asks for.
3. **Section header layout** (eyebrow + display heading on the left, "Ver todos" pill on the right, responsive `md:items-end`) is a clean, confident pattern at both breakpoints.

## Priority Issues

### [P0] Hover overlay promises navigation that doesn't exist — cards are not clickable
**What**: Every card shows a full-bleed hover overlay with the project title + a centered `ArrowRight` icon (the universal "click to go" signal), but the card is a plain `<motion.div>` — clicking does nothing.
**Why it matters**: This is the homepage's flagship proof-of-work section. A B2B evaluator (Alex) or curious first-timer (Jordan) trying to learn more about a project hits a dead end with zero feedback — directly contradicting Heuristic 4 against the already-correct `ProjectCard.tsx` on `/proyectos`, which uses the identical visual treatment but is a real `<Link to="/cotizacion">` with `aria-label`, `focus-within` ring, lazy-loaded image, and `onError` fallback.
**Fix**: Reuse `ProjectCard` (or wrap each card in the same `<Link to="/cotizacion">` pattern with matching `aria-label`/`focus-within`/CTA copy) so this section inherits the correctness already built for `/proyectos` instead of maintaining a second divergent implementation.
**Suggested command**: `$impeccable harden galeria`

### [P0] No loading/error/empty state — silent fallback-to-real swap undermines "show the work"
**What**: State initializes with 6 hardcoded `FALLBACK_PROJECTS`, renders instantly, silently swaps if/when Sanity resolves. Fetch errors go only to `logger.error`; nothing is shown to the user.
**Why it matters**: On a slow connection or Sanity hiccup, every visitor's "proof of work" is six fabricated projects with placeholder titles — the opposite of proof. If the swap happens mid-scroll, content changes under the user with zero acknowledgment. `/proyectos` already solved this with `ProjectCardSkeleton`/`ErrorState`/`EmptyState` for the identical fetch shape.
**Fix**: Render skeleton cards while loading; on success with real data show real projects; on error or empty, gracefully hide the section or show a minimal on-brand fallback rather than fake project cards. Reuse the pattern already established on `/proyectos`.
**Suggested command**: `$impeccable harden galeria`

### [P1] Fallback project copy is generic placeholder filler that contradicts the brand
**What**: The 6 `FALLBACK_PROJECTS` ("Residencia Moderna", "Exterior de Lujo", "Ambiente Acogedor", etc.) are stock real-estate-brochure language, not grounded in VentPro's actual project history.
**Why it matters**: Even as a last resort, this is exactly the "templated small-business site" feel PRODUCT.md says VentPro must rise above — and it's the content shown on slow connections or before Sanity is fully populated.
**Fix**: Bundled with the P0 harden above — once a proper loading/empty/error state exists, this fallback shouldn't render to real users at all. If a hardcoded last resort is still wanted, rewrite with credible, specific copy.
**Suggested command**: `$impeccable harden galeria`

### [P2] Type mismatch: `GalleryItem.description: string` vs. actual Sanity schema `string | null`
**What**: The inline `GalleryItem` type declares `description: string` (non-nullable); the canonical `types/project.ts` has `description: string | null`. The Sanity mapping does no null-coalescing.
**Why it matters**: Low immediate visual impact (React renders `null` as nothing), but it's a latent bug if a future edit does a string operation on `description`, and signals this component wasn't cross-checked against the canonical type/component already built for `/proyectos`.
**Fix**: Use the canonical `Project` type (or `description: string | null`) and render `{p.description ?? ""}` or conditionally omit, matching `ProjectCard.tsx`'s handling of optional fields.
**Suggested command**: `$impeccable harden galeria`

### [P3] "Portafolio" eyebrow is part of a site-wide repeated pattern (4+ instances)
**What**: The `text-xs font-semibold uppercase tracking-widest text-secondary` eyebrow above "Proyectos recientes" matches the same recipe in `AboutPage.tsx`, `HeroCarousel.tsx`, `NotFoundPage.tsx`, plus muted variants in `StatsSection.tsx`/`Footer.tsx`.
**Why it matters**: DESIGN.md bans "tiny uppercase tracked eyebrows on every section" as a generic-AI tell; the site doesn't document an intentional "kicker" system with a shared naming voice tying these together. "Portafolio" alone is harmless but contributes to template-feel in aggregate across the homepage scroll.
**Fix**: Site-level decision, not unique to this file — either formally adopt a documented kicker system with consistent voice, or remove/vary the treatment on some sections. This section already has a strong heading + clear CTA and is the most removable instance without losing meaning.
**Suggested command**: `$impeccable quieter galeria` (for this section) or a site-wide `$impeccable audit`

## Persona Red Flags

**Alex (B2B contractor)**: Reaches "Proyectos recientes" specifically to validate "is this a real manufacturer with real completed work?" Hovers a card expecting a project detail/case study, clicks, nothing happens. Tries another — same result. If Sanity is slow, the titles he sees ("Residencia Moderna," "Exterior de Lujo") read as placeholder text to a trained eye. Falls back to "Ver todos" where cards *do* work — but has already lost confidence the site is fully built, at the exact moment it needed to build trust fastest.

**Riley (stress tester, slow network / Sanity down)**: Sees the 6 hardcoded fallback cards render instantly (local images, no network dependency). If Sanity later resolves, cards silently swap mid-scroll with no transition — documents this as "felt like a layout bug." If Sanity fails, `logger.error` fires invisibly and fallback projects stay forever with no indication anything is wrong. Also immediately finds the hover-promise-no-click gap during methodical testing.

**Jordan (first-timer)**: Reads "Portafolio / Proyectos recientes" — clear, no jargon. Hovers/taps a card, sees a title + arrow appear, taps expecting more detail. Nothing happens. No error, no feedback — just quiet confusion, then moves on to "Ver todos."

## Minor Observations

- `<img>` tags here have no `loading="lazy"`, `decoding="async"`, explicit `width`/`height`, or `onError` fallback — all present on `ProjectCard.tsx`. A broken Sanity image URL would show a broken-image icon with no graceful degradation.
- Each card's title appears twice (hover overlay + content block below) — consistent with `ProjectCard.tsx`'s pattern, so not a new inconsistency, but worth noting for screen readers (12 headings total for 6 cards).
- Section uses `py-24` while the preceding `WhyVentPro` section uses `py-20 md:py-28` and DESIGN.md's section-spacing token is `py-20` — a minor, likely imperceptible spacing inconsistency.

## Questions to Consider

1. If `/proyectos`'s `ProjectCard` already has the correct link/focus/error-handling pattern, could `ProjectGallery` simply render its first 6 results using `<ProjectCard>` directly and inherit all of that correctness for free, rather than maintaining a second divergent card implementation?
2. What is `FALLBACK_PROJECTS` actually protecting against — a Sanity outage, or a not-yet-populated content store? If the latter, should it exist in production at all once real projects are seeded?
3. Right now the only working interactive element in this entire section is the single "Ver todos" button in the header — if the cards became links to `/cotizacion` (matching `/proyectos`), would "Ver todos" and "click any card" compete, or reinforce each other as two paths to the same conversion goal?
