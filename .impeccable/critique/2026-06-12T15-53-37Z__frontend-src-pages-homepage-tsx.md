---
target: inicio (HomePage.tsx)
total_score: 26
p0_count: 0
p1_count: 3
p2_count: 2
timestamp: 2026-06-12T15-53-37Z
slug: frontend-src-pages-homepage-tsx
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | ContactForm has clear sending/success/error states with a spinner; no global loading skeleton anywhere, but this is a minor gap |
| 2 | Match Between System and Real World | 3 | Spanish (es-GT) copy, GT phone format, real map embed — solid. But "+200 proyectos" / "15+ años" repeated three times across the first two screens reads as padding, not real-world info |
| 3 | User Control and Freedom | 3 | `HeroCarousel` renders a single static slide despite its name — no controls/escape from its animation, but it's also not a trap. ContactForm's "Enviar otro mensaje" gives a clean reset |
| 4 | Consistency and Standards | 2 | Six sections in a row (WhyVentPro, ProjectGallery, ServicesSection, Testimonials, ContactForm, ContactInfo) reuse the literal identical eyebrow class `text-xs font-semibold uppercase tracking-widest text-secondary`, contradicting DESIGN.md's "used sparingly, never stacked on every block" rule. Corner radii also drift (`rounded-2xl` cards vs. `rounded-3xl` CTASection) |
| 5 | Error Prevention | 3 | Correct input types (email/tel), phone explicitly marked "(opcional)" — good. No inline validation before submit |
| 6 | Recognition Rather Than Recall | 3 | "Cotizar ahora" is reinforced across header, hero, and CTASection — the primary action stays visible and consistent |
| 7 | Flexibility and Efficiency of Use | 2 | No skip-to-content or anchor-jump nav on a long single-page scroll; no fast path for B2B visitors with urgent specs |
| 8 | Aesthetic and Minimalist Design | 2 | The hero is restrained and confident, but everything after WhyVentPro stacks six near-identical sections with repeated stats, gradient headlines, and icon-chip card grids — high redundancy for a "minimal clutter" brief |
| 9 | Error Recovery (Help Users Recognize/Diagnose/Recover from Errors) | 3 | ContactForm explains its mailto fallback in plain Spanish — good. ProjectGallery's fetch failure falls back silently with no diagnose-level message (acceptable but not ideal) |
| 10 | Help and Documentation | 2 | No FAQ, no "how the quote process works," and ServicesSection names categories with no links to product detail pages |
| **Total** | | **26/40** | **Acceptable — significant improvements needed before users are happy** |

#### Anti-Patterns Verdict

**Does this look AI-generated?** Not at first glance — but it backslides past the fold.

**LLM assessment**: The hero is genuinely differentiated: an asymmetric diagonal-split image panel (`clip-path: polygon(...)`) with overlaid window-mullion divider lines that make the photo itself look like a window pane — a clever, on-brand detail that reinforces "light through glass" without inventing a new motif. But scroll past it and the page becomes **six consecutive sections** (WhyVentPro → ProjectGallery → ServicesSection → Testimonials → ContactForm → ContactInfo) that all share the exact same shape: a small uppercase tracked eyebrow, a display headline with one word in a blue→amber gradient, a centered intro paragraph, and a grid of near-identical cards. This is precisely the "tiny uppercase eyebrow on every section" anti-pattern DESIGN.md formalizes a rule against, and `text-gradient`/inline gradient-text — which DESIGN.md frames as a *legacy AboutPage-only* issue — has actually proliferated onto the home page in at least four places (ProjectGallery "recientes", Testimonials "clientes", ContactForm "proyecto", ServicesSection "PVC"). ServicesSection additionally renders giant pale `01`–`06` ordinals behind each of its 6 cards — its own code comment frames this as a "diferenciador vs. cards genéricas," but a giant background numeral per card is the numbered-scaffolding cliché at card scale. Layer on the hero badge's "+200 proyectos" stat, the hero's own mini-stats row, and a dedicated StatsSection repeating the same 200/15+/100% numbers — the hero-metric cliché, tripled. None of this is "obviously AI slop" on first impression (the hero earns real credit), but a design director scrolling the full page would flag the repetitive eyebrow+gradient+card rhythm within seconds as templated.

