---
target: contacto
total_score: 18
p0_count: 1
p1_count: 2
timestamp: 2026-06-13T03-47-42Z
slug: frontend-src-pages-contactpage-tsx
---
# Critique: `/contacto` (ContactPage.tsx)

**Target file**: `frontend/src/pages/ContactPage.tsx`
**Route**: `/contacto` — secondary conversion surface for visitors who want a direct line (phone/email/map) rather than the `/cotizacion` flow.

## Design Health Score

| # | Heuristic | Score /4 | Key Finding |
|---|-----------|----------|-------------|
| 1 | Visibility of System Status | 1 | `sending` shows a bare spinner with no "Enviando..." label and no `aria-live` region; the error path silently fires an unannounced `mailto:` redirect before any explanation is visible. |
| 2 | Match Between System & Real World | 3 | Friendly "Hablemos" framing, real phone/email/address/hours in Spanish — reads naturally for a Guatemalan visitor. |
| 3 | User Control and Freedom | 1 | Error state auto-redirects via `window.location.href = mailto:...` with no consent; success state is a dead end with no next step or way to send another message. |
| 4 | Consistency and Standards | 1 | Local `fieldClass` still uses `rounded-xl` + custom focus ring, diverging from the `rounded-md` input spec already applied to `ContactForm.tsx`; a second, divergent `InfoItem`/map implementation duplicates `ContactInfo.tsx` with **different real-world data** (different phone, address, hours, map pin); `console.error` instead of `logger.error`. |
| 5 | Error Prevention | 1 | `phone` has no `type="tel"`; no required/optional markers even though `phone` is the only optional field. |
| 6 | Recognition Rather Than Recall | 3 | Contact info (phone/email/address/hours) is visible alongside the form with labeled icons — good co-location. |
| 7 | Flexibility and Efficiency of Use | 2 | Single linear path; adequate for a contact form, no shortcuts needed. |
| 8 | Aesthetic and Minimalist Design | 3 | Clean two-column layout, generous whitespace, restrained styling — loses points only for the radius/style mismatch from `fieldClass`. |
| 9 | Help Recognize/Diagnose/Recover from Errors | 1 | The only error feedback is one generic sentence shown *after* an automatic `mailto:` redirect has already fired. |
| 10 | Help and Documentation | 2 | "Te responderemos en menos de 24 horas hábiles" sets a clear expectation; no alternative contact surfaced in the error path beyond the forced redirect. |

**Total: 18/40 — Poor.** This page repeats, almost verbatim, the worst issues already found and fixed on `/cotizacion`: the same auto-firing `mailto:` redirect (P0 there), the same `text-green-500` off-palette success icon, and the same `rounded-xl` `fieldClass` drift from the `rounded-md` input spec. It also introduces a new issue not present elsewhere: a second hand-rolled "contact info" block (`InfoItem` + its own map embed) that duplicates `ContactInfo.tsx` but shows **different real business data** — a trust problem for any visitor who compares the homepage's contact section with `/contacto`.

## Anti-Patterns Verdict

**LLM assessment**: The page itself is visually restrained and on-brand (hero treatment, typography, two-column layout match the rest of the site). The failures are functional/consistency, not aesthetic-slop — but the data divergence is a real "looks unfinished" tell: VentPro effectively publishes two different phone numbers and two different street addresses depending on which page a visitor lands on.

**Deterministic scan**: `detect.mjs --json` on `ContactPage.tsx` returned `[]` (exit 0) — confirms the known gap where `text-green-500` (Two-Color Rule), auto-`mailto:` redirects, and cross-file data drift aren't caught automatically.

- No `text-gradient`, no `rounded-3xl+`, no `01/02/03` ordinals, no border-stripe accents.
- **CONFIRMED — third brand color**: line 122, `<CheckCircle className="h-14 w-14 text-green-500 ..." />` — same Two-Color Rule violation already fixed on `/cotizacion`.

## Overall Impression

`/contacto` is structurally sound (good hero, clean two-column layout, real info visible alongside the form) but functionally it's the same unfinished page `/cotizacion` was before its polish pass — an auto-firing `mailto:` on error, an off-palette success icon, and drifted input styling. On top of that, it carries its own, more accurate, copy of "contact info + map" that disagrees with the shared `ContactInfo` component shown on the homepage. None of this is a large rewrite: most of it is applying the exact fixes already proven on `/cotizacion`, plus reconciling the contact data so the site tells one consistent story.

## What's Working

1. **Hero framing** — "Hablemos" + "Respondemos tus preguntas y te ayudamos a iniciar tu próximo proyecto" is warm and on-voice without being generic.
2. **Info-alongside-form layout** — phone/email/address/hours/map sit next to the form so a visitor who'd rather call doesn't have to hunt for the number.
3. **Real, specific business data** — `(+502) 4191-6647`, the Zona 14 address, and Saturday hours read as a real operating business, not a placeholder.

## Priority Issues

### [P0] Auto-firing `mailto:` redirect on submission error
**What**: On any fetch failure (line 81-88), `window.location.href = mailto:cotizaciones@ventpro.com?...` fires immediately and unconditionally, before the user sees any explanation — identical to the bug already fixed on `/cotizacion`.
**Why it matters**: For visitors without a configured desktop mail client, this triggers an OS app-picker, a silent no-op, or an unwanted app-switch on mobile at the exact moment a converting visitor needs reassurance, not a surprise.
**Fix**: Remove the auto-redirect. On error, keep the user on the page, preserve their input, show an inline message with the mailto address as a clickable link, matching the pattern now used on `/cotizacion`.
**Suggested command**: `$impeccable harden contacto`

