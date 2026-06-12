---
target: inicio
total_score: 28
p0_count: 1
p1_count: 1
p2_count: 2
timestamp: 2026-06-12T20-42-27Z
slug: frontend-src-pages-homepage-tsx
---
# Critique: "inicio" (HomePage.tsx — full homepage scroll)

**Score: 28/40 — Good** (third critique of this target; prior runs scored 26/40 and 28/40 on earlier states)

## Design Health Score

| # | Heuristic | Score /4 | Key Finding |
|---|-----------|----------|-------------|
| 1 | Visibility of System Status | 3 | `ProjectGallery` skeletons and `ContactForm`'s sending spinner give good feedback; `StatsSection`'s count-up animation has no real status implications. |
| 2 | Match Between System & Real World | 4 | Strong domain fit — Guatemala-specific copy, addresses, phone format, local product terminology (Oscilobatientes, Corredizas) throughout. |
| 3 | User Control and Freedom | 2 | `ContactForm.tsx` lets users send another message after success, but the 9-section single-page scroll has no anchor/jump navigation for visitors who want to skip straight to Contact or Services. |
| 4 | Consistency and Standards | 3 | Card radius (`rounded-2xl`) and button radius (`rounded-full`) are consistent system-wide. `ContactForm.tsx`'s `fieldClass` uses `rounded-xl` (16px) where DESIGN.md's input spec calls for `rounded-md` (10px) — a real deviation on the highest-stakes form. |
| 5 | Error Prevention | 2 | `ContactForm.tsx` uses native `required`/`type="email"`/`type="tel"` but no real-time inline validation before submit. |
| 6 | Recognition Rather Than Recall | 4 | The core CTA ("Cotizar"/"Cotización") is named identically everywhere (Hero, ProjectGallery cards, CTASection) — low recall burden. |
| 7 | Flexibility and Efficiency of Use | 2 | Single conversion path repeated 4+ times works for committed visitors, but there's no way for a returning/B2B visitor to skip the marketing narrative and jump to Services or Contact. |
| 8 | Aesthetic and Minimalist Design | 3 | Two-Color Rule holds and section padding (`py-20`–`py-28`) gives generous rhythm, but `StatsSection`'s decorative accent bars (`bg-secondary` 1×10 rectangles) and the 5x-repeated "colored single word" headline formula add low-grade visual noise. |
| 9 | Help Recognize/Diagnose/Recover from Errors | 3 | `ContactForm.tsx` has a genuinely good fallback (pre-filled `mailto:` on fetch failure, preserves user input). `ProjectGallery.tsx` makes a real fetch error visually identical to "zero projects" — both silently render nothing. |
| 10 | Help and Documentation | 2 | `ContactInfo.tsx` covers logistics (phone/email/hours/map) well, but there's no "what happens after you submit" reassurance anywhere on the page before the highest-stakes moment (the contact form). |

## Anti-Patterns Verdict

**LLM assessment**: The page has clearly been through prior anti-slop passes — no `.text-gradient`, no `01/02/03` ghost ordinals, no `rounded-3xl`+ on cards, and the obvious "eyebrow on every section" trope is mostly gone. What remains is subtler:
- **`StatsSection.tsx` is, structurally, the banned "hero-metric cliché"** — a 4-up number/label trust bar placed directly after the hero, which PRODUCT.md explicitly names as something that "None of this belongs on VentPro." The numbers are real, but the *presentation* (icon-less 4-stat row immediately post-hero) is the banned pattern itself.
- **Five sections share an identical "[plain words] + [single colored word] headline" formula** (Hero, ProjectGallery, ServicesSection, Testimonials, ContactForm) — a new templated "eyebrow" one level deeper than the literal banned pattern.
- Four consecutive sections (WhyVentPro → ProjectGallery → ServicesSection → Testimonials) are all fundamentally "grid of N similar cards," creating structural monotony even though each section's visual treatment differs.

**Deterministic scan** (`detect.mjs --json` across all 11 homepage files): `[]`, exit 0 — clean, no rule violations.

