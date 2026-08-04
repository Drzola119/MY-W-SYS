# QA Report — Fictitious Dental Practice (test data)

**FICTIONAL TEST DATA.** This is the test build's QA pass. Per
`Pipelines/06-qa.md`, every line item in `Standards/quality-standards.md`
gets an explicit pass/fail with evidence, not a summary judgment.

## Build status

- **Build:** ✅ Compiled successfully (`npx next build`).
- **Typecheck:** ✅ `npx tsc --noEmit` exit 0.
- **Lint:** ✅ `npx eslint src/` exit 0.
- **Routes (HTTP 200 from `npx next start`):** ✅ All 8 pages return
  200 with non-empty bodies.

| Route | Status | Body size |
|---|---|---|
| `/` | 200 | 96 590 b |
| `/services` | 200 | 34 854 b |
| `/about` | 200 | 24 878 b |
| `/whitening` | 200 | 26 421 b |
| `/emergency` | 200 | 24 152 b |
| `/new-patients` | 200 | 25 360 b |
| `/faq` | 200 | 36 014 b |
| `/contact` | 200 | 26 706 b |

Sizes are post-fix (re-measured after the `<main>` / footer
restructure below).

## Fixes applied during this QA pass

QA is a gate, so the two defects it found that were fixable here were
fixed and re-verified rather than being passed downstream.

### 1. Footer rendered at the top of every page (layout bug)

The first pass checked routes over HTTP and confirmed 200s and
non-empty bodies. That is not enough to catch a layout defect, and it
missed one. Byte-offset inspection of the prerendered HTML showed:

```
index.html:  <header> 4649   <nav> 4830   <footer> 6592   <h1> 12492
```

`<footer>` preceded `<h1>`. `NavbarFooter` nested the `<footer>`
*inside* its `sticky top-0` `<header>`, and the component renders
before page content, so the footer painted directly under the nav —
above the hero — on all 8 pages. HTTP status checks cannot see this.

**Fix:** `NavbarFooter` now takes `children` and renders
`<header>` / `<main>{children}</main>` / `<footer>` as siblings. All 8
website pages and the engine's `/demo` page wrap their content.

### 2. Missing `<main>` landmark

Fixed by the same change — `<main>` now wraps page content.

**Re-verified on all 8 prerendered pages:**

| Page | main | footer | header | nav | h1 | Order |
|---|---|---|---|---|---|---|
| `/` | 1 | 1 | 1 | 1 | 1 | main → h1 → footer |
| `/about` | 1 | 1 | 1 | 1 | 1 | main → h1 → footer |
| `/contact` | 1 | 1 | 1 | 1 | 1 | main → h1 → footer |
| `/emergency` | 1 | 1 | 1 | 1 | 1 | main → h1 → footer |
| `/faq` | 1 | 1 | 1 | 1 | 1 | main → h1 → footer |
| `/new-patients` | 1 | 1 | 1 | 1 | 1 | main → h1 → footer |
| `/services` | 1 | 1 | 1 | 1 | 1 | main → h1 → footer |
| `/whitening` | 1 | 1 | 1 | 1 | 1 | main → h1 → footer |

### 3. Focus states depended on browser defaults

Both `globals.css` files now define an explicit two-tone
`:focus-visible` ring:

```css
:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--color-surface);
}
```

Two-tone because a single primary-colored ring disappears on the
`tone="primary"` BookingCTA sections, which use `--color-primary` as
their background. The surface-colored inner ring separates the ink
outline from whatever is behind it, so the ring holds on both the
warm off-white body and the teal CTA panels. Verified present in the
shipped CSS bundle (`.next/static/chunks/42j6vrgh5o8n5.css`).

Applied to `engine/src/app/globals.css` as well so future builds
inherit it rather than re-deriving it.

**Re-verified after all three fixes:** `npx tsc --noEmit` exit 0,
`npx eslint src/` exit 0, `npx next build` all 8 pages static. Engine
also re-linted and rebuilt (`/demo` still static).

## Technical bar

### Lighthouse Performance ≥ 95, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95

**Status: NOT VERIFIED.**

Lighthouse is not installed in this environment. The build produces
all-static prerendered HTML (no client-side data fetching), uses
`next/font` for display-font FOIT/FOUT prevention, has no unoptimized
images, and ships CSS as a single hashed bundle. These traits are
consistent with high Lighthouse scores, but I cannot claim a 95+
without running the audit. **Flag for real-domain QA before deploy.**

### CLS < 0.1

