# Component — AvailabilityStrip

The niche's signature element. See
`Design-Systems/local-services/motion-and-signature.md` for rationale —
this is not decorative, it answers the visitor's first question
("can I get in?") before they scroll.

## Props

- `status`: `"open" | "closed" | "closing-soon"`
- `nextAvailable`: string, human-readable, e.g. `"2:30pm today"` — omit
  the prop entirely if no real availability data exists; the component
  falls back to hours-only messaging, it never shows a placeholder.
- `acceptingNew`: boolean — shows "Accepting new patients/clients" when
  true and the sub-vertical supports that phrase (dentist/salon; a gym
  would use `ctaOverride` instead, e.g. "Free trial class today")
- `ctaOverride`: optional string to replace the default CTA label
- `onCtaClick`: handler — wire to the business's real booking link/phone

## Rules

- Never render invented urgency ("Only 2 spots left!") — status and
  nextAvailable must come from real data (`research/google-profile.md`
  hours, or a real booking system integration).
- Sits directly below the nav, above the Hero, full-width, on every
  page — not just the homepage.
- Respects `prefers-reduced-motion`: the pulse/glow on the status dot
  becomes a static dot.
