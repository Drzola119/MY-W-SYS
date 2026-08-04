# Typography — Fictitious Dental Practice (test data)

**FICTIONAL TEST DATA.** Font choices are derived from what would suit
the fictional brand's personality — warm, family-friendly, calm. Per
`Design-Systems/local-services/tokens.md`, fonts are NOT the same
face on every project.

## Display — Fraunces (variable, opsz axis)

- **Rationale:** A warm humanist serif with a soft optical-size axis.
  The fictional practice's Instagram uses rounded, hand-feeling
  display type for headlines — Fraunces at opsz ~144 reads with
  the same warmth without being twee.
- **Tokens:** `--font-display: var(--font-fraunces)` (loaded via
  `next/font/google` in the engine).
- **Use:** H1, H2, and the large stat in the AvailabilityStrip.
  **Not** used for body or buttons.

## Body — Inter (variable)

- **Rationale:** Inter is a clean, highly-legible grotesk with
  strong x-height and excellent small-size rendering. Pairs cleanly
  with Fraunces (no shared DNA). Inter at 16px / 1.6 line-height
  matches the "calm, unhurried" tone noted in the GBP reviews.
- **Tokens:** `--font-body: var(--font-inter)`.
- **Use:** All body copy, button labels, nav items, FAQ answers.

## Utility — JetBrains Mono

- **Rationale:** A semi-condensed mono with a slightly geometric
  character — used at small sizes for hours, the rating count
  "(86 reviews)", and the scheduleChip labels. Per `tokens.md` the
  utility font should be "mono or semi-condensed" with "slightly
  letter-spaced" — JetBrains Mono at 12–13px with `tracking-wide`
  fits the spec.
- **Tokens:** `--font-utility: var(--font-jetbrains-mono)`.
- **Use:** Hours, day labels, small metadata chips.

## Type scale (1.25 ratio)

| Step | Size | Use |
|---|---|---|
| `display-1` | `text-5xl` (3rem) / `sm:text-6xl` | H1 — Hero headline |
| `display-2` | `text-4xl` / `sm:text-5xl` | H2 — section headings |
| `display-3` | `text-3xl` / `sm:text-4xl` | H3 — card headings (large sections only) |
| `body-lg` | `text-lg` (1.125rem) | Hero subhead |
| `body` | `text-base` (1rem) | Default body |
| `body-sm` | `text-sm` (0.875rem) | Card body, FAQ answers |
| `meta` | `text-xs` (0.75rem) | Hours, labels (with tracking-wide) |

## Line height & weight

- Display: line-height 1.15, weight 500 (semibold).
- Body: line-height 1.6, weight 400.
- Utility: line-height 1.3, weight 500, letter-spacing 0.05em.

## Why not the engine default

The engine's default body font (Geist) is fine — but per
`Design-Systems/local-services/tokens.md` "never default to the same
face on every project". Inter is chosen here because it pairs with
Fraunces without feeling generic, and because the fictional practice's
in-clinic printed materials use a clean grotesk (not a humanist sans,
not a slab) — Inter is the closest free match.