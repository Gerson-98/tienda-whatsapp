---
target: inicio
total_score: 28
p0_count: 0
p1_count: 1
timestamp: 2026-06-12T16-20-07Z
slug: frontend-src-pages-homepage-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Form has sending/success/error states with `aria-live="polite"` on success and `role="alert"` on error; hero image has an `onError` fallback. |
| 2 | Match System / Real World | 4 | Spanish (es-GT), Guatemala-specific stats (18 departamentos), GT phone format, industry terms (oscilobatientes, PVC, aislamiento térmico/acústico). |
| 3 | User Control and Freedom | 3 | Clear nav paths (Ver Proyectos, Ver catálogo, Ver todos), "Enviar otro mensaje" after success. No in-page section nav, but typical for marketing pages. |
| 4 | Consistency and Standards | 3 | `rounded-2xl` now consistent across all cards/sections. Heading-pattern repetition (centered headline + subhead) across 3-4 back-half sections is a new, milder consistency concern. |
| 5 | Error Prevention | 3 | `required` + `type="email"`/`type="tel"` set. No inline email-format validation, no GT phone-format hint/mask. |
| 6 | Recognition Rather Than Recall | 3 | Icons + labels paired throughout; ProjectGallery hover overlay title is duplicated below the image, so it's safe on touch. |
| 7 | Flexibility and Efficiency | 2 | No quick-jump anchors or saved-state form persistence — acceptable for a marketing page but caps the score. |
| 8 | Aesthetic and Minimalist Design | 3 | Front half (Hero/Stats/WhyVentPro) is structurally distinct and confident; back half (Gallery→Services→Testimonials→CTA→Contact) converges on similar centered-block recipes. |
| 9 | Error Recovery | 2 | `mailto:` fallback on submit failure is good, but doesn't explain *why* it failed or offer a distinct retry vs. re-submit. |
| 10 | Help and Documentation | 2 | No FAQ/tooltips; the new `projectType` select has no microcopy explaining what "Comercial / desarrollo" implies for the visitor. |
| **Total** | | **28/40** | **Acceptable — up from 26/40** |

## Anti-Patterns Verdict

