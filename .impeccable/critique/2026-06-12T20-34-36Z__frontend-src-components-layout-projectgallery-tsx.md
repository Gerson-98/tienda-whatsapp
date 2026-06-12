---
target: galeria
total_score: 35
p0_count: 0
p1_count: 0
timestamp: 2026-06-12T20-34-36Z
slug: frontend-src-components-layout-projectgallery-tsx
---
# Critique: "galeria" (ProjectGallery.tsx) — verification after harden + quieter

**Score: 35/40 — Excellent** (up from 18/40)

## Design Health Score

| # | Heuristic | /4 | Change |
|---|-----------|----|--------|
| 1 | Visibility of System Status | 3 | `ProjectCardSkeleton` ×6 shown while `projects === null`; real data replaces it once fetched. (was 1) |
| 2 | Match Between System & Real World | 4 | `FALLBACK_PROJECTS` removed entirely — only real Sanity projects render, section hides itself (`return null`) if there are none. (was 2) |
| 3 | User Control and Freedom | 4 | Cards now link to `/cotizacion` via `ProjectCard`, plus "Ver todos" → `/proyectos`. (was 3) |
| 4 | Consistency and Standards | 4 | Now renders the canonical `ProjectCard` — identical link/aria-label/focus-within/lazy-load/onError behavior as `/proyectos`. No divergent implementation left. (was 1) |
| 5 | Error Prevention | 4 | Uses canonical `Project` type and Sanity query (incl. `categoryName`) — no inline type mismatch. (was 1) |
| 6 | Recognition Rather Than Recall | 4 | Cards are now pixel-identical to `/proyectos`, reinforcing the pattern instead of a near-miss. (was 3) |
| 7 | Flexibility and Efficiency of Use | 4 | A user can go straight from a homepage card to `/cotizacion` — no detour through `/proyectos`. (was 2) |
| 8 | Aesthetic and Minimalist Design | 4 | "Portafolio" eyebrow removed (quieter); `py-24` → `py-20` aligns with DESIGN.md's section-spacing token. (was 3) |
| 9 | Error Recovery | 2 | On fetch error the section gracefully hides rather than showing fake projects — correct degrade for a teaser, though still no user-facing retry. (was 0) |
| 10 | Help and Documentation | 2 | Unchanged — low stakes for a marketing teaser. |

## Anti-Patterns Verdict
- Detector (`detect.mjs --json`): `[]`, exit 0 — clean.
- `uppercase tracking-widest`, `text-gradient`, `rounded-3xl`, `FALLBACK_PROJECTS`, `GalleryItem` — all absent, confirmed via grep.

## What Changed
- **[P0 resolved]** Cards now render via the canonical `ProjectCard` (real `<Link to="/cotizacion">`, `aria-label`, `focus-within` ring, `loading="lazy"`, `decoding="async"`, `onError` fallback) — the hover-arrow-that-goes-nowhere is gone.
- **[P0 resolved]** Loading state via `ProjectCardSkeleton` ×6; on error or empty result the section returns `null` instead of showing fabricated projects.
- **[P1 resolved]** `FALLBACK_PROJECTS` placeholder copy removed entirely.
- **[P2 resolved]** Switched to the canonical `Project` type (`description: string | null`, `categoryName` now fetched) — no more inline type mismatch.
- **[P3 resolved]** "Portafolio" eyebrow removed; section spacing aligned to `py-20`.

## Remaining Observations
- Error Recovery (2/4): hiding the section on error/empty is the right call for a teaser, but if this becomes a recurring pattern across the site it may be worth a shared "silently degrade" convention/log alert so failures aren't invisible to the team.
- Help and Documentation (2/4): unchanged — acceptable for a low-stakes marketing section.

## Verdict
All P0/P1/P2/P3 issues from the initial critique are resolved. The section now shares one canonical implementation with `/proyectos`, eliminating the "duplicated/divergent component" anti-pattern for this part of the codebase.
