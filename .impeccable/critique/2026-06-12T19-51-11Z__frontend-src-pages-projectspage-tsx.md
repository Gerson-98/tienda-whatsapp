---
target: proyectos
total_score: 14
p0_count: 1
p1_count: 2
timestamp: 2026-06-12T19-51-11Z
slug: frontend-src-pages-projectspage-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | Fetch failures are silently swallowed (`console.error` only); the UI shows an empty/near-empty grid with no explanation, and there's no result count ("X proyectos encontrados") like `/productos` has. |
| 2 | Match Between System and Real World | 3 | Spanish copy reads naturally for the es-GT audience; category names come straight from Sanity. Minor: "Cotizar este estilo" framing presumes a literal-look match, which undersells B2B use cases. |
| 3 | User Control and Freedom | 1 | Single-select category filter has no visible "active filter" state beyond the pill, no result count, and no "Limpiar filtros" affordance. A zero-result category leaves the user stuck with only the pill row (possibly off-screen) as an exit. |
| 4 | Consistency and Standards | 1 | The page's biggest weakness: no `ErrorState`, no `EmptyState`, inline skeleton divs instead of a shared skeleton component, `imageUrl: any` instead of `SanityImageSource`, raw `<img>` missing `loading="lazy"`/`decoding`/`width`/`height`/`onError`, raw `console.error` instead of `logger.error`, single-select vs. `/productos`'s multi-select — plus `text-gradient` and `rounded-3xl` diverging from DESIGN.md and from `/productos`'s already-fixed equivalents. |
| 5 | Error Prevention | 1 | No guardrails on a failed fetch; `urlFor(project.imageUrl)` has no `onError` fallback if a Sanity image reference is malformed or missing. |
| 6 | Recognition Rather Than Recall | 2 | Category pills are visible and labeled (good). But the per-card "Cotizar este estilo" CTA is invisible until `group-hover` — undiscoverable on touch devices. |
| 7 | Flexibility and Efficiency of Use | 1 | No search, no sort, single-select category filter, no per-project detail view — despite PRODUCT.md's "B2B evaluates capability and scale" goal, there's no way to narrow by use-case/material/scale. |
| 8 | Aesthetic and Minimalist Design | 2 | The grid itself (rounded-2xl, aspect-video, hover scale) is clean and on-system. But the animated stat-counter ribbon is pure filler that adds visual weight without information density relevant to a gallery page, and the gradient headline / rounded-3xl CTA are off-system noise. |
| 9 | Help Users Recognize, Diagnose, and Recover from Errors | 0 | No user-visible error path exists at all. A network failure, Sanity outage, or bad query all collapse into the same "no projects" empty state — actively contradicting the "200+ proyectos completados" stat shown two sections above, with zero recovery option. |
| 10 | Help and Documentation | 2 | A gallery doesn't need much contextual help, so this scores acceptably — but the real "help" gap is CTA discoverability (covered under heuristic 6), not documentation. |
| **Total** | | **14/40** | **Poor — major UX gaps in error handling, consistency, and flexibility; the visual grid itself is serviceable.** |

## Anti-Patterns Verdict

**Yes — this page reads as an earlier, unfinished iteration sitting right next to its freshly-polished sibling `/productos`.**

**LLM assessment**: Two confirmed DESIGN.md DON'T violations:

1. **`text-gradient` on the hero headline** (`Nuestros <span className="text-gradient">proyectos</span>`) — DESIGN.md explicitly bans gradient-fill headline text and calls this exact usage out as a "legacy candidate for a future polish/quieter pass." `/productos` already moved to `text-secondary` for its equivalent headline word.
2. **`rounded-3xl` on the closing CTA block** — DESIGN.md caps card corner radius at `rounded-2xl`. `/productos`'s equivalent CTA already uses `rounded-2xl`. A visitor going `/productos` → `/proyectos` would see the CTA's corner radius visibly change between two structurally near-identical blocks.

Beyond the explicit ban list: the **animated stat-counter ribbon** (200+ proyectos, 6+ años, 100%, 5000+ ventanas, each with a 2-second count-up) is a textbook "hero-metric template" — PRODUCT.md explicitly lists "hero-metric clichés" as an anti-reference and "show the work, don't just claim it" as a design principle. The count-up choreography implies "live" data for what are static config values, and the section adds zero information about *which* projects exist — exactly the filler PRODUCT.md warns against. The hero → stats-ribbon → grid → CTA-ribbon skeleton is itself a recognizable SaaS-template shape.

