# Motion & Signature — Local Services

## The signature element: Availability Strip

Every site in this niche shares one recognizable element:
`Components/AvailabilityStrip` — a thin, persistent horizontal band, high
in the page, showing real-time-feeling status: *"Open now · Next available
2:30pm"* or *"Closed · Opens tomorrow 9am"* or *"Accepting new patients."*

This is the signature on purpose, not decoration: the single question
every local-service visitor has is "can I actually get in?" Answering it
before they scroll is the entire point of the site existing. It's grounded
in the subject rather than borrowed from an unrelated template.

Content for the strip comes from real hours data (Google Business Profile)
plus, where available, real booking-system availability — never a fake
countdown timer or invented urgency ("Only 2 spots left!"). If live
availability data doesn't exist for this business, the strip shows hours
and open/closed status only. Do not fabricate scarcity.

## Reviews: ticker, not cherry-picked grid

Use `Components/ReviewsTicker` — a horizontal scroll of real Google review
snippets (reviewer initial, star rating, short quote), not a curated
3-card testimonial grid. The point is to signal *volume* of real trust,
not to hand-pick the three best lines. Never fabricate or paraphrase a
review into something it didn't say.

## Motion principles

- One orchestrated load sequence on the hero (headline, then availability
  strip, then CTA — staggered, not simultaneous, not more than ~600ms
  total). This is the one place to spend animation budget.
- Scroll reveals elsewhere should be simple and quiet (fade + 8–16px
  translate) — not every section needs one, and stacking multiple motion
  effects on one element reads as AI-generated.
- No parallax for parallax's sake. If a business's brief or vertical calls
  for something more elaborate (e.g. a boutique spa going for a more
  premium/editorial feel), that's a considered choice logged in
  `Businesses/<slug>/brand/animation.md`, not a system default.
- Always respect `prefers-reduced-motion`: fall back to instant appearance,
  no exceptions.
