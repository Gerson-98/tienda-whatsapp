---
target: cotizacion
total_score: 16
p0_count: 1
p1_count: 3
timestamp: 2026-06-12T20-11-53Z
slug: frontend-src-pages-quotepage-tsx
---
# Critique: `/cotizacion` (QuotePage.tsx)

**Target file**: `frontend/src/pages/QuotePage.tsx`
**Route**: `/cotizacion` — the site's primary conversion page for both residential and B2B (contractor/architect) audiences.

## Design Health Score

| # | Heuristic | Score /4 | Key Finding |
|---|-----------|----------|-------------|
| 1 | Visibility of System Status | 2 | `sending` replaces the button label with a bare spinner (no "Enviando..." text); no `aria-live` announces `sending`→`success`/`error` transitions; the error path silently fires an unannounced `mailto:` redirect before the explanatory text appears. |
| 2 | Match Between System & Real World | 3 | Spanish copy and field labels match real quote-request mental models; honest "el precio final puede variar" caveat. `projectType` as free text with placeholder examples is a minor mismatch — users expect a select. |
| 3 | User Control and Freedom | 1 | Cart items can only be removed, not quantity-adjusted (`updateQuantity` exists but unused); no "Vaciar"; success state is a dead end with no next action; error path auto-redirects via `mailto:` with no user consent and no undo. |
| 4 | Consistency and Standards | 1 | Local `formatPrice` duplicates `@/lib/format`; hand-rolled `fieldClass` (`rounded-xl`, custom focus ring) overrides the shared `Input`/`Textarea` styling and DESIGN.md's input spec (`h-10`/`rounded-md`); `console.error` instead of `logger.error`; a fully-built `QuoteCartSummary` (quantity steppers, "Vaciar", `buildCartMessagePrefix`) sits unused while this page reimplements a weaker version inline. |
| 5 | Error Prevention | 1 | No visual `*`/"(opcional)" markers distinguishing required vs. optional fields (`projectType` is the only non-required field, indistinguishable until submit); `phone` has no `type="tel"` or format validation despite a formatted placeholder. |
| 6 | Recognition Rather Than Recall | 2 | Cart summary is visible so users don't have to recall their selections; empty-cart state offers a clear "Ver productos" CTA. No quantity affordance to recognize since none exists. |
| 7 | Flexibility and Efficiency of Use | 1 | Changing an item's quantity requires removing it and re-navigating to `/productos` to re-add — a multi-page detour for a one-tap fix. No "submit another request" after success forces a full reload for repeat use (relevant to B2B users quoting multiple buildings). |
| 8 | Aesthetic and Minimalist Design | 3 | Clean two-column layout, generous whitespace, restrained styling. Loses points for the `text-gradient` headline and for `fieldClass` creating a visible radius/style mismatch (`rounded-xl` inputs inside a `rounded-2xl` card vs. the `rounded-md` spec). |
| 9 | Help Recognize/Diagnose/Recover from Errors | 1 | The only error feedback is one generic sentence, shown *after* an automatic `mailto:` redirect has already fired — for users without a configured desktop mail client (the majority), this produces a broken-looking OS dialog or silent no-op at the exact moment they tried to convert. |
| 10 | Help and Documentation | 1 | No "what happens next," no expected response time beyond "a la brevedad," no alternative contact (phone/WhatsApp) for users who'd rather not wait, especially relevant for B2B buyers comparing suppliers. |

**Total: 16/40 — Poor.** The single most important page on the site currently has the weakest score of any page critiqued so far (inicio, productos, proyectos all scored 26+ after their first critique, or improved to 36 post-fix). This page reads as if it predates the recent `/productos` polish pass — it has not inherited the shared `formatPrice`, the logging convention, or the purpose-built `QuoteCartSummary` component, and still carries the `text-gradient` violation already removed elsewhere.

## Anti-Patterns Verdict

- **CONFIRMED — `text-gradient` (DESIGN.md ban)**: line 101, `<span className="text-gradient">cotización</span>`. This is the exact pattern already fixed on `/proyectos` and `/productos` (replaced with `text-secondary`) but missed here — and this is the worst place for it to survive, since it's the first thing every converting visitor sees.
- **CONFIRMED — third brand color (Two-Color Rule)**: the success-state checkmark uses `text-green-500`, a color with no role in "The Glass Pavilion" palette (Deep Glass Blue / Golden Hour Amber only).
- **CONFIRMED — generic contact-form template**: 5-field "Nombre / Correo / Teléfono / Tipo de proyecto / Mensaje" form is indistinguishable from a generic small-business contact widget — exactly the "any local competitor" look PRODUCT.md's anti-references warn against, especially for the B2B persona evaluating "capability, scale, professionalism."
- **Detector (`detect.mjs --json`)**: returned `[]` (zero findings), exit code 0 — confirms the known gap where `text-gradient` and Two-Color violations aren't caught automatically and must be checked manually.
- No `rounded-3xl+`, no border-stripe accents, no `01/02/03` ordinals, no eyebrow labels found.

