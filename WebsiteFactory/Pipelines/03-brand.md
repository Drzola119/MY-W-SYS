# Stage 03 — Brand

**Input:** `research/*.md`, `Design-Systems/local-services/`

**Output:** `Businesses/<slug>/brand/` — `colors.md`, `typography.md`,
`voice.md`, `animation.md`

## Steps

1. Run `Skills/extract-colors-from-logo.md` against whatever
   logo/photo material research found.
2. Write `colors.md`: derived token set (see
   `Design-Systems/local-services/tokens.md` for the derivation order
   and contrast requirements). Note explicitly if you fell back to the
   sub-vertical default palette and why.
3. Write `typography.md`: pick display/body pairing appropriate to this
   business's personality per the tokens doc and the relevant
   `Templates/<subvertical>.md` tone note.
4. Write `voice.md`: 3–5 concrete notes on how this specific business
   should sound, referencing `Design-Systems/local-services/voice-and-copy.md`.
5. Write `animation.md`: confirm the standard motion principles apply,
   or note a considered deviation (e.g. a boutique spa wants a more
   editorial feel) with justification.

Run `Skills/analyze-brand.md` as the umbrella check before marking this
stage done. Update `status.md` and `queue.json` (`stage: "content-seo"`).