**Deterministic scan**: `node detect.mjs --json frontend/src/pages/ProjectsPage.tsx` returned **zero findings, exit code 0** — a clean scan. This is a **discrepancy, not a clean bill of health**: the detector's `gradient-text` rule only fires on `bg-clip-text` + `bg-gradient-to-*` used together as Tailwind utilities; `text-gradient` here is a custom CSS class and isn't matched. Likewise, the detector has **no rule for literal `rounded-3xl`/`rounded-2xl`/`rounded-full` class strings** — confirmed by inspecting `checks.mjs`, where `rounded-*` only appears inside computed-style/browser-mode rules (`side-tab`, `border-accent-on-rounded`) that don't run on raw `.tsx` source. Both confirmed violations above are real DESIGN.md issues invisible to this scan. No dedicated project-card component file exists (everything is inline in `ProjectsPage.tsx`), so the scan covered the full relevant surface.

**Visual overlays**: Not available — no dev server was running on ports 5173/3000/4173, so browser injection could not be attempted. Fallback signal: "no dev server running, browser visualization unavailable."

## Overall Impression

The page's bones — hero, grid, CTA close — follow the same shared patterns as the rest of the site and the grid composition itself (rounded-2xl cards, aspect-video images, calm stagger-in animation) is genuinely on-brand. But this page clearly predates the recent `/productos` overhaul: it has none of the resilience work (error states, retry, typed images, lazy loading) that `/productos` now has, it carries two direct DESIGN.md violations that `/productos` already fixed, and it leans on a stat-counter ribbon that performs confidence rather than earning it. The single biggest opportunity is also the cheapest: most of the gap between this page and `/productos` is mechanical — reuse the components and patterns that already exist (`ErrorState`, `EmptyState`, a card skeleton, `SanityImageSource` typing, `logger`) rather than designing anything new.

## What's Working

1. **The card grid composition is solid and on-system** — `rounded-2xl`, 1px border, `aspect-video` images with a subtle `group-hover:scale-105`, and a calm `staggerContainer`/`fadeUp` entrance animation shared via `lib/animations.ts`. This matches DESIGN.md's "Light-Not-Shadow," restrained-elevation philosophy and PRODUCT.md's "Stripe-grade motion polish" goal.
2. **`useHeroImage` integration is correct and consistent** with `/productos` — the hero image is configurable from Sanity siteSettings with a sane fallback, no divergence here.
3. **The closing CTA copy is warm and low-friction** ("Asesoría gratuita y sin compromiso") — a genuinely good emotional close that serves both residential and B2B visitors without forking tone, per PRODUCT.md's "one identity, two audiences" principle.

## Priority Issues

### [P0] Silent fetch failure produces a "fake empty" state with zero recovery
**What**: On a Sanity fetch error, the `catch` block only does `console.error`; `isLoading` becomes `false`, `allProjects` stays `[]`, and the user sees the "No hay proyectos para mostrar en esta categoría" message or an empty grid — indistinguishable from a legitimately-empty category.

**Why it matters**: This directly contradicts the "200+ proyectos completados" stat shown two sections above and gives zero recovery path. A B2B visitor doing diligence on "capability and scale" who hits this during a Sanity hiccup concludes the company has *no projects to show* — the opposite of the intended message. `/productos` already solved this exact problem with `ErrorState` + retry.

**Fix**: Mirror `/productos`: add `errorMessage` state, set it in `catch` with `logger.error` (not `console.error`), and render `<ErrorState title="..." description="..." onRetry={() => setRetryCount(c => c+1)} />` before the empty/grid branches.

**Suggested command**: `$impeccable harden`

### [P1] Hover-only "Cotizar este estilo" CTA is likely unreachable on touch devices and keyboard focus
**What**: The per-card quote CTA lives inside a `div` with `opacity-0 group-hover:opacity-100`, with no `focus-within`, `:active`, or persistent visible affordance that the card is interactive.

