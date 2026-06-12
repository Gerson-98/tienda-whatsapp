---
target: productos
total_score: 22
p0_count: 0
p1_count: 2
timestamp: 2026-06-12T16-28-24Z
slug: frontend-src-pages-productspage-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Loading skeletons, error state, and empty state are all wired up — but `ProductCardSkeleton` (`rounded-lg`, `h-48`, centered text) doesn't match the real `ProductCard` shape (`rounded-2xl`, `aspect-square`, left-aligned), so the loading→loaded transition visibly reflows. |
| 2 | Match Between System and Real World | 3 | Spanish copy (es-GT) is natural throughout (search/sort/category labels); `Intl.NumberFormat("es-GT", { currency: "GTQ" })` is correctly applied. |
| 3 | User Control and Freedom | 2 | No "clear search" affordance, no "reset filters" action when category + search + sort combine to zero results, and quantity is only adjustable via repeated "Agregar otro" clicks. |
| 4 | Consistency and Standards | 1 | Two divergent `ProductCard` implementations exist: `ProductsPage.tsx`'s inline card (lines 42-90, `rounded-2xl`, `aspect-square`, "Agregar al carrito"/"Agregar otro", no image fallback) vs. `components/products/ProductCard.tsx` (different `Card` primitives, `h-64` image with `loading="lazy"` + `onError` fallback, "Cotizar"/"En cotización" copy, two-button footer). Same product, different presentation depending on where it's encountered. |
| 5 | Error Prevention | 2 | Generic error copy regardless of failure cause; add-to-cart has no quantity control or confirmation beyond a label change. |
| 6 | Recognition Rather Than Recall | 3 | Search, sort, and category chips are all visible up front — good. But no on-page confirmation when an item is added to cart (CartBadge lives in the Header only). |
| 7 | Flexibility and Efficiency | 2 | Single-select category filter, sort limited to name/price, no pagination, "load more," or visible result count — caps browsing at scale. |
| 8 | Aesthetic and Minimalist Design | 2 | Two named, explicit DESIGN.md violations: `.text-gradient` on the hero "catálogo" (line 167) and `rounded-3xl` on the bottom CTA card (line 257, cap is `rounded-2xl`). Both sit at the page's highest-attention moments (first and last impression). |
| 9 | Error Recovery | 3 | `ErrorState` gives a working "Reintentar" wired to `retryCount`, good recovery path — but error message doesn't differentiate failure cause. |
| 10 | Help and Documentation | 1 | No microcopy clarifying that "Agregar al carrito" feeds a quote request (not e-commerce checkout), and no link explaining the relationship to `/cotizacion`. |
| **Total** | | **22/40** | **Acceptable — needs work before it matches the homepage's polish level (28/40)** |

## Anti-Patterns Verdict