**Status: LIKELY PASS, not measured.**

No images, no late-loading fonts (next/font applies `display: swap`),
no layout-shifting injects. The Hero has hidden→reveal transitions
but the layout reserves space (`md:grid-cols-2` grid). I expect low
CLS, but Lighthouse measurement is required to confirm.

### WCAG 2.1 AA — semantic HTML, real focus, real alt, real contrast

**Status: PASS** (after the fixes above).

**Verified:**

- ✅ Semantic HTML on the homepage: 1 `<header>`, 1 `<nav>`,
  1 `<main>`, 1 `<footer>`, 5 `<section>`, 15 `<article>` (review
  cards). No div-soup.
- ✅ Heading hierarchy on `/`: 1 H1, 4 H2, 4 H3 — no skips.
- ✅ `<main>` present on all 8 pages, exactly once, wrapping page
  content between `<header>` and `<footer>`.
- ✅ `role="status"` + `aria-live="polite"` on AvailabilityStrip
  (verified via grep).
- ✅ FAQ accordion: `aria-expanded`, `aria-controls`, `role="region"`,
  `aria-labelledby` all correct (verified via grep on `/faq`).
- ✅ Mobile nav disclosure: `aria-expanded` + `aria-controls`
  (verified).
- ✅ Color contrast (verified at token-definition time in
  `brand/colors.md`): `--color-ink` on `--color-surface` is 12.4:1
  (AAA); `--color-primary` on `--color-surface` is 5.8:1 (AA for
  body, AAA for large text); button text on `--color-primary` is
  5.8:1 (AA). The actual rendered contrast is the same — the engine
  uses inline `style={{ color: var(--color-ink) }}` only.
- ✅ `:focus-visible` — explicit two-tone ring defined in
  `globals.css`, verified in the shipped CSS bundle. No longer
  dependent on browser defaults or on Tailwind preflight behavior.

**Not verified:**

- ⚠️ Focus ring *rendering* at the viewport (the CSS is correct and
  shipped, but no browser ran here). A keyboard tab pass should still
  be part of real-domain QA.

### Semantic HTML — `<nav>`, `<main>`, `<section>`, proper heading order

**Status: PASS.**

- ✅ `<nav>` present (1 per page).
- ✅ `<main>` present (1 per page), wrapping page content.
- ✅ `<footer>` present (1 per page), after `<main>`.
- ✅ `<section>` present.
- ✅ Heading order verified.

### Mobile-first — test at 375px

**Status: PARTIAL PASS.**

The CSS uses `sm:`, `md:`, `lg:` Tailwind breakpoints. Default styles
target mobile. No real-headless test at 375px was run (no Playwright
installed in this environment). **Flag for real-browser QA before
deploy.**

### `prefers-reduced-motion` respected

**Status: PASS.**

- ✅ Global CSS rule in `globals.css`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- ✅ Verified in the served stylesheet bundle
  (`/_next/static/chunks/42j6vrgh5o8n5.css`).
- ✅ Motion-safe/motion-reduce Tailwind utilities used in components
  (`motion-safe:animate-pulse`, `motion-reduce:hidden`, etc.).
- ✅ FAQ chevron transition uses `motion-reduce:transition-none`.
- ✅ Hero load sequence applies `motion-reduce:transition-none
  motion-reduce:transform-none` to the reveal transition.

### Structured data — Dentist sub-type, NAP match

**Status: PASS.**

- ✅ `<script type="application/ld+json">` with full Dentist schema
  on every page.
- ✅ NAP matches `business.md` and `research/google-profile.md`:
  - name: `Fictitious Dental Practice`
  - street: `14 Fictitious Street`
  - postal: `NW1 0AA`
  - country: `GB`
  - phone: `+44 20 7946 0999`
- ✅ Opening hours: 6 of 7 day-of-week entries (Sunday closed is
  correctly omitted — `openingHoursSpecification` is for open days
  per schema.org).
- ✅ `priceRange: ££` — generic GBP symbol, not a fabricated price.
- ✅ `aggregateRating: { ratingValue: 4.7, reviewCount: 86,
  bestRating: 5, worstRating: 1 }` — same numbers the Hero
  `ratingBadge` displays. Sourced from `research/google-profile.md`.
  Earlier QA passes omitted this; the omission was overcautious —
  research-sourced ratings are *data*, not invention, so the structured-
  data claim and the visual badge should match.
- ✅ `medicalSpecialty: Dentistry`.
- ✅ `availableService` lists all 11 services from `research/services.md`.
- ✅ `sameAs` links to Instagram and Facebook (research handles).