**LLM assessment**: The major AI-slop tells from the prior critique are gone — no gradient-text, no repeated eyebrow+grid template across 6 sections, no `01`-`06` ghost ordinals, no `border-l-4` side-stripe, no tripled hero stats. The page now reads as deliberately composed: a full-bleed asymmetric hero, a horizontal stat strip, a dark differentiator band that breaks rhythm, a portfolio grid, a 4+2 chunked services layout, testimonials, a CTA band, and contact. One residual soft tell remains: ProjectGallery, ServicesSection, and Testimonials (and ContactForm's left column) all converge on a "centered/left headline (`font-display font-black text-4xl md:text-5xl tracking-tighter`) + `text-muted-foreground mt-4 text-lg font-light` subhead" recipe — individually fine, but back-to-back it's a milder echo of the original repeated-template problem.

**Deterministic scan**: `detect.mjs --json` over all 10 homepage files returned `[]` (0 findings, exit code 0) — clean. This confirms the literal-pattern issues (gradient-text classes, eyebrow class string, `border-l-4`/`border-r-4`, `rounded-3xl`, ghost-ordinal `padStart` numerals) are fully removed; no false positives to report.

**Visual overlays**: Browser automation was unavailable in this session — no live overlay was generated. This review is source-code-based only.

## Overall Impression

A real, verifiable improvement (26 → 28/40). The five priority issues from the last critique are substantially addressed: the eyebrow/grid template is gone, all four gradient-text instances are now solid Deep Glass Blue or Golden Hour Amber, the hero stats are de-duplicated down to one canonical location (StatsSection), ServicesSection's ghost ordinals are removed and the 6-card grid is now a 4+2 chunked layout with a catalog link, and WhyVentPro now leads with the B2B-relevant "free technical visit" message plus a new `projectType` field on ContactForm. The biggest remaining opportunity: B2B disclosure is now present in messaging (WhyVentPro, ContactForm select) but not yet backed by conversion mechanics that let a contractor signal *scale* — and the page's back half has converged on a single section-header recipe that's the next rung down from the original problem.

## What's Working

1. **Hero stat de-duplication is clean and complete.** "+200 proyectos / 15+ años / 100%" now appear exactly once, in StatsSection — verified via grep, zero repetition in HeroCarousel's badge or mini-stats (which was removed).
2. **WhyVentPro reordering correctly elevates the B2B-relevant claim.** "Asesoría técnica sin costo" — explicitly scaled "desde una sola ventana hasta un desarrollo completo" — is now first of three, right after the hero, giving B2B visitors an early scale signal.
3. **ServicesSection's 4+2 restructure is a real structural fix.** Removing the `01-06` ghost ordinals and splitting into a 4-card "window types" row plus a 2-card "performance" row (with a "Ver catálogo completo" link to `/productos`) replaces an arbitrary 6-up grid with a more meaningful grouping and adds a discoverability path.

## Priority Issues

**[P1] ContactForm's B2B disclosure path is shallow — it doesn't qualify B2B leads by scale**
- **Why it matters**: PRODUCT.md frames B2B visitors as "evaluating capability, scale, and professionalism." The new `projectType` select (Residencial / Comercial — desarrollo / Otro) lets a visitor self-identify as commercial, but captures no scale (unit count, approximate window count, m², timeline). A contractor speccing 200 units and a homeowner replacing one window submit structurally identical forms — sales gets no triage signal, and the visitor gets no signal back that VentPro is equipped for large specs.
- **Fix**: Add a lightweight scale field (e.g., "Cantidad aproximada de ventanas/puertas": 1-5 / 6-20 / 20+, or a project-size select) and one line of reassurance microcopy for larger projects ("Para proyectos de mayor escala, un asesor técnico te contactará directamente").
- **Suggested command**: `$impeccable polish` (scoped to ContactForm.tsx, B2B qualification)

**[P2] Back half of the page converges on one section-header recipe**
- **Why it matters**: ProjectGallery, ServicesSection, and Testimonials all use a centered, `max-w-2xl mx-auto`, `font-display font-black text-4xl md:text-5xl tracking-tighter` headline + `text-muted-foreground mt-4 text-lg font-light` subhead, with ServicesSection and Testimonials now near-identical in overall structure (header block → staggered grid). This is the thinned residue of the original "six identical sections" finding — improved from 6 to ~3-4, but still a soft repetition DESIGN.md's "each section is a distinct room" framing would flag.
- **Fix**: Differentiate at least one of Testimonials or ServicesSection structurally — e.g., an asymmetric featured-quote layout for Testimonials (mirroring WhyVentPro's asymmetric header), or a left-aligned header for ServicesSection.
- **Suggested command**: `$impeccable quieter` or `$impeccable layout` (scoped to Testimonials.tsx / ServicesSection.tsx)

**[P2] CTASection and ContactForm stack two near-identical conversion asks back-to-back**
- **Why it matters**: CTASection ("Transforma tu espacio hoy mismo" → Solicitar cotización / Contactar) sits immediately before ContactForm ("Iniciemos tu proyecto" → full form) — both ask for the same fundamental action within one scroll. On mobile this reads as two consecutive "contact us" moments, and CTASection's "Contactar" button routes to `/contacto`, away from the on-page form that does the same job.
- **Fix**: Either remove CTASection from the homepage (let ContactForm's own headline serve as the singular peak-end CTA) or relocate CTASection earlier (e.g., between WhyVentPro and ProjectGallery) as a distinct mid-page moment.
- **Suggested command**: `$impeccable distill` (scoped to HomePage.tsx composition)

**[P3] ContactForm's error state relies on implicit `role="alert"` only, not an explicit `aria-live`**
- **Why it matters**: The success container now has explicit `role="status" aria-live="polite"`, but the error `<p>` has only `role="alert"` (which implies `aria-live="assertive"` in most AT/browsers but isn't explicit). This is an inconsistency between the two states — the original "aria-live" fix is half-applied.
- **Fix**: Add `aria-live="assertive"` explicitly alongside `role="alert"` on the error message for parity.
- **Suggested command**: `$impeccable polish` (scoped to ContactForm.tsx)

**[P3] ProjectGallery's fallback project titles remain residential-only**
- **Why it matters**: `FALLBACK_PROJECTS` (shown when Sanity has no projects yet) are all six residential/home-interior framed ("Residencia Moderna", "Sala de Estar Luminosa", "Exterior de Lujo", etc.). This is the default state a fresh deploy or sparsely-populated CMS shows — including to B2B prospects during a sales demo — undercutting the B2B disclosure work elsewhere on the page. Unchanged from the prior critique.
- **Fix**: Swap 1-2 fallback entries for commercial/development framing (e.g., "Fachada Comercial", "Torre Residencial — Fase 1", "Oficinas Corporativas").
- **Suggested command**: `$impeccable polish` (scoped to ProjectGallery.tsx fallback copy)

## Persona Red Flags

**Jordan (Confused First-Timer, residential)**: Orients well at the hero and stats. By ServicesSection ("Nuestras soluciones en PVC"), Jordan may not know PVC vs. aluminum — PRODUCT.md says VentPro fabricates both, but the homepage's services section is framed entirely around PVC, which could silently read as "not for me" if Jordan's project needs aluminum.

**Riley (Stress Tester)**: Submitting ContactForm on a network failure triggers the `mailto:` fallback via `window.location.href`. On a machine with no configured mail client (common on work laptops/Chromebooks), this either does nothing visible or opens an OS "choose an app" dialog with no in-page acknowledgment beyond the generic error text — and there's no distinct "retry the original submit" action separate from re-filling and re-submitting.

**Casey (Mobile User)**: ServicesSection's 4+2 desktop chunking (two visually distinct grid rows) collapses to a single uninterrupted column of 6 cards on mobile (`grid-cols-1` for both groups) — the chunking benefit from the layout fix is effectively desktop-only. Also, CTASection immediately followed by ContactForm means two consecutive "give us your info" moments in a single continuous mobile scroll.

**B2B Contractor/Architect (project-specific)**: WhyVentPro's reordering is the strongest B2B signal on the page (free technical visit, explicitly scaled to "un desarrollo completo"), correctly placed early. But this persona's next checkpoints — ProjectGallery (residential-only fallback content), ServicesSection ("PVC"-framed catalog with no commercial/spec framing), and ContactForm (projectType select with no scale field) — don't carry that signal forward. B2B disclosure is currently one strong sentence deep, not a full path.

## Minor Observations

- `StatsSection`'s small `bg-secondary` vertical accent bar above each of the 4 stats is a new minor decorative repetition of the amber accent (4x in a row) — small and not a border-stripe violation, but worth keeping rare per the Two-Color Rule.
- `line-clamp-2` on WhyVentPro and ServicesSection card titles is currently inert with the present copy (nothing wraps to 2 lines) — fine now, but if copy grows, titles could truncate without an ellipsis affordance.
- ServicesSection's 4+2 split (`services.slice(0,4)` / `services.slice(4)`) is positional, not semantic — reordering the `services` array could silently change which items group together. Naming the two groups explicitly would make the grouping self-documenting.

## Questions to Consider

- WhyVentPro now leads with the free technical visit specifically because it scales to full developments — does the contact form need to let a visitor say how big their project is, so the messaging and the mechanics match?
- If CTASection were removed entirely, would the page lose anything, or would ContactForm's own headline carry the peak-end moment alone with less redundancy?
- ServicesSection is framed entirely as "soluciones en PVC" — given VentPro also fabricates aluminum systems per PRODUCT.md, is the homepage quietly under-representing half the product line in a way that could cost larger-scale (often aluminum) leads?