**LLM assessment**: The catalog's functional core (search, sort, category filter, loading/error/empty states, responsive grid) is solid and not templated — but the page is bookended by two of DESIGN.md's named, explicit bans. The hero title uses `.text-gradient` on "catálogo" (the exact pattern the homepage critique already removed from 4 other locations), and the closing CTA card uses `rounded-3xl` (the exact corner-radius violation already fixed in the homepage's `CTASection`). Both read as leftover/un-migrated template choices rather than deliberate composition, especially since the homepage has already been brought into line with these same rules. The deeper structural issue is the duplicated `ProductCard` — two components with different copy ("Agregar al carrito" vs. "Cotizar"), different image handling, and different layouts represent the same product depending on where it's rendered.

**Deterministic scan**: `detect.mjs --json` over `ProductsPage.tsx`, `ProductCard.tsx`, `ProductCardSkeleton.tsx`, `ErrorState.tsx`, `EmptyState.tsx`, and `QuoteCartSummary.tsx` returned `[]` (0 findings, exit code 0). **Note**: this is a discrepancy worth flagging — the detector did not catch the `.text-gradient` or `rounded-3xl` instances that Assessment A identified as explicit, named DESIGN.md violations. The detector appears tuned to different literal patterns (e.g., the eyebrow class string, ghost-ordinal `padStart`, `border-l-4`/`border-r-4`) than these two. Don't read the clean scan as "no violations" — cross-reference against DESIGN.md's specific bans manually for gradient-text and corner-radius.

**Visual overlays**: Browser automation was unavailable (no dev server reachable on ports 5173/3000/4173). This review is source-code-based only.

## Overall Impression

`/productos` has a genuinely functional catalog (filtering, sorting, state handling, GTQ formatting) but sits noticeably below the homepage's current polish level (22/40 vs. 28/40), largely because it carries forward two of the exact violations the homepage critique just fixed — gradient-text on a primary headline and an over-rounded CTA card — plus a structural inconsistency the homepage didn't have: a duplicated, divergent `ProductCard`. The catalog also underserves the B2B/contractor persona that the homepage now actively courts (WhyVentPro's reordered "free technical visit" + ContactForm's `projectType` field): no result count, single-category filtering, and no path to specify quantity at scale.

## What's Working

1. **Complete state coverage with a working retry.** Loading skeletons, a clean `ErrorState` with "Reintentar" wired to `retryCount`, and an `EmptyState` for zero results are all present — many catalogs skip one of these.
2. **Filter bar is genuinely useful and sticky.** Search input, sort dropdown, and a scrollable category-chip row are all visible simultaneously and stay reachable via `sticky top-20` while scrolling a long grid.
3. **Currency localization is correct.** `Intl.NumberFormat("es-GT", { style: "currency", currency: "GTQ" })` applied consistently — a small but trust-building detail for the local market.

## Priority Issues

**[P1] Two divergent `ProductCard` implementations represent the same product differently**
- **Why it matters**: `ProductsPage.tsx`'s inline card (lines 42-90) and `components/products/ProductCard.tsx` differ in image aspect ratio, corner radius, CTA copy ("Agregar al carrito"/"Agregar otro" vs. "Cotizar"/"En cotización"), button layout (one button vs. two), and image robustness (only the standalone version has `loading="lazy"` + `onError` fallback). A broken Sanity image on `/productos` shows a broken-image icon with no fallback. This is a direct Consistency & Standards gap (scored 1/4) and means accessibility/perf fixes made to one card don't propagate to the other.
- **Fix**: Consolidate on one canonical `ProductCard` (the standalone version has better image robustness), reconcile copy with `QuoteCartSummary`'s "tu cotización" framing (since "Agregar al carrito" implies checkout, but the flow is a quote request), and have `ProductsPage.tsx` import the shared component.
- **Suggested command**: `$impeccable clarify productos`

**[P1] `.text-gradient` on the hero title — same violation already removed from the homepage**
- **Why it matters**: Line 167 — `Nuestro <span className="text-gradient">catálogo</span>` uses the exact `bg-gradient-to-r ... bg-clip-text text-transparent` pattern DESIGN.md bans for new work, on the page's primary headline (first thing every visitor reads, residential or B2B). The homepage critique already removed 4 instances of this same pattern — this is the one place it's still live.
- **Fix**: Replace with solid `text-secondary` (Golden Hour Amber), matching the homepage's resolved pattern (e.g., ContactForm's "Iniciemos tu `<span className="text-secondary">proyecto</span>`").
- **Suggested command**: `$impeccable quieter productos`

**[P2] `rounded-3xl` on the bottom CTA card exceeds DESIGN.md's `rounded-2xl` cap**
- **Why it matters**: Line 257 — `bg-muted/50 rounded-3xl border border-border p-12 text-center`. The homepage's `CTASection` had this exact issue and was fixed to `rounded-2xl` in the last pass; this card is now the only `rounded-3xl` surface remaining, and it's also the page's closing/last-impression element.
- **Fix**: Change `rounded-3xl` → `rounded-2xl` to match the product cards (which already use `rounded-2xl`) and the homepage's CTASection.
- **Suggested command**: `$impeccable quieter productos`