### Lazy-load below-the-fold images; no image over 200KB

**Status: PASS (vacuously).**

The build ships zero images. The Hero, Services grid, etc. don't use
`<img>` tags. **No real images means no lazy-load requirement to
verify.** When real images are added (storefront, treatment rooms,
team photos), they must be optimized and lazy-loaded per the
standard.

## Content integrity

### No fabricated reviews, ratings, star counts, or testimonials

**Status: PASS.**

- ✅ ReviewsTicker shows 5 review snippets sourced from
  `research/google-profile.md`. Each is attributed (initial + surname
  initial). Date stamps ("2 weeks ago", "1 month ago", etc.) match
  research.
- ✅ Hero `ratingBadge` shows `{score: 4.7, count: 86}` — same numbers
  as research AND the JSON-LD `aggregateRating`. Visual and
  structured-data claims now agree.
- ✅ No before/after gallery. The whitening page explicitly states
  "we don't publish before/after imagery" — per
  `Templates/dentist-clinic.md` ethical note.
- ✅ No video testimonials.

### No fabricated credentials, awards, years-in-business, or staff names

**Status: PASS.**

- ✅ About page uses a placeholder card ("Team photos and bios
  coming soon. We'd rather show you real names than placeholders.")
  because research found 5 team photos but no names. The card invites
  the client to populate the section. We do NOT invent staff.
- ✅ No "years in practice" claim on any page.
- ✅ No awards or accreditations claimed.
- ✅ Invisalign card says "Provider-tier assessment at consultation"
  without claiming Diamond/Platinum tiers (research flagged tier as
  not published).

### No lorem ipsum

**Status: PASS.**

Every string on every page is sourced from `website/copy/*.md`, which
traces back to `research/*.md`.

### No generic gradient hero background

**Status: PASS.**

The hero uses solid `var(--color-surface)` (the warm off-white from
`brand/colors.md`). No gradient, no stock background.

### Copy must be specific to this business

**Status: PASS.**

Spot-check on homepage:
- "Calm, expert dental care in Camden." — real differentiator
  (traced to GBP review tone).
- "30 minutes" — real per `research/services.md`.
- "Fictitious Street" — real per `business.md`.
- "Same-day emergency slots most weekdays" — real per
  `research/services.md`.
- "Saturday mornings for emergencies" — real per GBP hours.

No "We are passionate about excellence" boilerplate.

## Design bar

### AvailabilityStrip is mandatory

**Status: PASS.**

`<AvailabilityStrip>` is rendered on every page (8/8). Each instance
sets `status="open"`, `acceptingNew`, and a context-appropriate CTA
label ("Book a check-up" on most pages, "Book a whitening
consultation" on /whitening, "Call us now" on /emergency).

### Color tokens derived from brand

**Status: PASS.**

`globals.css` defines the brand palette from `brand/colors.md`:

```css
--color-primary: #2f5d5b;  /* teal — fictional signage */
--color-accent: #c9923b;   /* amber */
--color-ink: #1a2624;
--color-surface: #f8f4ec;
--color-surface-alt: #efe7d6;
--color-border: #d9cfb8;
```

Verified present in the served CSS bundle. No reference palette
(`#1f4b49`, `#c9a227`) leaks into the production build.

### Motion is orchestrated

**Status: PASS.**

- ✅ Hero has a stagger reveal (rating → H1 → subhead → CTA → image)
  with `STAGGER_MS = 120` and `REVEAL_DURATION = "duration-500"` —
  total under 600ms per `Design-Systems/local-services/motion-and-signature.md`.
- ✅ ReviewsTicker uses `motion-safe:animate-[ticker_60s_linear_infinite]`
  with `motion-reduce:hidden` and a static grid fallback for
  `prefers-reduced-motion`.
- ✅ FAQ accordion chevron uses `transition-transform` with
  `motion-reduce:transition-none`.
- ✅ No parallax. No scroll-reveal on every section. Per
  `brand/animation.md` and the engineering standard.

## FAQs and content gaps

| Question | Status | Notes |
|---|---|---|
| Insurance list? | Resolved | "Call us to confirm" line on /new-patients, /faq. Per `research/google-profile.md` and `website/seo.md`. |
| Before/after photos? | Resolved | Section omitted entirely per Templates ethical note. Whitening page explicitly states we don't publish them. |
| Implant pricing? | Resolved | Implants not offered; service absent from grid AND schema. |
| 1 published price (in-chair whitening "From £X")? | Resolved | Card shows it; all other services list "Not published". Site has no fee-guide page. |
| Staff bios? | Resolved | Placeholder card on /about. No invented names. |
| Email address? | Resolved | Row omitted from contact page per `website/copy/contact.md` content gap flag. |
| Blog/news? | Resolved | Not built per `research/keywords.md` guidance. |
| `aggregateRating` in schema? | Resolved | Included — `{ratingValue: 4.7, reviewCount: 86}` from research/google-profile.md, matching the Hero badge. |

## Deviations from the spec

(Things that worked out differently than the spec implied. None are
gate failures; all are recorded so the next QA pass knows what to
expect.)

1. **Engine resolution.** The engine at `engine/src/` could not be
   imported as an external package via Next.js 16 + Turbopack. The
   build fell back to copying the engine's `src/components/` into
   `Businesses/london-dentist-fictitious/website/src/engine/`. The
   website imports as `@/engine/components`. This is a
   workspace-level limitation, not a content/spec deviation. Future
   builds should adopt a monorepo layout (workspace package).

2. **Lucide brand icons.** `lucide-react` v1.28 dropped brand icons
   (Facebook, Instagram). The footer uses `Globe` for both social
   links; the accessibility label (`aria-label`) still reads
   "Instagram" / "Facebook" so screen readers announce the platform
   correctly. Visual differentiation is lost but the data is intact.

3. **`<main>` and footer placement (FIXED).** `NavbarFooter` used to
   nest the `<footer>` inside its sticky `<header>`, which put the
   footer above the hero on every page, and no `<main>` existed. The
   component now takes `children` and renders header / main / footer
   as siblings. This changed the engine's public component API — any
   future build must pass page content as children rather than
   rendering `<NavbarFooter />` self-closed. See
   `Components/NavbarFooter/spec.md`.

4. **JSON-LD is duplicated.** `Schema.tsx` is rendered at the top of
   every page. Next.js does not deduplicate this across the layout.
   Per `website/seo.md` checklist, JSON-LD should be "once per page"
   — confirmed correct here. Not a deviation.

5. **No `<img>` tags.** The build has no raster images. This is
   intentional (no real photos to use), but means lazy-loading,
   <Image /> optimization, and image alt text are NOT verified at
   runtime. When real images are added, they must be re-QA'd.

## Stage-gate verdict

**PASS on everything measurable in this environment. One item
(Lighthouse) cannot be measured here and must be run against a real
domain before deploy.**

Both defects this pass found were fixed and re-verified rather than
deferred:

1. ~~Footer rendering above the hero~~ — **fixed**, order re-verified
   on all 8 prerendered pages.
2. ~~Missing `<main>` wrapper~~ — **fixed**, present once per page.
3. ~~Focus states left to browser defaults~~ — **fixed**, explicit
   two-tone `:focus-visible` ring shipped in the CSS bundle.

Remaining, and genuinely not verifiable without a browser:

- ⏳ **Lighthouse scores** (Perf / A11y / Best Practices / SEO ≥ 95) —
  Lighthouse is not installed here. Must run on the real domain.
- ⏳ **CLS measurement** — expected low (no images, `display: swap`
  fonts, reserved grid space), but not measured.
- ⏳ **375px mobile layout** — Tailwind breakpoints are mobile-first
  and correct in source; no headless browser available to confirm
  rendering.
- ⏳ **Focus ring rendering** — the CSS is correct and shipped; a
  keyboard tab pass should still confirm it visually.
- ⏳ **Real images** — none exist yet. When storefront/team photos are
  added, lazy-loading, `<Image />` optimization, and alt text all
  need re-QA.

The first three fixes closed the items that were blocking. What is
left is measurement, not defects — and the footer bug is a reminder
that HTTP 200s are not a layout check, so the browser pass above is
not a formality either.

## Acceptance

Per `Pipelines/06-qa.md`: "QA is a gate, not a formality — a business
does not move to deploy on a partial pass."

**This is a pass on every checkable item.** Content integrity is 100%
verified — no fabrication, no lorem ipsum, no generic gradient hero.
Semantic structure, ARIA, brand tokens, reduced-motion, and structured
data are all verified in the built output.

The original prompt's ground rules **explicitly stop Phase 3 before
Stage 07 (Deploy)**. This report is therefore not a deployment
authorization — it is the QA pass that would authorize deployment in a
future run, pending the Lighthouse audit and browser smoke test listed
above.
