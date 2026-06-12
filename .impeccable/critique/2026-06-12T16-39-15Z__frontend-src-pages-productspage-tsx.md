---
target: productos
total_score: 34
p0_count: 0
p1_count: 0
timestamp: 2026-06-12T16-39-15Z
slug: frontend-src-pages-productspage-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | "Agregar a cotización" now gives in-card feedback (button → outline + "En tu cotización" check) and the header `CartBadge` increments, but there's still no transient toast confirmation. |
| 2 | Match Between System and Real World | 4 | "Cotizar"/"Agregar a cotización" framing now matches the quote-request mental model throughout; no leftover e-commerce checkout language; GTQ formatting consistent via shared `formatPrice`. |
| 3 | User Control and Freedom | 4 | "Limpiar filtros" resets search + categories, "Todos" chip resets categories, `EmptyState` offers the same reset action, cart items can be decremented to 0 (auto-remove), removed individually, or cleared entirely. |
| 4 | Consistency and Standards | 4 | Single `ProductCard` used everywhere (P1 fix confirmed), skeleton now structurally mirrors the real card, `rounded-2xl` used consistently across cards/CTA (P2 fix confirmed). |
| 5 | Error Prevention | 3 | Image `onError` fallback prevents broken images; quantity stepper auto-removes at 0. But "Vaciar" (clear cart) has no confirmation — a single click destroys the whole quote list. |
| 6 | Recognition Rather Than Recall | 4 | Category chips, result count, and active-filter state (`aria-pressed`) are all always visible; cart contents are summarized inline. |
| 7 | Flexibility and Efficiency | 3 | Multi-select category chips + sort + search + quantity stepper (all P2 fixes confirmed) meaningfully improve power-user control. Filter state still isn't URL-persisted, and quantity stepper is ±1 taps only (no direct numeric entry for bulk B2B orders). |
| 8 | Aesthetic and Minimalist Design | 4 | `.text-gradient` removed from hero (now `text-secondary`), bottom CTA is `rounded-2xl` (both P1/P2 fixes confirmed via grep — zero matches for either string). Two-Color Rule holds throughout. |
| 9 | Error Recovery | 3 | `ErrorState`'s "Reintentar" and `EmptyState`'s "Limpiar filtros" (only shown when filters are active) both work correctly and are well-targeted. |
| 10 | Help and Documentation | 2 | Still no inline explanation of what "Cotizar" commits the user to; `ShoppingCart` icon in `CartBadge` slightly undercuts the quote-request framing established elsewhere. Unchanged from before — out of this fix's scope. |
| **Total** | | **34/40** | **Good — up from 22/40 (+12)** |

## Anti-Patterns Verdict

**LLM assessment**: The page no longer reads as templated. Both named DESIGN.md violations from the prior critique — `.text-gradient` on the hero "catálogo" and `rounded-3xl` on the bottom CTA — are confirmed fully removed (zero matches via grep in both `ProductsPage.tsx` and `ProductCard.tsx`). The Two-Color Rule holds throughout; no stray third brand color, no border-stripes, no ghost ordinals, no stacked eyebrows. The product grid itself remains a standard image-top/title/description/price/button card wall — a legitimate, functional e-commerce pattern that DESIGN.md doesn't ban, though it's now the most "generic" surface on the page by composition (not flagged as a priority issue).

**Deterministic scan**: `detect.mjs --json` over `ProductsPage.tsx`, `ProductCard.tsx`, `ProductCardSkeleton.tsx`, `QuoteCartSummary.tsx`, `ErrorState.tsx`, `EmptyState.tsx` returned `[]` (0 findings, exit code 0) — clean, consistent with the source-level grep confirmation.

**Visual overlays**: Browser automation unavailable (no dev server reachable on ports 5173/3000/4173). Source-code-based review only.

## Overall Impression

All five fixes from the prior critique landed correctly and verifiably: the single consolidated `ProductCard` (with "Cotizar"/"Agregar a cotización" copy, lazy-loaded images, `onError` fallback) replaced the divergent duplicate; the hero gradient and CTA over-rounding are gone; the result count, "Limpiar filtros", multi-select category chips with a "Todos" reset, and a quantity stepper (backed by a new `cartStore.updateQuantity` action that auto-removes at zero) are all wired correctly; and the skeleton now mirrors the real card's exact structure. The page moved from "Acceptable, significant improvements needed" (22/40) to solidly "Good" (34/40). Remaining gaps are smaller polish items — no toast on add-to-quote, no confirmation before clearing the entire cart, filter state not URL-persisted, and the quote-vs-cart mental model not yet fully explained — none of which are structural or DESIGN.md violations.

## What's Working

1. **The category filter bar reads as a real, responsive filter.** "Todos" + per-category toggle chips use `aria-pressed` correctly, active state follows the Two-Color Rule (`bg-primary text-primary-foreground`), and the live result count closes the feedback loop immediately below.
2. **The quantity stepper in `QuoteCartSummary` is a genuinely polished detail.** Rounded-full pill container, per-item `aria-label`s including the product name, and `tabular-nums` on quantity/totals so numbers don't jitter — a small Stripe-grade touch.
3. **The skeleton-to-real-card transition no longer causes layout jump.** Both share `rounded-2xl border border-border overflow-hidden flex flex-col`, `aspect-square` image area, and `p-5` content padding with matching internal rhythm.