**[P2] No result count, single-category filter, no pagination — underserves B2B/contractor browsing at scale**
- **Why it matters**: PRODUCT.md frames B2B visitors as evaluating "capability, scale, and professionalism." The catalog fetches all products in one call with no visible total ("Mostrando X productos"), category filtering is single-select (can't view "Ventanas + Puertas" together), and sort is limited to name/price. A contractor can't gauge catalog breadth at a glance, and there's no quantity input for bulk specification — only repeated "Agregar otro" clicks.
- **Fix**: Add a visible result count near the filter bar, consider multi-select category chips, and add a quantity stepper to each card (or at minimum in `QuoteCartSummary`).
- **Suggested command**: `$impeccable layout productos`

**[P3] Skeleton shape mismatches the real card, causing a layout reflow on load**
- **Why it matters**: `ProductCardSkeleton` uses `rounded-lg`, `h-48`, and centered `mx-auto` text blocks, while the real card uses `rounded-2xl`, `aspect-square`, and left-aligned `p-5` content with a category badge slot and full-width button. The loading→loaded transition will visibly "pop."
- **Fix**: Rebuild the skeleton to mirror the real card's structure exactly (same outer radius, same image aspect ratio, same content alignment and button placement).
- **Suggested command**: `$impeccable polish productos`

## Persona Red Flags

**Jordan (Confused First-Timer, residential)**: "Agregar al carrito" + a `ShoppingCart` icon implies e-commerce checkout, but the flow actually feeds `/cotizacion` (a quote request, per `QuoteCartSummary`'s "Productos en tu cotización" framing). Jordan may hesitate, expecting to pay immediately. After clicking, the only feedback is the button label flipping to "Agregar otro" — no toast or visible cart confirmation (CartBadge lives in the Header, easily scrolled past).

**Riley (Stress Tester)**: A search + category combination that yields zero results shows "Prueba con otra búsqueda o categoría" with no button to reset either filter — Riley must manually clear the search box and click "Todos" separately. All filter state (`searchTerm`, `activeCategory`, `sortBy`) is local `useState` with no URL persistence, so a refresh silently resets everything.

**Casey (Mobile User)**: The sticky filter bar stacks search + sort + category chips vertically on mobile (`flex-col md:flex-row`), potentially consuming a large sticky vertical slice and pushing the grid down. Category chips scroll horizontally with no visual affordance (fade/arrow) indicating more categories exist off-screen.

**B2B Contractor/Architect**: No spec/dimension detail per product — only name, a 2-line-clamped description, price, and category badge. No "ver detalles" or spec sheet link. Combined with the single-category filter and missing result count, a contractor can't assess catalog breadth or get past a surface-level browse — this page doesn't yet carry forward the B2B momentum the homepage built (WhyVentPro's free technical visit, ContactForm's `projectType` field).

## Minor Observations

- `product.description` is typed as `string | null` but rendered directly with no fallback (line 71-73) — a `null` description leaves an empty paragraph, producing inconsistent card heights in the grid.
- `formatPrice` is duplicated identically in three places (`ProductsPage.tsx`, `ProductCard.tsx`, `QuoteCartSummary.tsx`) — candidate for a shared utility.
- The inline `ProductCard`'s `<img>` has no `loading="lazy"`, no explicit `width`/`height`, and no `onError` fallback — on a 4-column grid this could affect initial load and shows a broken-image icon on a bad Sanity URL.
- Search has no debounce — fine at current catalog size, but worth noting alongside the "browsing at scale" concern.
- Category chips correctly follow the Two-Color Rule (`bg-primary text-primary-foreground` active state).

## Questions to Consider

- The homepage now signals "free technical visit, scales to full developments" early — should `/productos` carry that signal forward (e.g., a banner or note for larger orders), or is the catalog meant to stay purely residential-browsing in tone?
- Is `components/products/ProductCard.tsx` used anywhere currently (e.g., a featured-products section), or is it dead code from an earlier pass? Either way, the divergence needs resolving.
- Given "Agregar al carrito" actually means "add to quote request" — should the cart-style icon/copy be replaced with quote-request language across both `ProductCard` variants to avoid setting checkout expectations?