**Why it matters**: `group-hover` maps to CSS `:hover`, which on touch devices either never fires or fires-then-sticks inconsistently across mobile browsers — and even when it fires on tap, the *first* tap reveals the overlay rather than navigating, requiring a second tap with no indication that's how it works. For Casey (mobile, thumb-only, low patience) — likely the dominant traffic source for a Guatemala consumer site — the gallery's only per-project conversion path may be effectively dead. It also fails Sam (keyboard users): the link only becomes interactive on hover, with no `:focus` equivalent, so a keyboard user tabbing through can't perceive or activate it.

**Fix**: Don't gate the CTA behind hover. Either wrap the whole card in a `<Link to="/cotizacion">` (with an accessible label) so tapping anywhere navigates, with the hover overlay as a progressive enhancement on `:hover`-capable devices, or move "Cotizar este estilo" into the always-visible card footer as a small text link/icon-button. If the overlay is kept, add `focus-within:opacity-100` alongside `group-hover`.

**Suggested command**: `$impeccable adapt`

### [P1] Page diverges from `/productos` conventions across loading, error, empty, image, and type handling
**What**: Inline skeleton `div`s instead of a shared `ProjectCardSkeleton`; no `ErrorState`; plain-text empty div instead of `EmptyState`; `imageUrl: any` instead of `SanityImageSource`; raw `<img>` missing `loading="lazy"`, `decoding="async"`, `width`/`height`, and `onError` fallback; raw `console.error` instead of `logger.error`; single-select category filter instead of `/productos`'s multi-select + result count + "Limpiar filtros".

**Why it matters**: Every one of these divergences is a place where the user-facing experience is measurably worse on this page for no design reason — e.g., a malformed Sanity image reference shows a broken-image icon here but gracefully falls back to a placeholder on `/productos`. The `imageUrl: any` typing also means TypeScript can't catch a future Sanity schema change that breaks this page's image rendering. This is the systemic root of the heuristic-4 (Consistency) score of 1.

**Fix**: Bring `/proyectos` up to the `/productos` baseline by reusing existing components/patterns: a `ProjectCard` + skeleton (mirroring `ProductCard`/`ProductCardSkeleton`), `SanityImageSource` typing, `loading="lazy"`/`decoding="async"`/`width`/`height`/`onError` on images, `logger.error`, `EmptyState` for zero results, and the multi-select + result-count + "Limpiar filtros" pattern. This is mechanical reuse, not new design — high leverage for the effort.

**Suggested command**: `$impeccable polish`

### [P2] Gradient-text hero headline and `rounded-3xl` CTA violate DESIGN.md and create visible page-to-page inconsistency
**What**: `text-gradient` on the hero headline's emphasized word; `rounded-3xl` on the closing CTA container.

**Why it matters**: Both are explicit DESIGN.md anti-patterns that `/productos` already fixed (`text-secondary` and `rounded-2xl` respectively). A visitor navigating `/productos` → `/proyectos` will see the CTA block's corner radius visibly change between two structurally near-identical sections — a small but real "is this the same product?" inconsistency that chips away at "premium architectural confidence."

