# Component — Hero

The page-opening section, directly below `AvailabilityStrip`. Since the
strip already carries the "boldness" of the design (the signature
element), the Hero should stay disciplined — clear headline, one
supporting line, one primary CTA. Resist the urge to stack more motion
or more competing focal points on top of the strip.

## Props

- `headline`: string — specific to this business (from `website/copy/`),
  never generic ("Excellence in dental care" fails
  `Standards/quality-standards.md`)
- `subhead`: string
- `ctaLabel` / `onCtaClick`
- `ratingBadge`: optional `{ score, count }` — only pass if
  `research/google-profile.md` has a real rating; component omits the
  badge entirely if not provided, never shows a placeholder
- `image`: real photo from `research/` (storefront, team, space) —
  never stock photography if a real photo exists

## Motion

One orchestrated sequence on mount: headline → subhead → CTA → image,
staggered ~120ms apart, total under 600ms. This is the one place in the
page allowed a deliberate load animation — see
`Design-Systems/local-services/motion-and-signature.md`. Respects
`prefers-reduced-motion` (renders instantly, no stagger).