**Deterministic scan**: `node detect.mjs --json` against all 11 home-page-related files (HomePage.tsx + 9 composed components + the `MotionSection`/`FadeInSection` wrapper) exited **2** (findings present) with 2 hits:
- `side-tab` (Side-tab accent border) — `HeroCarousel.tsx:89`, `border-l-4 border-secondary` on the "+200 proyectos en Guatemala" badge.
- `gradient-text` (Gradient text) — `ServicesSection.tsx:66`, `bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent` on "PVC".

Both detector findings were independently corroborated by the LLM review (the same `border-l-4` badge and the same "PVC" gradient were flagged separately) — strong agreement, no false positives on either side. The detector's manual-review supplement (done by the same sub-agent after the regex scan) additionally surfaced what the LLM review caught more broadly: **6 sections share the literal identical eyebrow class string** `text-xs font-semibold uppercase tracking-widest text-secondary` at `WhyVentPro.tsx:55`, `ProjectGallery.tsx:92`, `ServicesSection.tsx:61`, `Testimonials.tsx:39`, `ContactForm.tsx:57`, `ContactInfo.tsx:23` — plus the `ServicesSection.tsx:88-93` per-card `01`–`06` ghost numerals (missed by the initial regex because the digits are generated via `String(i + 1).padStart(2, "0")`, not literal text). The detector did **not** flag the other three `text-gradient`/gradient-text instances the LLM review found (ProjectGallery, Testimonials, ContactForm) — likely because those use the `.text-gradient` CSS utility class rather than the inline `bg-gradient-to-r ... bg-clip-text` pattern the regex matches. This is a real gap in the detector's coverage for *this* codebase, not a false positive — both assessments agree the underlying issue (gradient text on the home page) is real and broader than the single hit reported.

**Visual overlays**: Not available for this run. No browser automation tool is exposed in this session and no dev server is running on standard ports, so live-server/script-injection was not attempted (fallback signal: "browser visualization unavailable: no browser automation tool exposed in this session, mutation/injection not attempted"). All findings above are source-code-based.

#### Overall Impression

The hero is the strongest, most on-brand moment on the page — confident, asymmetric, genuinely "Glass Pavilion." Everything below it is competent but **monotonous**: six sections in a row share one template (eyebrow → gradient-accented headline → paragraph → card grid), the same three proof-point numbers (200 proyectos / 15+ años / 100%) are said three times before the user reaches the actual product information, and a "legacy, AboutPage-only" anti-pattern (`text-gradient`) is actually the home page's most-repeated decorative device. The single biggest opportunity: **break the section-template monotony** — vary the rhythm (alternate layouts, retire the universal eyebrow, replace gradient-text with solid Deep Glass Blue/Golden Hour Amber per DESIGN.md) — and collapse the tripled stats into one well-placed moment. That alone would move this from "competent template" to "the architectural showroom" the brand brief describes.

#### What's Working

1. **The hero's asymmetric diagonal-split composition** (`HeroCarousel.tsx`) — the `clip-path` image panel with overlaid window-mullion divider lines makes the photo itself read as a window pane, reinforcing "light through glass" without adding a new visual motif. This is designed, not templated.
2. **`useGlassGlow` cursor-following radial glow** (`frontend/src/lib/useGlassGlow.ts`) — a real micro-interaction (tracks pointer position via `--mx`/`--my` CSS custom properties), correctly gated behind `prefers-reduced-motion`, and wired into both WhyVentPro and ServicesSection cards. Exactly the "Stripe-grade polish, accessibly gated" the brand brief calls for.
3. **ContactForm's graceful degradation** — on API failure it falls back to a pre-filled `mailto:` link and tells the user in Spanish what happened ("Hubo un error. Abrimos tu cliente de correo como alternativa."). A thoughtful safety net for a small-business backend that might be flaky.

#### Priority Issues