**Fix**: Replace `text-gradient` with `text-secondary` (matching `/productos`'s amber-accent convention for the hero headline). Change `rounded-3xl` to `rounded-2xl` on the CTA container.

**Suggested command**: `$impeccable polish`

### [P2] Animated stat-counter ribbon is templated filler that doesn't serve the gallery's job
**What**: The four-stat band (200+ proyectos, 6+ años, 100% satisfacción, 5000+ ventanas instaladas), each driven by a 2-second count-up animation on hardcoded literals, sandwiched between the hero and the gallery.

**Why it matters**: PRODUCT.md explicitly bans "hero-metric clichés" and asks the project to "show the work, don't just claim it." This section *claims* via numbers rather than *shows* via the gallery itself (which is right below and does the actual showing). The count-up animation implies "live" data for static config values — a small authenticity gap. It also disconnects from the filter/grid UI below it (a cognitive-load "grouping" failure) and pushes the gallery — the page's actual reason for existing — further down the scroll.

**Fix**: Either remove the stat ribbon entirely and let the gallery's real size/diversity be the proof, or fold the most relevant stat (actual project count) into the gallery header as a result count ("47 proyectos"), echoing `/productos`'s "X productos encontrados" pattern, rather than a separate static-stat ribbon with count-up theatrics.

**Suggested command**: `$impeccable distill`

### [P3] Single-select category filter limits a gallery that should support multi-axis browsing
**What**: `activeCategory: string` allows only one category at a time, vs. `/productos`'s `activeCategories: string[]` multi-select with result count and "Limpiar filtros".

**Why it matters**: For a project gallery specifically, multi-select would let a B2B visitor combine relevant categories (e.g., "Residencial" + "Comercial") without losing their place. Per PRODUCT.md's "capability and scale" framing for B2B, more flexible browsing of the proof-of-work gallery is directly on-strategy, and it's a noticeable capability gap relative to the sibling page.

**Fix**: Align to `/productos`'s `toggleCategory` + array pattern, with "Todos" clearing the array, plus the result-count + "Limpiar filtros" row.

**Suggested command**: `$impeccable polish`

## Persona Red Flags

**Casey (Distracted Mobile User)** — primary action: browse the gallery, find a style that resonates, tap to start a quote.
- The "Cotizar este estilo" CTA is gated behind `group-hover`, which has no reliable touch equivalent — Casey's most natural action (tap a photo) doesn't reliably lead anywhere, and the card has no `<a>`/`<Link>` wrapper outside the hover overlay.
- The category pill row uses `overflow-x-auto` with no scroll affordance (no fade-edge, no arrow) — Casey may not realize more categories exist off-screen.
- Images have no `loading="lazy"` — on a 3G/4G connection all gallery images load eagerly regardless of scroll position.
- If the fetch silently fails (P0), Casey — most likely to hit this on a flaky mobile connection — sees an empty page with no retry button.

**Riley (Deliberate Stress Tester)** — primary action: probe empty category, network failure, malformed data.
- A zero-result category renders a plain centered text div — no icon, no "ver todos los proyectos" link, nothing matching the `EmptyState` pattern used elsewhere. "Technically handled but inconsistent and unhelpful — no path back."
- Killing the network mid-fetch produces the P0 silent-failure state: the user sees a message implying the *category* is empty when actually *everything* failed to load — "error state indistinguishable from legitimate empty state, misleads the user about the actual problem."
- `project.imageUrl: any` with no `onError` fallback — a malformed/missing Sanity image reference would render a broken-image icon, unlike `/productos`'s graceful placeholder fallback.

**Alex (B2B / Impatient Power User — contractor/architect evaluating "capability and scale")** — primary action: quickly assess whether VentPro has handled projects similar to mine before requesting a quote.
- No way to see project details — even reaching the hover CTA goes straight to `/cotizacion`, not a project detail view with specs, materials, or scale.
- The stat ribbon promises scale ("5000+ ventanas instaladas") but the gallery provides no corroborating per-project detail — a claim with no supporting evidence, the exact gap PRODUCT.md's "show, don't claim" principle warns against.
- Single-select category filter prevents cross-referencing related categories (e.g., all commercial sub-types) in one view.

## Minor Observations

- `AnimatedCounter` re-implements count-up logic specifically for the stat ribbon — if the ribbon is removed/folded per the P2 fix, check whether this component becomes dead code.
- Category filter buttons have no `aria-pressed` (unlike `/productos`'s `aria-pressed={isActive}`) — a small Sam (accessibility) gap.
- The `+`/`%` suffix logic (`{s.suffix === "+" && "+"}` before the counter, `{s.suffix === "%" && "%"}` after) is a slightly awkward prefix/suffix split — readable but fragile if a third suffix type is ever needed.
- The stat ribbon (`bg-muted/50` + `border-y`) creates a third distinct "section background" treatment on the page (hero overlay, plain gallery background, primary-fill CTA) — four surface treatments on one page edges toward PRODUCT.md's "busy or inconsistent... color use" anti-reference, even though each is individually small.
- "Cotizar este estilo" ("Quote this style") frames the CTA narrowly around residential/aesthetic interest — a B2B visitor evaluating a commercial installation might find "este estilo" an odd lens; "Cotizar un proyecto similar" would serve both audiences better.
- `alt={project.name}` is present and reasonable — no issue there.

## Questions to Consider

1. What information would actually move a B2B visitor from "browsing pictures" to "requesting a quote" — and is it on this page at all? Right now there's nothing per-project about scale, materials, or location.
2. Do the four stat numbers need to live on this page in this ribbon format with count-up animation, or would the gallery itself — its size, diversity, real photography — be the better proof per "show, don't just claim it"?
3. Given how mechanical the gap to `/productos`'s already-built components and patterns is, is this mostly a "next in the queue" situation rather than a new design exercise?
