# Animation — Fictitious Dental Practice (test data)

**FICTIONAL TEST DATA.** This document confirms / qualifies the
standard motion principles from
`Design-Systems/local-services/motion-and-signature.md` for the
fictional practice.

## Standard principles (apply as-is)

- **AvailabilityStrip pulse:** standard status-dot pulse is fine
  here. Nothing in the fictional brand wants a different treatment.
- **Hero load sequence:** standard orchestrated sequence — headline
  → subhead → CTA → image, ~120ms stagger, under 600ms total.
- **prefers-reduced-motion:** fall back to instant appearance
  globally; never animate for users who've opted out.

## What is NOT changed

- No parallax. The fictional practice is calm and grounded — a
  parallax effect would read as ostentatious.
- No marquee on the Hero. The signature element (AvailabilityStrip)
  already carries the design's "moment" — adding another moving
  thing above the fold would compete with it.
- No scroll-reveal on every section. Per
  `motion-and-signature.md` "not every section needs one" — only
  the Hero gets an orchestrated sequence.

## One deliberate quiet add

The ReviewsTicker scrolls slowly (60s loop) — slightly slower than
the engine default would imply, on purpose. The fictional brand is
calm; a faster marquee reads as nervous. Confirmed via tone (GBP
reviews: "calm", "didn't feel rushed") and visual identity (warm,
rounded, soft palette).

## What was deliberately rejected

- A "smile reveal" scroll-triggered animation on the whitening
  card. Tempting for a dental site, but the prompt explicitly
  forbids motion on every section, and the hero + ticker already
  carry the page's motion budget.