**Grep findings** (complementary signal the detector doesn't cover):
- **Eyebrow-family pattern, 3 instances**: `HeroCarousel.tsx:93` (`text-secondary text-sm font-semibold uppercase tracking-widest` — "Fabricación propia desde 2010"), `StatsSection.tsx:59` (`text-xs text-muted-foreground uppercase tracking-widest` stat labels), `ContactInfo.tsx:34` (`text-xs uppercase tracking-wider text-muted-foreground` contact-item labels). Three sections using the same small-uppercase-tracked-text treatment is a borderline repeat — not "every section," but a recognizable recurring device.
- **Ghost-card pattern, 1 instance**: `Testimonials.tsx:57` stacks `border border-border` AND `shadow-sm` on the same card — the only card on the homepage that combines both elevation cues (other cards use border-only or shadow-only). Minor since `shadow-sm` is a 2px blur, not the loud `shadow-xl`+ version the ban targets, but still an inconsistency in how "card" elevation is signaled across sections.
- `text-gradient` and `rounded-3xl`+: 0 instances in the 11 homepage files (both exist only in `AboutPage.tsx`, out of scope).
- No `01/02/03` ghost ordinals, no side-stripe borders (`StatsSection.tsx:50`'s `lg:border-r` is a 1px column divider, not a loud stripe accent).

**Visual overlays**: Browser visualization unavailable — no dev server running on 5173/3000/4173. No overlay/injection performed.

## Overall Impression

This homepage has clearly benefited from prior per-section fixes (ProjectGallery, cotizacion, etc. — no leftover eyebrows-everywhere, gradient text, or ordinals). The hero is genuinely strong, and the Hero↔WhyVentPro "glass/light" visual rhyme shows real design-system thinking. But the page hasn't yet been reviewed as a *cohesive scroll* — each section was fixed in isolation, and the composition-level issues are now the most visible problems: `StatsSection` is the textbook "hero-metric cliché" sitting in the page's second-best real estate, the bottom third stacks three consecutive "now contact us" beats with declining energy, and five section headlines share the exact same "colored single word" formula. None of these are per-component bugs — they're sequencing and repetition issues that only show up when you read the page top to bottom as one experience.

## What's Working

1. **Hero ↔ WhyVentPro visual rhyme** (`HeroCarousel.tsx` + `WhyVentPro.tsx`, both `bg-primary` + light-ray motif + glass surfaces) — a recurring brand texture rather than a one-off hero gimmick, making the "light through glass" identity feel systemic.
2. **ProjectGallery's resilience** (`ProjectGallery.tsx`) — typed skeleton loading, graceful empty handling, and reuse of the canonical `ProjectCard` — the kind of engineering discipline most homepage sections skip entirely.
3. **ContactForm's error fallback** (`ContactForm.tsx:64-73`) — a pre-filled `mailto:` link with the user's data already encoded when the API fails, so nobody loses their input.

## Priority Issues

### [P0] StatsSection is the banned "hero-metric cliché" in the page's second-best slot
**What**: `StatsSection.tsx` (4-up number/label trust bar with decorative `bg-secondary` accent bars at line 54) sits at `HomePage.tsx:19`, immediately after `HeroCarousel`.
**Why it matters**: PRODUCT.md explicitly names "hero-metric clichés" as something that "None of this belongs on VentPro" — this is the clearest violation of an explicit ban on the page. It's also the weakest emotional beat immediately following the strongest one, creating an instant letdown in the scroll, before the page has even told visitors what VentPro does.
**Fix**: Either fold the key stats into the hero itself (a subtle inline stat strip in the text column) or into `WhyVentPro` as supporting evidence for its differentiator claims (e.g., "Garantía real de por vida" + "200+ proyectos entregados"), removing the standalone section and its decorative accent bars.
**Suggested command**: `$impeccable layout inicio` (re-sequence/merge StatsSection) or `$impeccable distill inicio`

### [P1] Redundant conversion cascade: CTASection → ContactForm → ContactInfo
**What**: `HomePage.tsx:36-46` stacks three consecutive "contact us" sections — a CTA banner with 2 buttons, the actual form, then phone/email/map.
**Why it matters**: Violates "one thing at a time" — three "do something now" beats in a row, with declining energy, right when the visitor has the least patience left. The CTASection's job (re-motivate before the ask) is undermined because the very next section *is* the ask.
**Fix**: Fold `CTASection`'s copy into the `ContactForm` section's header/intro, and present `ContactInfo` as a sidebar alongside the form rather than a separate full-width section after it — collapsing 3 sections into 1-2 with one decisive closing beat.
**Suggested command**: `$impeccable layout inicio` or `$impeccable distill inicio`

### [P2] Five sections share an identical "[plain words] + [single colored word] headline" formula
**What**: `HeroCarousel.tsx:104-106`, `ProjectGallery.tsx:45`, `ServicesSection.tsx:92`, `Testimonials.tsx:40`, `ContactForm.tsx:81` all follow `<h2>...words... <span className="text-secondary|text-primary">word</span></h2>`.
**Why it matters**: This is the new "eyebrow" — repeated so consistently it reads as copy-paste scaffolding rather than considered per-section copywriting, the kind of "identical scaffolding repeated across sections" PRODUCT.md's anti-references target in spirit.
**Fix**: Vary the emphasis technique — let 2-3 sections keep the colored-word trick, but use other devices elsewhere (size/weight alone, an amber underline on a phrase, or a short kicker sentence below the H2).
**Suggested command**: `$impeccable typeset inicio`

### [P2] ProjectGallery fetch errors are visually identical to a genuinely empty gallery
**What**: `ProjectGallery.tsx` catches fetch errors, sets `projects` to `[]`, and `return null`s for any empty array — whether from a real Sanity error or zero published projects.
**Why it matters**: Per PRODUCT.md, the project gallery "carries more trust than copy" — silently losing this section in production (e.g., a Sanity outage) is a meaningful trust-signal loss that nobody would notice without checking `logger.error` output.
**Fix**: Distinguish error from empty — on a real fetch error, keep the section header visible with a link-out to `/proyectos` rather than removing the whole section.
**Suggested command**: `$impeccable harden inicio` (scoped to `ProjectGallery.tsx`)

### [P3] ContactForm input radius (`rounded-xl`) deviates from DESIGN.md's documented input spec (`rounded-md`)
**What**: `ContactForm.tsx`'s `fieldClass` uses `rounded-xl` (16px) for all inputs/select/textarea; DESIGN.md specifies `h-10, rounded-md` (10px) for inputs.
**Why it matters**: The contact form is the highest-stakes interaction on the page, and its inputs use a noticeably softer geometry than the documented system — worth checking against `/cotizacion`'s form for consistency.
**Fix**: Change `fieldClass` from `rounded-xl` to `rounded-md`.
**Suggested command**: `$impeccable polish inicio` (scoped to `ContactForm.tsx`)

## Persona Red Flags

**Jordan (first-time residential visitor)**: Hero lands well, Testimonials feel warm and residential-specific ("Mi apartamento es mucho más tranquilo"). But by the time Jordan reaches the high-stakes ContactForm, the only process reassurance on the entire page is the small line "Respondemos en menos de 24 horas" — no visible "what happens after you submit" (does a technician visit? is there a follow-up call?) anywhere, which matters for someone handing over contact details to a company they just discovered.

**Riley (stress tester)**: On narrow viewports, `StatsSection.tsx`'s `grid-cols-2 lg:grid-cols-4` becomes a 2x2 grid with `max-w-[120px]` labels — longer labels ("Departamentos atendidos") could wrap to 3 lines and create uneven card heights with no `items-stretch` enforcement visible. Also: `ContactForm.tsx`'s `status === "sending"` disables the submit button but has no timeout — if the fetch hangs, the user is stuck on a spinner indefinitely with no recovery short of a refresh (which loses their typed input, since `formData` isn't persisted).

**Casey (mobile / B2B contractor on the go)**: `ServicesSection.tsx`'s desktop chunking (4 "window products" cards in one grid, 2 "performance feature" cards in another) collapses to a single undifferentiated 6-card list on mobile — the visual grouping that distinguishes products from features disappears entirely below `sm:`. A mobile B2B visitor scrolling all 9 sections (each `py-20`–`py-28`) before reaching the form has no sticky/persistent "Cotizar" affordance if they decide to act early.

## Minor Observations

- `StatsSection.tsx:43` is the only section using `bg-accent/40` — worth confirming `accent` maps to a neutral and doesn't introduce a third brand color outside the Two-Color Rule.
- `ContactForm.tsx:96` uses `text-green-500` for the success checkmark — not part of DESIGN.md's documented palette (which defines only `alert` red for status). Consider formalizing a "success" token or using `text-primary`.
- `HeroCarousel.tsx:35-46` and `WhyVentPro.tsx:36-47` both render near-identical decorative SVG patterns at `opacity-[0.04]` — consistent with the "visual rhyme" strength, but worth confirming it's intentional rather than copy-paste cruft.
- `Testimonials.tsx:57` is the only card combining `border border-border` AND `shadow-sm` — other cards use border-only (WhyVentPro, ContactForm) or shadow-only (ServicesSection); a minor elevation-language inconsistency.
- `Testimonials.tsx` cards carry four distinct decorative elements (large quote mark, 5-star row, avatar initial circle, role/location line) for a 1-2 sentence testimonial — slightly more ornamentation than the content needs.

## Questions to Consider

1. If `StatsSection` were removed entirely, what would the page lose? Its numbers (200+, 15+, 100%, 18) already exist inside `WhyVentPro`'s copy and the hero badge — is this section earning its full-width real estate, or is it the "every site needs a stats bar" reflex PRODUCT.md is explicitly trying to avoid?
2. Why does the page's most specific, trust-building content (`WhyVentPro`'s "garantía de por vida," "15 días hábiles," "asesoría sin costo") sit in section 3, while the most generic content (a 4-number trust bar) occupies section 2 — the prime real estate right after the hero?
3. Were `CTASection`, `ContactForm`, and `ContactInfo` each fixed in isolation during prior critique passes without re-evaluating the combined sequence? Does the current section order in `HomePage.tsx` reflect a deliberate narrative arc, or is it closer to "every component we have, concatenated"?