## Overall Impression

`/cotizacion` is the conversion point for the entire site — both the residential homeowner and the B2B contractor funnel here after being convinced elsewhere. Right now it's the weakest page reviewed: it has a leftover `text-gradient` headline, a duplicated/divergent cart summary (while a better one — `QuoteCartSummary`, complete with quantity steppers and a "Vaciar" button — sits fully built and unused), local re-implementations of shared utilities (`formatPrice`, input styling) that have drifted from the design system, and — most seriously — an error-handling path that automatically redirects the browser to `mailto:` without confirmation. The emotional arc of the page is flat at its peak (an anticlimactic, dead-end success card) and alarming at its valley (the silent mailto hijack on failure). None of these are large rewrites — most are integration/cleanup of work already done elsewhere — but together they make the highest-stakes page on the site feel like the least-finished one.

## What's Working

1. **Honest pricing caveat** — "El precio final puede variar según medidas y acabados" sets expectations without hiding the subtotal, good for trust with both audiences.
2. **Empty-cart state** — "Tu carrito está vacío" + "Ver productos" CTA is a well-handled micro-state, one of the better-executed details on the page.
3. **Sticky cart summary on desktop** (`lg:sticky lg:top-24`) keeps the running total visible while filling the form — good co-location of relevant info, reducing working-memory load (the mobile placement undoes this, see P3 below).

## Priority Issues

### [P0] Auto-firing `mailto:` redirect on submission error
**What**: On any fetch failure, `window.location.href = "mailto:cotizaciones@ventpro.com?subject=...&body=..."` fires immediately and unconditionally, before the user sees any explanation.
**Why it matters**: This is the failure path of the site's single most important interaction. For the majority of users without a configured desktop mail client, this produces an OS app-picker dialog, a silent no-op, or an app-switch on mobile — at the exact moment a converting visitor needs reassurance, not a surprise. For B2B buyers evaluating "professionalism," a site that appears to malfunction on submit is disqualifying.
**Fix**: Never auto-trigger `mailto:`. On error, keep the user on the page, show a clear inline message with a retry button, preserve entered data (already done), and present the mailto address as a clickable link the user can choose to use.
**Suggested command**: `$impeccable harden cotizacion`

### [P1] `text-gradient` on the hero headline — DESIGN.md violation, first impression of the conversion page
**What**: Line 101, `<span className="text-gradient">cotización</span>` — the banned gradient-fill pattern, already fixed on `/proyectos` and `/productos` but missed here.
**Why it matters**: This is the literal first thing every visitor sees on the page that converts both audiences. DESIGN.md names this pattern as "generic AI/template SaaS" — the opposite of the "premium architectural manufacturer" positioning required.
**Fix**: `<span className="text-secondary">cotización</span>`, matching the fix already applied elsewhere.
**Suggested command**: `$impeccable polish cotizacion`

### [P1] Quote cart is read-only while a fully-built, better version sits unused as dead code
**What**: The inline "Tu cotización" aside (lines ~221-277) only supports `removeItem`. The store's `updateQuantity` is never called. Meanwhile `frontend/src/components/products/QuoteCartSummary.tsx` — purpose-built with quantity steppers (+/-), a "Vaciar" button, and a `buildCartMessagePrefix` helper, with a doc comment stating it should be inserted above the quote form — is imported nowhere in the codebase.
**Why it matters**: A user who added the wrong quantity has no way to fix it without leaving the page, navigating to `/productos`, and re-adding — a multi-page detour for a one-tap change. For a B2B buyer building a multi-item quote for a whole building, this friction is real and the fix already exists, unused.
**Fix**: Replace the inline cart block with `<QuoteCartSummary />`; use `buildCartMessagePrefix(items)` in `handleSubmit` instead of the hand-rolled `cartSummary`/`fullMessage` string-building; remove the now-redundant local `formatPrice`, `removeItem`/`clearCart` direct calls, and inline `<ul>` markup.
**Suggested command**: `$impeccable polish cotizacion`

### [P1] Anticlimactic, dead-end success state
**What**: On success, the form is replaced by a static card: checkmark + "¡Solicitud recibida!" + one sentence. No link home, no next step detail, no "submit another quote," and the checkmark uses `text-green-500` — a third brand color outside the Two-Color Rule.
**Why it matters**: Per the peak-end rule, this moment defines how the whole site experience is remembered. For B2B users needing to submit quotes for multiple buildings in one session, there's no path to do that without a manual reload. For residential users, there's no reinforcement of what happens next or how soon. The page currently reads as "stopped," not "rewarded."
**Fix**: Expand the success card with a concrete next step ("te contactaremos en 1 día hábil"), a secondary CTA (`<Link to="/">Volver al inicio</Link>` or `/proyectos`), a "Hacer otra solicitud" button that resets `status` to `idle`, and swap `text-green-500` for `text-primary`/`text-secondary`.
**Suggested command**: `$impeccable delight cotizacion`

