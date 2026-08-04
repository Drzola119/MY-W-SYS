# Component — ReviewsTicker

Horizontal auto-scrolling row of real Google review snippets (reviewer
initial, star rating, short quote, relative date). Volume-of-trust, not
curated-best-three. See `Design-Systems/local-services/motion-and-signature.md`.

Props: `reviews: [{ initial, name, rating, snippet, date }]` — sourced
only from `research/google-profile.md`. If fewer than 3 real reviews
exist, component still renders what's there; never pads with invented
ones. Pauses on hover/focus; respects `prefers-reduced-motion` (static
grid instead of scroll).
