---
target: nosotros
total_score: 26
p0_count: 0
p1_count: 2
timestamp: 2026-06-13T03-56-05Z
slug: frontend-src-pages-aboutpage-tsx
---
# Critique: `/nosotros` (AboutPage.tsx)

**Target file**: `frontend/src/pages/AboutPage.tsx`
**Route**: `/nosotros` — the page where PRODUCT.md's "Brand Personality" should be most visible; for both residential and B2B visitors, this is where VentPro makes its case as a serious, 15-year manufacturer rather than a small shop.

## Design Health Score

| # | Heuristic | Score /4 | Key Finding |
|---|-----------|----------|-------------|
| 1 | Visibility of System Status | 3 | Static page, nothing dynamic to confuse — n/a baseline. |
| 2 | Match Between System & Real World | 3 | Natural Spanish copy, timeline reads as a real company history. |
| 3 | User Control and Freedom | 3 | Normal nav, closing CTA links to `/proyectos` and `/cotizacion`. |
| 4 | Consistency and Standards | 1 | This page is now the **only** place on the site with `text-gradient` (×2) and `rounded-3xl` — both already removed everywhere else (`/proyectos`, `/productos`, `/cotizacion` for the gradient; the just-deleted `CTASection.tsx` for the oversized CTA box). |
| 5 | Error Prevention | 3 | No forms — n/a. |
| 6 | Recognition Rather Than Recall | 3 | Clear section order: misión/visión → historia → pilares → CTA. |
| 7 | Flexibility and Efficiency of Use | 2 | Static informational page — adequate. |
| 8 | Aesthetic and Minimalist Design | 2 | The "pilares" section (icon-in-rounded-square + heading + paragraph ×3, with a lone uppercase-tracked eyebrow above the timeline) is the most template-feeling block on the entire site — exactly the pattern the rest of the site has been moving away from (see `WhyVentPro.tsx`'s asymmetric, glass-glow treatment of a similar "why us" idea). |
| 9 | Help Recognize/Diagnose/Recover from Errors | 3 | No forms — n/a. |
| 10 | Help and Documentation | 3 | n/a for a static page. |

**Total: 26/40 — Acceptable.** The page isn't broken — it's the last one carrying patterns the rest of the site has already shed. Because `/nosotros` is the brand-personality page, these leftovers are more visible here than they'd be elsewhere: a gradient-text headline, an oversized `rounded-3xl` CTA box nearly identical to the `CTASection.tsx` just deleted from the homepage, and a generic 3-card "pilares" grid with a lone eyebrow label — on the one page where PRODUCT.md asks for the most "architectural confidence" and brand voice.

## Anti-Patterns Verdict

**LLM assessment**: Structurally the page is fine (timeline, misión/visión, pilares, CTA is a sensible order for an About page). The slop signals are concentrated and specific: gradient-fill headline text, a single uppercase-tracked eyebrow ("Nuestra historia") that reads as leftover scaffolding now that no other page uses this pattern, a generic icon+heading+paragraph 3-card grid for "pilares" that's visually indistinguishable from a thousand template "why choose us" sections, and a closing CTA box that's the *exact shape* (`bg-primary`, rounded box, centered heading + paragraph + two pill buttons, dot-pattern background) of the `CTASection.tsx` component deleted from the homepage in the last commit.

**Deterministic scan**: `detect.mjs --json` on `AboutPage.tsx` returned `[]` (exit 0) — confirms the known gap where `text-gradient` and oversized `rounded-3xl` aren't caught automatically.

- **CONFIRMED — `text-gradient` (DESIGN.md ban + explicitly named "legacy candidate")**: line 107 (`<span className="text-gradient">15 años</span>`) and line 155 (`<span className="text-gradient">pilares</span>`). Grep across `frontend/src` confirms these are the **only two remaining instances** on the site.
- **CONFIRMED — `rounded-3xl` exceeds the 16px card ceiling**: line 185, the closing CTA box. Also the **only remaining instance** of `rounded-3xl` on the site.
- **CONFIRMED — eyebrow label**: line 103, `<span className="text-xs font-semibold uppercase tracking-widest text-secondary">Nuestra historia</span>` — a single instance, but it's now the *only* eyebrow label left after the homepage cleanup, making it read as an orphaned pattern rather than a deliberate brand kicker.

## Overall Impression

`/nosotros` tells a good story (misión/visión, a real 2010→2024 timeline, three values, a closing CTA) but its execution is one polish-pass behind the rest of the site. Every individual pattern flagged here — gradient text, the oversized CTA box, the generic icon-card grid with an eyebrow — was already identified and fixed on other pages (or deleted outright from the homepage). The fixes are small and proven; the opportunity is to bring the brand's most personality-driven page up to the same bar as `/productos`, `/proyectos`, and the homepage, and ideally give "pilares" a treatment with more voice than a stock 3-card grid.

## What's Working

1. **Real timeline with specific years and milestones (2010 → 2024)** — "Show the work, don't just claim it" done right; concrete history beats abstract claims.
2. **Misión/Visión as two distinct, role-differentiated cards** (Target/primary vs Eye/secondary) — only two cards with genuinely different content, not the "identical card grid" failure mode.
3. **Sensible information order** — story → values → action, a natural arc for a first-time visitor (Jordan) deciding whether to trust VentPro.

## Priority Issues

### [P1] `text-gradient` — banned pattern, last two instances on the site
**What**: Line 107 (`<span className="text-gradient">15 años</span>`) and line 155 (`<span className="text-gradient">pilares</span>`).
**Why it matters**: DESIGN.md explicitly bans gradient-fill headline text as "generic AI/template SaaS" and already names these two as legacy candidates. Every other page (`/proyectos`, `/productos`, `/cotizacion`) has had this fixed; `/nosotros` — the brand page — is the last holdout.
**Fix**: Replace both with `text-secondary` (the established replacement pattern).
**Suggested command**: `$impeccable polish nosotros`

### [P1] "Pilares" section reads as a generic template 3-card grid
**What**: Lines 152-181 — centered heading with `text-gradient`, then a `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` of identical cards: rounded icon chip, bold title, muted paragraph. Preceded by a lone uppercase-tracked eyebrow ("Nuestra historia") on the section above, now the only eyebrow left on the site.
**Why it matters**: `/nosotros` is the page PRODUCT.md says should carry the most "architectural confidence" and brand personality — but this section is the most templated block on the entire site, the kind of layout that appears on any small-business "why choose us" page. `WhyVentPro.tsx` already shows how this site does a "why us" section with voice: asymmetric header, stats row, `glass-glow`/`glass-sheen` cards on a `bg-primary` field with `LightRays`.
**Fix**: Remove the `text-gradient` heading and the orphaned eyebrow; give the three value cards a more distinctive treatment (varied backgrounds/sizes, or the `glass-sheen`/`glass-glow` treatment already established for feature cards) so this section doesn't read as interchangeable with any competitor's.
**Suggested command**: `$impeccable bolder nosotros`

### [P2] Closing CTA box duplicates the just-deleted `CTASection.tsx`, and exceeds the radius ceiling
**What**: Line 185, `<div className="bg-primary text-primary-foreground rounded-3xl p-12 text-center">` — same shape (bg-primary box, centered heading + paragraph + two pill buttons) as `CTASection.tsx`, which was deleted from the homepage in the last commit as cleanup. `rounded-3xl` (24px) also exceeds DESIGN.md's 16px card/section ceiling (`rounded-2xl` max) — now the only `rounded-3xl` left on the site.
**Why it matters**: The homepage was just cleaned up to remove this exact generic-CTA-box pattern; leaving an near-identical one on `/nosotros` undoes half of that consistency work and is visibly over-rounded next to every other card/section.
**Fix**: At minimum, change `rounded-3xl` → `rounded-2xl` to match the site's card ceiling. If the box itself feels like leftover scaffolding now that the homepage no longer has one, consider a lighter-weight closing treatment (e.g., text + buttons without the heavy color block) — but the radius fix is the non-negotiable part.
**Suggested command**: `$impeccable polish nosotros`

### [P2] Hero photography is nearly invisible
**What**: Lines 45-50 — the hero background image sits at `opacity-25` *underneath* a `bg-primary/90` overlay, leaving roughly ~7% of the image visible.
**Why it matters**: PRODUCT.md: "the project gallery, stats, and real photography carry more trust than copy. Let proof points and imagery lead." On the one page meant to put a human/real face on the company (workshop, team, installation), the photo is essentially erased in favor of a flat blue wash — the opposite of the brand register's imagery guidance.
**Fix**: Reduce the overlay to let more of the image read (e.g., `bg-primary/60` or a gradient overlay that's lighter at the top/center), or move to the `bg-black/65`-over-full-image treatment used on `/contacto` and `/cotizacion` for consistency.
**Suggested command**: `$impeccable typeset nosotros` (contrast-aware) or `$impeccable polish nosotros`

## Persona Red Flags

**Jordan (first-timer, evaluating trust)**: Lands on `/nosotros` to size up "is this a real company?" — the washed-out hero photo and generic "pilares" cards undercut the otherwise-good timeline; the page *tells* Jordan VentPro is established (2010, 200+ projects) but doesn't *show* it as confidently as `/proyectos` or the homepage now do.

**Riley (stress tester, comparing pages)**: Notices `/nosotros` still has gradient text and an over-rounded CTA box that look different from every other page — the kind of inconsistency a careful visitor (or a B2B buyer comparing this site to Schüco/Reynaers) would register as "not quite finished."

## Minor Observations

- The timeline's alternating left/right layout (`i % 2 === 0`) is a nice touch and doesn't need to change.
- Misión/Visión cards are appropriately differentiated (Target/primary vs Eye/secondary) — no action needed.
- `VALUES` array (Gem/Lightbulb/Users) has good copy; the issue is the card chrome, not the content.

## Questions to Consider

1. Now that `CTASection.tsx` is gone from the homepage, does `/nosotros` still need a heavy `bg-primary` CTA box at all, or would a lighter closing (heading + two text links, no color block) feel more consistent with the site's current restraint?
2. Should "pilares" get the full `WhyVentPro`-style treatment (stats row, glass-glow cards on `bg-primary`), or a lighter touch (just remove the gradient/eyebrow and vary the card styling)?