### [P1] Off-palette `text-green-500` success icon (Two-Color Rule)
**What**: Line 122, `<CheckCircle className="h-14 w-14 text-green-500 ..." />`.
**Why it matters**: DESIGN.md's Two-Color Rule restricts brand color to Deep Glass Blue + Golden Hour Amber; green has no role in "The Glass Pavilion" palette. This is the same violation already fixed on `/cotizacion`.
**Fix**: `text-primary` (matches the fixed `/cotizacion` success state).
**Suggested command**: `$impeccable polish contacto`

### [P1] Divergent, duplicated contact info (data-accuracy + consistency)
**What**: `ContactPage.tsx` defines its own `InfoItem` component and its own map `<iframe>` (Zona 14 pin, `(+502) 4191-6647`, Sat hours), while `ContactInfo.tsx` (shown on the homepage via `ContactForm`) has a *different* phone (`+502 1234-5678`), a different address ("Avenida Reforma"), no Saturday hours, and a different map pin.
**Why it matters**: A visitor who scrolls to the homepage's "Hablemos de tu proyecto" section and then visits `/contacto` sees two different phone numbers and two different addresses for the same company — undermines the "premium, serious manufacturer" positioning PRODUCT.md calls for. One of these is presumably stale placeholder data.
**Fix**: Reconcile to a single source of truth. Either (a) update `ContactInfo.tsx`'s `ITEMS`/map to match `/contacto`'s data (the more complete/specific version) and have `ContactPage.tsx` render `<ContactInfo />` instead of its local `InfoItem` block, removing the duplication; or (b) if `/contacto` intentionally shows more detail (Saturday hours), still align the phone/address/map pin across both.
**Suggested command**: `$impeccable harden contacto`

### [P2] `fieldClass` drift from DESIGN.md input spec
**What**: Lines 11-12 define `fieldClass` with `rounded-xl` and a custom focus ring, overriding `Input`/`Textarea`'s built-in `h-10 rounded-md` styling — the same pattern already removed from `ContactForm.tsx` and `/cotizacion`.
**Why it matters**: Inputs on `/contacto` are visibly more rounded than the rest of the site's forms, an off-brand inconsistency on a page whose entire job is to look trustworthy.
**Fix**: Delete `fieldClass`; use `Input`/`Textarea` defaults (as `/cotizacion` now does).
**Suggested command**: `$impeccable polish contacto`

### [P2] No "Enviando..." label, no `aria-live`, `console.error` instead of `logger.error`
**What**: The `sending` state renders only `<Loader2 className="animate-spin" />` with no text; nothing announces `sending` → `success`/`error` to assistive tech; line 82 uses `console.error` directly.
**Why it matters**: Screen-reader users get no confirmation the form was submitted or what happened; the logging convention used everywhere else (`ProductsPage`, `ProjectsPage`, `QuotePage`) is `logger.error`, which gates output in production.
**Fix**: Add "Enviando..." text next to the spinner, add a `sr-only`/`aria-live="polite"` status region (mirroring `/cotizacion`), and swap `console.error` → `logger.error` (import from `@/lib/logger`).
**Suggested command**: `$impeccable harden contacto`

### [P3] No required/optional field indicators
**What**: `name`, `email`, `message` are required and `phone` is optional, but nothing visually distinguishes this until submit.
**Why it matters**: Minor compared to `/cotizacion` (fewer fields here), but still inconsistent with the now-clarified `/cotizacion` form.
**Fix**: Add `(opcional)` after "Teléfono" label, matching `/cotizacion`'s convention.
**Suggested command**: `$impeccable clarify contacto`

## Persona Red Flags

**Riley (stress tester)**: Submitting with the network offline triggers the unconsented `mailto:` redirect — on a browser without a mail client configured (most), this either does nothing visible or opens an OS dialog mid-task, which Riley would flag as "looks broken."

**Sam (screen reader)**: No `aria-live` region means Sam has no idea the form was submitted, succeeded, or failed; the spinner-only button during `sending` has no accessible label.

**Jordan (first-timer, comparing pages)**: If Jordan first sees the homepage's contact section (different phone/address) and then visits `/contacto` for the "real" details, the mismatch reads as "which one is correct?" — eroding the trust this page exists to build.

## Minor Observations

- The map `<iframe>` has no visible loading/error fallback if the embed is blocked (ad blockers, slow connections) — a blank gray box with no label.
- `InfoItem`'s `href` wrapper (`<a>` containing a `<div>`) is valid but the whole card becomes a link for phone/email — fine, but the focus ring on the anchor isn't visually distinct from the unlinked address/hours items, which could read as inconsistent to a keyboard user.
- Hero height (`h-[45vh]`) is shorter than `/cotizacion`'s (`h-[50vh]`) — minor, likely intentional given less hero copy.

## Questions to Consider

1. Which of the two contact datasets (`/contacto`'s Zona 14 + Saturday hours, or `ContactInfo`'s Avenida Reforma + no Saturday) is the actual current business info? Reconciling this is as much a content decision as a design one.
2. If `/contacto` and the homepage's contact section end up sharing `ContactInfo`, should `/contacto` add anything extra (e.g., a "Síguenos" social row) to differentiate it from being "the same block twice"?
3. Now that `/cotizacion` has a richer success state (next step + two CTAs), should `/contacto`'s success state get the same treatment, or is "¡Mensaje enviado!" sufficient for a lower-stakes contact form?
