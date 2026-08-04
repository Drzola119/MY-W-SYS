# Design Tokens — Local Services

## Rule: color and imagery come from the business, not from us

For every real business, primary/secondary color tokens are derived from
their actual brand — logo, Google Business Profile photos, existing social
presence. Never ship the default palette below to a real client; it exists
for prototyping the system itself and for the reference components in
`Components/`.

Derivation order (see `Skills/extract-colors-from-logo.md`):
1. Logo, if one exists and has clear brand color(s)
2. Most consistent color across their Google Business Profile / Instagram
   photos (storefront, uniforms, signage)
3. If neither gives a clean answer, fall back to the sub-vertical's default
   direction below — but note this explicitly in
   `Businesses/<slug>/brand/colors.md` as a fallback, not a discovery.

Whatever the source, always:
- Check contrast ratios (WCAG AA) before finalizing text-on-background pairs
- Derive exactly one accent from the primary, don't invent a second unrelated
  hue
- Generate a neutral scale (5–7 steps) alongside the brand color for
  backgrounds/borders/text — don't rely on pure black/white

## Reference/default palette (prototyping only)

Direction: clinical trust, not spa-cream, not corporate-navy-cliché.

| Token | Hex | Use |
|---|---|---|
| `--color-primary` | `#1F4B49` | deep teal — headers, primary buttons, nav |
| `--color-accent` | `#C9A227` | muted gold — CTAs, highlights, availability strip |
| `--color-ink` | `#16221F` | body text |
| `--color-surface` | `#F7F5F0` | page background — warm off-white, not stark |
| `--color-surface-alt` | `#EDE8DD` | alternating section background |
| `--color-border` | `#D8D2C4` | hairlines, dividers |

Explicitly avoid as a *default*: warm cream + terracotta/clay (#D97757 and
similar — reads as an AI-generated tell), near-black + single neon accent,
and broadsheet hairline-newspaper layouts. Any of these are fine if a
specific business's own brand genuinely calls for it — never as the
un-examined default.

## Typography

- Display: a warm, humanist serif with some weight — used for H1/H2 only,
  set large, generous line-height. Not the same face on every project；
  choose per-brand where the brand has strong personality (e.g. a
  boutique salon can take more character than a family dental clinic), and
  never default to the same face on every project.
- Body: a clean, highly-legible grotesk sans. Never the same family as
  display.
- Utility (hours, labels, form fields): a mono or semi-condensed sans at
  small size, slightly letter-spaced.
- Type scale: 1.25 ratio minimum between steps. Headlines are allowed to
  be large — local-service hero headlines that undersize the H1 read as
  templated.

## Spacing

8px base unit. Section vertical padding: 96–140px desktop, 56–72px
mobile. Never let sections touch with no breathing room — local-service
sites that feel "premium" almost always have more whitespace than the
client expects, not less.
