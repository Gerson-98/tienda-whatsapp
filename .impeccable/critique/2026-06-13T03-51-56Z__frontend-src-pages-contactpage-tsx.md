---
target: contacto
total_score: 27
p0_count: 0
p1_count: 0
timestamp: 2026-06-13T03-51-56Z
slug: frontend-src-pages-contactpage-tsx
---
# Critique: `/contacto` (ContactPage.tsx) — post-fix

**Target file**: `frontend/src/pages/ContactPage.tsx` (+ `frontend/src/components/layout/ContactInfo.tsx`)

## Design Health Score

| # | Heuristic | Score /4 | Key Finding |
|---|-----------|----------|-------------|
| 1 | Visibility of System Status | 3 | "Enviando..." label on the submit button plus an `aria-live="polite"` status region now announce `sending`/`success`/`error`. |
| 2 | Match Between System & Real World | 3 | Unchanged — warm Spanish copy, real info. |
| 3 | User Control and Freedom | 3 | `mailto:` auto-redirect removed; error state offers a clickable mailto link with no forced navigation; success state now offers "Enviar otro mensaje". |
| 4 | Consistency and Standards | 3 | `fieldClass` removed (inputs now use the shared `h-10 rounded-md` spec); `/contacto` and the homepage now share one `ContactInfo` component and one dataset; `logger.error` replaces `console.error`. |
| 5 | Error Prevention | 2 | `phone` now `type="tel"` and marked "(opcional)"; remaining gap is no inline validation beyond native HTML5. |
| 6 | Recognition Rather Than Recall | 3 | Unchanged — info visible alongside form. |
| 7 | Flexibility and Efficiency of Use | 2 | Unchanged. |
| 8 | Aesthetic and Minimalist Design | 3 | Radius mismatch resolved; layout otherwise unchanged. |
| 9 | Error Recovery | 3 | Inline, actionable error message with a real mailto link, no surprise navigation. |
| 10 | Help and Documentation | 2 | Unchanged — 24h promise present, no broader help surface (out of scope for this page). |

**Total: 27/40 — Good** (up from 18/40).

## Anti-Patterns Verdict

- Detector on both touched files: `[]`, exit 0 — clean.
- `text-green-500` replaced with `text-primary` — Two-Color Rule restored.
- `/contacto`'s `InfoItem` + divergent map/data removed entirely; `ContactInfo.tsx` is now the single source of truth (real phone, Zona 14 address + Saturday hours, correct map pin) used by both `/contacto` and the homepage's `ContactForm`.

## Strengths

1. P0 auto-`mailto:` redirect eliminated — the riskiest issue on the page is gone, matching the `/cotizacion` fix.
2. One shared, accurate `ContactInfo` component now backs both the homepage and `/contacto` — the two-different-addresses trust problem is resolved site-wide, not just locally.
3. Status announcements (`aria-live`, "Enviando...", inline error with link) bring this form in line with `/cotizacion`'s accessibility baseline.

## Remaining / Minor

- **[P3]** No inline field-level validation feedback beyond native HTML5 `required`/`type` — DESIGN.md specifies Alert-red error text below fields; same gap noted (and left) on `/cotizacion`.
- **[P3]** Map `<iframe>` still has no visible fallback if the embed is blocked.

## Summary

Score improved from **18/40 (Poor)** to **27/40 (Good)**. The P0 and both P1s are resolved; remaining items are pre-existing, low-impact polish shared with `/cotizacion`.
