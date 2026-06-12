---
target: proyectos
total_score: 36
p0_count: 0
p1_count: 0
timestamp: 2026-06-12T20-01-43Z
slug: frontend-src-pages-projectspage-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Loading → `ProjectCardSkeleton` grid, error → `ErrorState`, empty → `EmptyState`, success → grid — all four states are real and distinguishable, plus a live "N proyectos encontrados" result count. |
| 2 | Match Between System and Real World | 4 | "Cotizar un proyecto similar" reads naturally; category pills and "Limpiar filtros" are plain Spanish, no jargon. |
| 3 | User Control and Freedom | 4 | Multi-select category toggle + "Todos" reset + "Limpiar filtros" (in both the result bar and `EmptyState`) gives full filter control; retry button gives an exit from the error state. |
| 4 | Consistency and Standards | 4 | `ProjectCardSkeleton`/`ProjectCard`/`EmptyState`/`ErrorState`/`logger.error`/`Project` type with `SanityImageSource`/multi-select pills/result-count bar now mirror `/productos` structurally and visually. Only remaining divergence (no sticky search/sort) is a legitimate IA difference, not an inconsistency. |
| 5 | Error Prevention | 3 | `onError` image fallback + `aria-pressed` on filter pills prevent broken/ambiguous states. Docked slightly because every card now links to the same generic `/cotizacion` destination — a soft mismatch with the per-project "similar to {name}" promise (see P2 below). |
| 6 | Recognition Rather Than Recall | 4 | Category pills always visible with `aria-pressed` active state; hover/focus overlay reveals the CTA inline, no memorization needed. |
| 7 | Flexibility and Efficiency of Use | 3 | Multi-select filtering is now in place — a real efficiency win over the prior single-select. No keyboard shortcuts beyond standard tab/enter, appropriate for a marketing gallery. |
| 8 | Aesthetic and Minimalist Design | 4 | Removing the stat ribbon and going straight from filter bar to grid to CTA is cleaner and calmer — matches the "premium architectural" register. No awkward gap introduced by the removal. |
| 9 | Error Recovery | 4 | `ErrorState` with `onRetry={() => setRetryCount(c => c+1)}` is a real, working retry (re-triggers the fetch via the `useEffect` dependency array), with a human fallback ("Contáctanos directamente"). |
| 10 | Help and Documentation | 2 | Unchanged — no contextual help, but consistent with `/productos` and appropriate for a marketing gallery. |
| **Total** | | **36/40** | **Excellent — up from 14/40 (+22). All P0/P1 issues resolved; remaining items are P2/P3 polish.** |

## Anti-Patterns Verdict

**Much improved, and the page-level slop tells are gone.**

