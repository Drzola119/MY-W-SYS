# Quality Standards

These are non-negotiable. Every business must pass every item before it can
move to `deploy` status. If a stage produces something that violates one of
these, that stage is not done — fix it, don't ship it.

## Technical bar

- Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95,
  SEO ≥ 95 (mobile, throttled)
- Cumulative Layout Shift < 0.1
- WCAG 2.1 AA minimum — real focus states, real alt text, real contrast
  ratios, not just automated-tool-passing
- Semantic HTML — `<nav>`, `<main>`, `<section>`, proper heading order.
  No div-soup.
- Mobile-first. Test at 375px before anything wider.
- `prefers-reduced-motion` respected on every animated element
- Structured data: `LocalBusiness` schema (or the correct sub-type —
  `Dentist`, `HealthClub`, `BeautySalon`) with accurate NAP
  (name/address/phone) matching the Google Business Profile exactly
- Lazy-load below-the-fold images; no unoptimized image over 200KB

## Content integrity — hard rules

- **Never fabricate reviews, ratings, star counts, or testimonials.** If
  research didn't find real ones, the section is omitted or marked as a
  placeholder for the client to fill in — it is never invented.
- **Never fabricate credentials, awards, years-in-business, or staff
  names** that weren't found in research.
- No lorem ipsum, ever, in anything that ships.
- No generic gradient hero background as a default. If a solid color or
  gradient is genuinely the right call for a specific brand, that's a
  choice made in the Brand stage and written down — not a fallback for
  not having anything better.
- Copy must be specific to this business (real services, real location,
  real hours). Generic "We are passionate about excellence" boilerplate
  fails QA.

## Design bar

- Every site uses the `AvailabilityStrip` signature component — see
  `Design-Systems/local-services/motion-and-signature.md`. This is what
  makes the niche's design system recognizable and is not optional.
- Color tokens are derived from the business's actual brand (logo, Google
  Business Profile photos, existing social presence) per
  `Design-Systems/local-services/tokens.md` — never the generic default
  palette in production, that palette exists for prototyping only.
- Motion is orchestrated (a deliberate load sequence, considered scroll
  reveals) not scattered (everything fading in on scroll for its own sake).

## Stage gate

A business cannot move to `deploy` in `Factory/queue.json` until
`Businesses/<slug>/website/qa-report.md` shows a pass on every item above,
signed off by the QA stage (`Pipelines/06-qa.md`).
