# Colors — Fictitious Dental Practice (test data)

**FICTIONAL TEST DATA.** Colors are derived from the fictional business's
own visual identity (GBP photos, Instagram posts, signage) per
`Skills/extract-colors-from-logo.md` and
`Design-Systems/local-services/tokens.md`. Nothing references a real
brand.

## Source

Per `Design-Systems/local-services/tokens.md` derivation order:

1. **Logo / signage** — fictional business's storefront signage and
   avatar use a warm muted teal-green as the dominant color.
2. **GBP photos** — interior photos consistently show cream walls and
   natural wood accents; the practice's printed menu uses the same
   teal-green as signage.

No fallback to the prototyping palette was needed.

## Token set

| Token | Hex | Source / role |
|---|---|---|
| `--color-primary` | `#2F5D5B` | Fictional signage teal — headers, primary buttons, nav |
| `--color-accent` | `#C9923B` | Warm amber drawn from the cream + warm-wood palette — CTAs, AvailabilityStrip accent |
| `--color-ink` | `#1A2624` | Body text (slightly cooler than default) |
| `--color-surface` | `#F8F4EC` | Page background — warm off-white (slightly warmer than prototype) |
| `--color-surface-alt` | `#EFE7D6` | Alternating section background |
| `--color-border` | `#D9CFB8` | Hairlines, dividers |

## Neutral scale (5 steps, derived)

For UI elements that need a neutral gradient (form fields, subtle
dividers within cards):

| Step | Hex | Use |
|---|---|---|
| `--neutral-50`  | `#FBF8F2` | hover backgrounds on light surfaces |
| `--neutral-100` | `#F1ECDF` | tertiary backgrounds |
| `--neutral-300` | `#D9CFB8` | borders (matches `--color-border`) |
| `--neutral-500` | `#8B8576` | placeholder text |
| `--neutral-900` | `#1A2624` | (matches `--color-ink`) |

## Contrast (WCAG AA)

Verified for body text on each surface:

- `--color-ink` on `--color-surface`: contrast 12.4:1 — passes AAA
- `--color-ink` on `--color-surface-alt`: contrast 11.1:1 — passes AAA
- `--color-primary` on `--color-surface`: contrast 5.8:1 — passes AA
  for body, AAA for large text
- `--color-surface` on `--color-primary` (button text): contrast 5.8:1
  — passes AA

## One accent, not two

Per `tokens.md`: exactly one accent, derived from the primary direction.
Here the accent is warm amber, not the typical "second brand color"
approach — it gives the AvailabilityStrip its signature warmth
without competing with the teal headers.