**LLM assessment**: `text-gradient` is replaced with `text-secondary` (now matches `/productos`'s "Nuestro **catálogo**" / "Nuestros **proyectos**" pattern exactly), the templated stat-counter ribbon is fully removed, and `rounded-3xl` is now `rounded-2xl` on the CTA. `AnimatedCounter` was cleanly deleted with zero dead-code remnants anywhere in `src/`. The page now reads as a true sibling of `/productos` rather than a separately-vibed leftover.

One new, smaller tell: wrapping the *entire* project card in a single `<Link to="/cotizacion">` means every card — regardless of project — routes to the same generic destination. Not visual slop, but a content/IA shortcut a careful reviewer notices quickly (flagged as P2 below).

**Deterministic scan**: `detect.mjs --json` on all three changed files (`ProjectsPage.tsx`, `ProjectCard.tsx`, `ProjectCardSkeleton.tsx`) returned **zero findings, exit code 0**.

**Grep confirmation**: Both previously-flagged DESIGN.md violations are confirmed resolved — `text-gradient` and `rounded-3xl` no longer appear anywhere in the three target files.

**Visual overlays**: Not available — no dev server running on 5173/3000/4173.

## Overall Impression

This is a near-complete turnaround. Every P0 and P1 issue from the 14/40 run is resolved and verified working end-to-end: the error/retry path is real (not cosmetic), the per-project CTA is reachable on touch and keyboard via a full-card `<Link>` with `focus-within` states, and the consistency convergence with `/productos` is thorough rather than superficial (shared component shapes, shared type shape, shared filter/result-count/empty-state patterns). The two DESIGN.md violations and the stat-ribbon filler are gone with no layout regressions. What remains is refinement-tier: the generic CTA destination undermines the "similar to {name}" copy promise, a minor duplicate-heading accessibility redundancy inside the card link, and a pre-existing filter-row scroll-affordance gap that's now visible on this page too.

## What's Working

1. **The P0 error-handling fix is real and complete.** `ErrorState` + `onRetry` is wired to `retryCount`, which re-triggers the fetch via the `useEffect` dependency array; `logger.error` replaces `console.error`; the message gives a human fallback ("Contáctanos directamente"). Verified line-for-line against `/productos`'s pattern.
2. **The touch/keyboard CTA fix is genuinely accessible, not just less hover-dependent.** The entire card is `<Link to="/cotizacion" aria-label="Cotizar un proyecto similar a {name}">` with `focus-within:ring-2 ring-offset-2` on the card and `group-focus-within:opacity-100` on the overlay — keyboard users get a visible focus ring and the overlay text together, and touch users don't need hover at all.
3. **Consistency convergence with `/productos` is thorough.** `Project` type mirrors `Product` (`SanityImageSource | null`, `categoryName: string | null`); `ProjectCardSkeleton` mirrors `ProductCardSkeleton`'s structure; the multi-select pill filter with `aria-pressed` + result count + "Limpiar filtros" matches `/productos` faithfully; `<img>` now has `loading="lazy"`, `decoding="async"`, explicit `width`/`height`, and an `onError` placeholder fallback.

## Remaining/New Priority Issues

### [P2] Every project card links to the same generic destination, undermining the "similar to {name}" promise
**What**: `ProjectCard.tsx` wraps the whole card in `<Link to="/cotizacion" aria-label="Cotizar un proyecto similar a {project.name}">`. Every card, regardless of project/style/category, routes to the same `/cotizacion` with no pre-filled context.

**Why it matters**: The aria-label and hover copy create a specific expectation — that clicking *this* project leads somewhere related to *this* project's style. Landing on a generic, identical quote form for every card is a small "promise broken" moment, especially for B2B visitors (architects/contractors) comparing project styles before referencing one in their RFQ — directly relevant to PRODUCT.md's "evaluating capability... before reaching out for a spec quote."

**Fix**: At minimum, pass the project's category/name as a query param to `/cotizacion` (e.g. `?ref=${project.categoryName}`) and have the quote form acknowledge it. If that's out of scope for now, soften the copy to avoid promising specificity the destination can't deliver (e.g., "Solicita una cotización" instead of "...un proyecto similar a {name}").

**Suggested command**: `$impeccable clarify`

### [P3] Duplicate `<h3>{project.name}</h3>` inside one `aria-label`'ed link
**What**: `ProjectCard.tsx`'s `<Link>` contains two `<h3>` elements with overlapping text — one in the hover overlay, one in the static footer — plus the link's own `aria-label` repeats the name a third time.

**Why it matters**: For screen-reader users, this is minor redundancy when exploring the link's contents beyond its accessible name. Not broken, just dead weight for AT users on deep inspection.

**Fix**: Add `aria-hidden="true"` to the visual `<h3>` elements inside the link, since the link's `aria-label` already conveys the equivalent information.

**Suggested command**: `$impeccable harden`

### [P3] Category filter pill row has no visible scroll affordance
**What**: `overflow-x-auto` on the filter pill row has no fade-edge/scroll hint if categories overflow the viewport width — a pre-existing pattern shared with `/productos`, now also present on `/proyectos` since this page didn't have a filter row before.

**Why it matters**: Casey (mobile) may not realize more categories exist off-screen if the row exactly fills the viewport.

**Fix**: Add a subtle trailing-edge fade/gradient mask when the row overflows. Low effort, shared fix across both pages.

**Suggested command**: `$impeccable polish`

## Persona Red Flags

**Sam (Accessibility-Dependent User)**: Keyboard flow now works end-to-end — tab to a card reveals a focus ring and the overlay together, Enter activates the link. Only flag is the duplicate-heading redundancy noted in P3 above; the primary interaction has no red flag.

**Riley (Deliberate Stress Tester)**: Verified `EmptyState` + conditional "Limpiar filtros" on zero-result filters; verified retry-after-failure re-triggers the fetch without an infinite-spinner trap. One edge case worth a conscious product decision: a project with `categoryName: null` is correctly excluded from any filtered view (only visible under "Todos") — correct behavior, but worth confirming intentional. The previously-broken "all cards go to the same place" finding is now a P2 design note rather than a "broken" finding.

**Jordan (Confused First-Timer)**: The hover/focus overlay clearly states "Cotizar un proyecto similar" with an arrow icon — the action is understandable without instructions. Filtering to zero results shows a clear message + "Limpiar filtros." Landing on a generic (non-project-specific) quote form after clicking a card might cause a brief "didn't I just click on a specific project?" moment — see P2.

## Minor Observations

- `description` on the `Project` type is fetched but not rendered in `ProjectCard.tsx` (unlike `ProductCard`, which shows `product.description`) — not a regression, but a content-utilization gap worth a future look if Sanity authors are writing project descriptions.
- `AnimatedCounter` confirmed fully removed — no file or references remain anywhere in `src/`.
- Spacing check: removing the stats ribbon left no awkward gap; `py-20` + `mb-6`/`mb-10` on the filter/result rows gives adequate breathing room.
- "Todos" reset correctly clears `activeCategories` to `[]`, which correctly hides "Limpiar filtros" — filter-state logic is internally consistent.

## Questions to Consider

1. If every project card leads to the same `/cotizacion` page, should cards be honest about being a "style mood board" (adjust copy/affordance) or should the quote flow accept a `?ref=` context to make the journey feel tailored?
2. Now that `/proyectos` and `/productos` share nearly identical filter-bar, skeleton, empty-state, and error-state patterns, should these be extracted into shared components (`<CategoryFilterBar>`, `<ResultCountBar>`) so future changes to one don't silently drift from the other?
3. Is adding `?ref=...` query-param context to the per-project CTA worth doing now, while `ProjectCard.tsx` is fresh in context — closing the P2 above and making the B2B evaluation journey more tailored?