**[P1] Six consecutive sections share an identical "eyebrow + gradient headline + card grid" template**
- **Why it matters**: WhyVentPro, ProjectGallery, ServicesSection, Testimonials, ContactForm, and ContactInfo all reuse the literal class string `text-xs font-semibold uppercase tracking-widest text-secondary` for their eyebrow label, directly contradicting DESIGN.md's rule that eyebrows are "used sparingly per section, never stacked on every block." This is the single biggest driver of the "templated" feel and undermines the "architectural-grade, trustworthy" perception PRODUCT.md says is the success metric — B2B visitors comparing VentPro to Schüco/Reynaers-style sites will read this as "small business using a builder."
- **Fix**: Retire the universal eyebrow. Vary section openers — some sections lead with a strong headline alone, others with imagery, others with a different label treatment. Each section's shape should match its content, not a shared template.
- **Suggested command**: `$impeccable layout inicio`

**[P1] `text-gradient`/gradient-text has proliferated onto the home page in at least 4 places**
- **Why it matters**: DESIGN.md explicitly bans gradient-text headlines and frames `.text-gradient` as a *legacy AboutPage-only* anti-pattern slated for removal — but it's the home page's most-repeated decorative device (ProjectGallery "recientes", Testimonials "clientes", ContactForm "proyecto", and ServicesSection's inline `bg-gradient-to-r ... bg-clip-text` on "PVC", confirmed by the detector at `ServicesSection.tsx:66`). A blue→amber gradient also renders intermediate hues that are neither Deep Glass Blue nor Golden Hour Amber — a Two-Color Rule risk on top of the AI-slop tell.
- **Fix**: Replace every `text-gradient`/inline gradient-text instance on the home page with a solid Deep Glass Blue or Golden Hour Amber accent on the emphasized word, per DESIGN.md's Do's.
- **Suggested command**: `$impeccable quieter inicio`

**[P1] Hero proof-points ("+200 proyectos", "15+ años", "100%") are repeated three times across the first two screens**
- **Why it matters**: The hero badge, the hero's own mini-stats row, and the immediately-following StatsSection all restate the same three numbers — the "hero-metric cliché" PRODUCT.md bans, tripled. This burns the user's attention budget before WhyVentPro (differentiation) or ServicesSection (what VentPro actually makes) appears, and per the cognitive-load checklist it violates "single focus" (two consecutive "screens" say the same thing) and "one thing at a time" (proof is asserted three times before the product is explained once).
- **Fix**: Keep the stats in exactly one place — either the hero badge or StatsSection, not both — and use the freed-up space in the other location for product/value content (what VentPro makes, for whom).
- **Suggested command**: `$impeccable distill inicio`

**[P2] ServicesSection's 6-card grid with giant `01`–`06` ghost ordinals exceeds chunking limits and echoes numbered scaffolding**
- **Why it matters**: `ServicesSection.tsx:88-93` renders a `text-8xl` faint background numeral (`String(i + 1).padStart(2, "0")`) behind each of 6 service cards — its own code comment calls this a "diferenciador vs. cards genéricas," but visually it reproduces the banned 01/02/03 numbered-scaffolding pattern at card scale. 6 cards in one grid also exceeds the ≤4-item chunking guideline; a user scanning for "do they make the window type I need" has to parse 6 equally-weighted cards with no links to product detail pages (also the Help & Documentation gap, heuristic #10).
- **Fix**: Drop the ghost ordinals. Split the 6 services into two groups of 3 (or pair each with a "Ver detalles" link to `/productos`), so the grid reads as ≤4 items and connects to the product catalog.
- **Suggested command**: `$impeccable layout inicio`

**[P2] No B2B/contractor disclosure path on the home page**
- **Why it matters**: PRODUCT.md frames VentPro as serving residential AND B2B (contractors, architects, developers) under "one identity, two audiences" — but every home-page section speaks to residential framing ("tu hogar," "tu espacio"), the project gallery's fallback titles are all residential ("Residencia Moderna," "Hogar Confortable"), and testimonials are weighted 2:1 toward homeowners (one architect testimonial among three). The one project-scale trust signal — "Asesoría técnica sin costo... mide, recomienda y cotiza" in WhyVentPro — is buried as the third of three cards, and ContactForm's generic "Cuéntanos sobre tu proyecto..." textarea has no field for project type/scale, signaling the intake isn't built for B2B-scale inquiries.
- **Fix**: Surface the "free technical visit / project-scale quoting" message earlier (e.g., in or near the hero or ServicesSection), and add a project-type/scale option to ContactForm so B2B visitors see themselves reflected in the flow.
- **Suggested command**: `$impeccable clarify inicio`

#### Persona Red Flags

**Jordan (Confused First-Timer)**: Jordan scrolls past the strong hero into WhyVentPro, ProjectGallery, ServicesSection, and Testimonials — four sections that all *look* the same shape (eyebrow, gradient headline, card grid). Jordan may not register that these cover different topics at all, since the visual rhythm never changes; they could bounce after WhyVentPro thinking "I've seen what this site offers" without ever reaching ServicesSection (the actual product catalog) or the contact form. Seeing "+200 proyectos" / "15+ años" twice before a single window product is shown may also read as stat-padding rather than substance to a first-time visitor.

**Riley (Deliberate Stress Tester)**: Riley notices `HeroCarousel` implies multiple slides/rotation, but the component renders exactly one static image with no controls, indicators, or autoplay — Riley will ask "where's the carousel?" and may conclude the feature is unfinished. Riley will also check `prefers-reduced-motion` handling (correctly gated, good) but then test what happens if the Sanity-sourced hero image 404s — unlike `ProjectGallery` (which has local fallback data for failed fetches), the hero `<img>` has no `onError` fallback, so a broken Sanity image URL would break the first impression entirely.

**B2B Contractor/Architect (project-specific persona, from PRODUCT.md's "Users")**: This visitor is "evaluating capability, scale, and professionalism before reaching out for a spec quote." Scanning the home page, they find a residential-framed hero ("Transformamos tu espacio"), a gallery with generic residential fallback titles, a services list naming categories with no technical specs (U-values, profile systems, certifications, load ratings) or links to detail pages, and testimonials weighted toward homeowners. The only project-scale signal — the free technical-visit offer in WhyVentPro — is the third of three cards, easy to miss. Nothing distinguishes "4 windows for my house" from "200 units for a residential tower," and ContactForm's generic project textarea with no scale/timeline fields may lead this visitor to conclude VentPro isn't equipped for larger work.

#### Minor Observations

- `HeroCarousel.tsx:89` uses `border-l-4 border-secondary` on the hero badge — a side-stripe accent, the exact device DESIGN.md bans on cards/callouts (here on a badge, but the same visual tell; also the detector's only other finding besides the ServicesSection gradient).
- StatsSection's "18 departamentos atendidos" is a genuinely specific, non-generic stat — but it's weighted identically to the already-repeated 200/15+/100%, so the one piece of *new* information doesn't stand out.
- `CTASection` uses `rounded-3xl` while every other card/section uses `rounded-2xl` — a small inconsistency against DESIGN.md's `rounded-2xl` (16px) card-corner spec ("generous but not pill-like").
- ProjectGallery's fallback project titles ("Residencia Moderna," "Hogar Confortable," "Vistas al Balcón") read as placeholder/lorem-ipsum-ish; if Sanity has no projects yet, the home page ships looking unfinished rather than showcasing VentPro's 200+ real projects.
- ContactForm's success/error transition has no `aria-live` region — screen-reader users get no announcement that the form was replaced with a confirmation message (heuristic #1 gap for accessibility-dependent users).
- The Header's `CartBadge` next to "Cotizar ahora" on an aluminum/PVC window manufacturer's site reads as e-commerce-checkout framing, which may confuse visitors about whether they're "buying online" vs. requesting a custom quote.

#### Questions to Consider

- If `.text-gradient` is documented in DESIGN.md as a "legacy AboutPage-only anti-pattern," why is it (and an inline equivalent) the home page's most-repeated decorative device — was this an oversight, or did "polish later" quietly become "ship everywhere"?
- `HeroCarousel` renders a single static slide — is a real multi-slide carousel coming, or should this become a single hero panel (and be renamed) before the naming confuses the next person who touches it?
- Given PRODUCT.md's "one identity, two audiences" principle, what would it look like if the home page's *first* proof point were about project-scale capability rather than the third card in WhyVentPro — would that change how a contractor reads the whole page?
