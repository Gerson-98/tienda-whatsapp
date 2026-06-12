---
target: cotizacion
total_score: 33
p0_count: 0
p1_count: 0
timestamp: 2026-06-12T20-20-01Z
slug: frontend-src-pages-quotepage-tsx
---
# Re-critique: `/cotizacion` (QuotePage.tsx) — after harden/polish/delight/clarify/adapt

**Target file**: `frontend/src/pages/QuotePage.tsx` (+ `frontend/src/components/products/QuoteCartSummary.tsx`)
**Route**: `/cotizacion`
**Baseline**: 16/40 (Poor), 2026-06-12T20-11-53Z

## Design Health Score

| # | Heuristic | Score /4 | Key Finding |
|---|-----------|----------|-------------|
| 1 | Visibility of System Status | 3 | Submit button now shows spinner + "Enviando..."; `aria-live="polite"` region announces sending/success/error to screen readers. Gap to 4: no inline field-level validation feedback. |
| 2 | Match Between System & Real World | 4 | New 24h response-time promise ("te contactaremos en menos de 24 horas hábiles") replaces vague "a la brevedad"; copy and field order match natural quote-request expectations. |
| 3 | User Control and Freedom | 4 | Cart now supports quantity +/-, remove, and "Vaciar" (via integrated `QuoteCartSummary`); success state offers "Hacer otra solicitud" (reset to idle) and "Ver nuestros proyectos"; error state no longer auto-redirects — `mailto:` is now an optional clickable link. |
| 4 | Consistency and Standards | 4 | `Input`/`Textarea` use shared default styling (no more `fieldClass`); `formatPrice` duplication removed (flows through `@/lib/format` via `QuoteCartSummary`); Two-Color Rule restored (`text-secondary`, `text-primary`); `logger.error` replaces `console.error`. |
| 5 | Error Prevention | 3 | `*` required markers + "(opcional)" on Tipo de proyecto + "* Campos requeridos" legend; `type="tel"` added. Gap to 4: still relies on native HTML5 validation only, no custom inline error text per DESIGN.md's Alert-red field-error spec. |
| 6 | Recognition Rather Than Recall | 4 | Cart contents fully visible and editable in place (name, unit price, quantity, line total, subtotal); mobile cart-first ordering means selections are recalled before the form. |
| 7 | Flexibility and Efficiency of Use | 2 | Unchanged — single linear form, no draft-saving. Cart steppers are a real win for quantity changes, but this wasn't the focus of the fix pass. |
| 8 | Aesthetic and Minimalist Design | 3 | Both Two-Color Rule violations resolved. Layout remains clean. Gap to 4: success and empty-cart states are visually generic relative to the rest of the site's "Glass Pavilion" identity (no glass-glow/light-ray motifs at the highest-stakes moment). |
| 9 | Help Recognize/Diagnose/Recover from Errors | 4 | Error message is plain Spanish, `role="alert"`, identifies the problem, and offers two recovery paths (retry — form data preserved — or a clickable `mailto:` link). Complete turnaround from the baseline's auto-redirect. |
| 10 | Help and Documentation | 2 | Unchanged — no FAQ/help link, no guidance on what detail level is useful in "Describe tu proyecto" beyond the placeholder. |

**Total: 33/40 — Good** *(up from 16/40 — Poor)*

## Anti-Patterns Verdict

- `text-gradient` (line 101, hero headline) → **resolved**, now `text-secondary`.
- `text-green-500` (success checkmark, third brand color) → **resolved**, now `text-primary`.
- Detector (`detect.mjs --json` on both files) → `[]`, exit 0, confirms no regressions introduced.
- Grep for `text-gradient`, `rounded-3xl`, `text-green-500` across both files → no matches.

## Verification Against Baseline Findings

| Baseline Issue | Status |
|---|---|
| `text-gradient` headline (P1) | **Resolved** |
| Auto-firing `mailto:` redirect on error (P0) | **Resolved** — replaced with inline `role="alert"` + optional clickable `mailto:` link, form data preserved |
| Dead/unused `QuoteCartSummary` (P1) | **Resolved** — integrated with quantity steppers, "Vaciar", `buildCartMessagePrefix` |
| Anticlimactic dead-end success state (P1) | **Substantially resolved** — personalized message, "Hacer otra solicitud", secondary CTA, third-color fixed; visual treatment remains a P2 polish opportunity |
| Duplicated `formatPrice` / divergent `fieldClass` / `console.error` (P2) | **Resolved** |
| No required/optional indicators, no `type="tel"` (P2) | **Resolved** |
| Mobile cart placement after form (P3) | **Resolved** — `order-first lg:order-none` |
| 32px touch target on remove button (P3) | **Resolved** — now 40px (`size="icon"` default) |

All baseline P0/P1 issues are fully resolved. No P0 or P1 issues remain.

## Remaining Issues (P2/P3, optional follow-up)

- **[P2]** Success and empty-cart states remain visually generic relative to the site's "Glass Pavilion" identity (no glass-glow/light-ray motifs at the highest-stakes moment). → `$impeccable delight cotizacion`
- **[P2]** No inline field-level validation feedback beyond native HTML5 `required`/`type` — DESIGN.md specifies Alert-red error text below fields. → `$impeccable harden cotizacion`
- **[P3]** Cart row density (4 controls per row) could use tighter visual grouping.
- **[P3]** No transition/animation between form → success/error states.
- **[P3]** `QuoteCartSummary` quantity steppers remain `h-7 w-7` (28px), smaller than the now-40px remove button — minor touch-target inconsistency.

## Strengths

1. The auto-mailto redirect removal is a complete, correct fix — the most severe baseline issue, now fully user-controlled.
2. `QuoteCartSummary` integration turned dead code into the flow's best moment — quantity steppers, per-item totals, "Vaciar" all working.
3. Required-field clarity + 24h response promise close the two biggest "what happens next" anxiety gaps for both residential and B2B users.

## Persona Notes

- **Jordan**: required/optional markers and the 24h promise answer his two biggest anxieties; minor remaining flag is browser-native validation tooltips potentially appearing in English/technical phrasing.
- **Casey**: cart-first mobile ordering and the 40px remove button are wins; the quantity stepper buttons (28px) remain smaller than the remove button — a small inconsistency.
- **Riley**: form data correctly preserved on error, cart not cleared on error, double-submit prevented via `disabled={status === "sending"}`. Form text (unlike the cart) still doesn't survive a page refresh — pre-existing, out of scope.

## Summary

Score improved from **16/40 (Poor)** to **33/40 (Good)**. All P0/P1 issues from the first critique are resolved. Remaining items are P2/P3 polish opportunities, primarily around making the success state feel as premium as the rest of the site.