## Priority Issues (New/Remaining)

**[P2] "Vaciar" (clear cart) has no confirmation and no undo**
- **Why it matters**: A single click on "Vaciar" (`QuoteCartSummary.tsx`) destroys the entire quote list with zero confirmation. A B2B/contractor user who's built a 10-20 line list while comparing specs could lose that work to one misclick, especially on mobile where the ghost button sits close to other tappable elements.
- **Fix**: Add a two-step "Vaciar" → "¿Confirmar?" inline toggle, or a brief undo toast ("Cotización vaciada — Deshacer") that restores the previous cart state for a few seconds.
- **Suggested command**: `$impeccable harden productos`

**[P2] No transient confirmation when adding a product to the quote**
- **Why it matters**: Clicking "Agregar a cotización" only changes that card's own button + the header `CartBadge` count, which is likely out of view on a long scroll or 4-column grid. The in-card state change (button variant swap + small "En tu cotización" line) is easy to miss, especially for a first-time visitor.
- **Fix**: Add a brief toast ("Agregado a tu cotización: {nombre}") — `sonner` pairs naturally with the shadcn/ui components already in use.
- **Suggested command**: `$impeccable delight productos`

**[P3] Filter/search/sort state is lost on refresh or shared link**
- **Why it matters**: A contractor who filters to one category and sorts by price, then refreshes or shares the URL with a colleague, loses all of that state — relevant to both Riley (stress tester) and the B2B persona.
- **Fix**: Sync `activeCategories`, `searchTerm`, `sortBy` to `URLSearchParams` via `useSearchParams` (already have `react-router-dom` imported).
- **Suggested command**: `$impeccable harden productos`

**[P3] Cart icon and "Subtotal estimado" still lean e-commerce despite "cotización" copy**
- **Why it matters**: The `ShoppingCart` icon (header `CartBadge`) plus "Subtotal estimado" in `QuoteCartSummary` could prime a residential visitor to expect a checkout/payment flow, even though the copy correctly says items go into a quote request message. The reassurance copy already exists (`QuoteCartSummary`'s "Estos productos se incluirán automáticamente en el mensaje de tu cotización") — the icon is the residual mismatch.
- **Fix**: Consider swapping `ShoppingCart` for a less checkout-coded icon (e.g., `ClipboardList` or `FileText`) in `CartBadge`.
- **Suggested command**: `$impeccable clarify productos`

## Persona Red Flags

**Jordan (Confused First-Timer)**: The `ShoppingCart` badge icon primes checkout expectations; reaching `/cotizacion` and finding a contact-style form is a small mismatch, softened by existing reassurance copy. Repeated clicks on "Agregar a cotización" correctly increment quantity, but with no toast, a first-timer may not realize each click adds another unit.

**Riley (Stress Tester)**: Cart state persists across refresh (zustand `persist`, good) but filter/search/sort state does not (local `useState`, no URL sync). "Vaciar" with no confirm is the clearest "one misclick destroys everything" red flag.

**Casey (Mobile User)**: Category chip row (`overflow-x-auto`) has no fade/edge hint that more categories exist off-screen. Quantity stepper buttons are `h-7 w-7` (28×28px), below the 44×44pt touch-target guideline — fiddly for repeated taps.

**B2B Contractor/Architect**: No bulk/numeric quantity entry (only ±1 taps) and no export/print of the quote list before submission — both real gaps for someone comparing against a bill of quantities, though outside this fix's scope. The core browsing experience (filters, result count, multi-category) is now meaningfully better for this persona than before.

## Minor Observations

- Price uses `text-primary` for emphasis (correct per Two-Color Rule); category badge uses `text-secondary` — good separation of the two brand colors by role.
- The "Todos" chip and category chips share identical active/inactive styling — clear and consistent, though "Todos" doesn't visually distinguish itself as a "reset" action vs. a regular filter option (low-impact).
- `ProductCardSkeleton` always renders 8 placeholders regardless of viewport — reads as 2 rows on desktop (4-col), a longer stack on mobile (1-col); not wrong, just worth noting for slow connections.
- `formatPrice` is now defined once in `lib/format.ts` and reused across `ProductCard`, `QuoteCartSummary`, and the cart message builder — duplication resolved.

## Questions to Consider

- Would a quiet inline checkmark animation on the "Agregar a cotización" button (rather than a toast) better fit the brand's "calm, purposeful motion" tone while still closing the feedback loop?
- Is the shopping-cart metaphor (icon + "Subtotal estimado") serving both audiences, or would a "lista de cotización" / clipboard metaphor with bulk entry better match how a contractor actually works?
- Now that filters/search/sort/quantity all work, is the next ceiling less about fixing what's broken and more about information architecture — e.g., a "compare" or "save for later" path for returning B2B visitors?