### [P2] Drifted consistency: duplicated `formatPrice`, divergent `fieldClass`, `console.error`
**What**: Local `formatPrice` (lines 13-17) duplicates `@/lib/format`'s formatter; `fieldClass` (lines 19-20) overrides `Input`/`Textarea`'s built-in `h-10 rounded-md` styling with `rounded-xl` + custom focus ring, breaking DESIGN.md's input spec; `console.error(error)` (line 81) bypasses the project's `logger.error` wrapper.
**Why it matters**: Each is minor alone, but together they signal this page predates the `/productos` polish pass that introduced the shared formatter and logging convention. A careful viewer comparing input fields across pages would notice this form's inputs are visibly more rounded/padded than elsewhere — an off-brand tell on the conversion page specifically.
**Fix**: Import `formatPrice` from `@/lib/format` and delete the local copy; delete `fieldClass`, relying on `Input`/`Textarea` defaults; replace `console.error` with `logger.error` (this also folds naturally into the `QuoteCartSummary` integration above, since adopting it removes the local `formatPrice` usage too).
**Suggested command**: `$impeccable harden cotizacion`

### [P2] No required/optional field indicators; `phone` has no format validation
**What**: `name`, `email`, `phone`, `message` are `required`; `projectType` is not — but nothing visually distinguishes this. `phone` lacks `type="tel"` or any pattern check despite a formatted placeholder `(+502) 1234-5678`.
**Why it matters**: Users can't tell which fields are skippable until they try to submit. A stress-tester (Riley) could enter anything into `phone` and it would pass straight through.
**Fix**: Add "(opcional)" after "Tipo de proyecto" or add `*` markers with a "* campos requeridos" note; add `type="tel"` to the phone input.
**Suggested command**: `$impeccable clarify cotizacion`

### [P3] Mobile cart placement and touch targets
**What**: On mobile (`grid-cols-1`), the cart summary aside renders in DOM order *after* the entire 5-field form. The remove button is `h-8 w-8` (32px), below the 44px touch-target recommendation.
**Why it matters**: A mobile user (Casey) arriving from `/productos` with a populated cart has to scroll past the whole form before seeing confirmation her selections carried over — a trust gap at a high-anxiety moment.
**Fix**: Consider reordering the aside above the form on mobile (e.g. `order-first lg:order-none`), and bump remove-button targets to at least `h-9 w-9` or add padding.
**Suggested command**: `$impeccable adapt cotizacion`

## Persona Red Flags

**Casey (mobile, residential)**: Scrolls past the entire form before seeing her cart confirmed carried over from `/productos`; the 32px remove button risks mis-taps; if submission fails, `mailto:` likely tries to app-switch her to Mail/Gmail mid-task, the worst possible interruption for her profile.

**Sam (screen-reader)**: No `aria-live` region announces `sending`→`success`/`error`; the spinner-only button during `sending` has no accessible label; the success card swap is silent. Sam may never learn the submission outcome.

**Alex (B2B contractor)**: Can't adjust quantities for a multi-window order without a round trip to `/productos`; "Tipo de proyecto" as a blank text field reads as residential-first rather than built for commercial intake; after submitting one quote, there's no way to submit a second for another building without a manual reload.

## Minor Observations

- `sending` state shows only `<Loader2 className="animate-spin" />` with no "Enviando..." text — loses both the visual affordance and the accessible label simultaneously.
- `clearCart()` fires silently on success — fine for a single quote, but a B2B user reusing the same cart for a near-identical second submission loses their selections without warning.
- The `<ul>` of cart items has no `aria-label`/`aria-labelledby` tying it to the adjacent "Tu cotización" heading.
- Hero subhead ("Completa el formulario y nuestro equipo se pondrá en contacto") could set a concrete expectation ("te contactamos en menos de 24 horas") earlier, before the user starts filling fields.

## Questions to Consider

1. `QuoteCartSummary.tsx` was clearly built *for* this page (its own doc comment says "se inserta encima del formulario de cotización") but was never wired in — was this an oversight during the Sanity migration, or was there a reason it was shelved?
2. For a B2B buyer comparing three suppliers, the 30 seconds after hitting "submit" are the real moment of truth — what would the success state look like if designed to win that window, rather than just confirm receipt?
3. If the form used `Input`/`Textarea` with zero extra classes (dropping `fieldClass` entirely), would it look *more* on-brand than the current hand-tuned version?
