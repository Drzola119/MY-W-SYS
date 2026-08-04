# Skill — Rebrand a Cloned Template

> Workflow only. Does **not** run a clone against any URL without an
> explicit per-message confirmation from the operator that they hold
> usage rights for the specific source. See `Factory/SOURCES.md` for
> the inventory and `CLAUDE.md` for the ground rule.

## When to use

Use this when a real business's `Pipelines/05-build.md` opts into the
Motion tier (see `Components/Motion/README.md`), AND pure-engine code
does not yet produce the motion language that niche needs, AND the
operator has approved a cloned source for the specific
component/motion being captured.

If the operator hasn't yet approved a source, this skill produces an
intake form, not a build. Don't fill the form yourself.

## Inputs

Before you start, you need:

- `Businesses/<slug>/brand/colors.md` — destination tokens (color,
  type, voice).
- `Businesses/<slug>/brand/animation.md` — destination motion tokens.
- `Businesses/<slug>/website/sitemap.md` — what pages the source must
  yield to (so you only take what fits the sitemap).
- A row in `Factory/SOURCES.md` for the specific source, with the
  operator's approval timestamp.
- The source's HTML/CSS/JS if you have it locally. If you're running
  a clone tool, the operator's confirmation is the gate. **Never run a
  clone tool silently.**

## What to capture from the source

Capture only the asset the approval names — most often a single motion
language or a single component layout. Concretely:

- CSS animations, transitions, easings, durations (extracted as
  values, not as the source's `class=` soup).
- Framer-motion / GSAP / Lottie equivalents if the source uses them
  (the engine uses `framer-motion`; if the source uses GSAP, port the
  motion, not the library).
- Layout structure for sections — but **copy, images, brand marks,
  and staff names never cross over.** They belong to the source.

What you must NOT copy across:

- Copy of any kind (headlines, subheads, button labels, body text,
  FAQ answers — none of it).
- Photography, stock or otherwise (the source's photos are the
  source's photos).
- Brand marks / logos.
- Names, faces, addresses, phone numbers, hours.
- The source's CSS variables or class system — re-derive on the
  destination's token system (`--color-*`, `--font-*`) per
  `brand/colors.md` and `brand/animation.md`.
- Tracking scripts, analytics tags, third-party widgets.

## Process

1. **Confirm the source is approved.** Search `Factory/SOURCES.md`
   for the URL. If no approved row exists, stop and ask the operator.
   The ground rule is "no cloning without explicit per-message
   confirmation"; an entry in `SOURCES.md` from a prior session does
   not carry.
2. **Clone to a scratch directory**, scoped to the asset you have
   rights to. **Never** clone into the repo root or
   `Businesses/<slug>/website/`. Use a temp dir outside the repo.
3. **Extract the motion language** as values, not as markup. Write
   the values to a temp file (`stages.txt` or similar) with the
   timing constants separated from the visual ones.
4. **Map to the destination token system.** Replace every
   source-side color/font/duration with a reference to the
   destination's `brand/colors.md` and `brand/animation.md`. The
   engineered component must be re-themed, not re-skinned.
5. **Implement in pure engine code** under
   `Components/Motion/<Name>/`. No traces of the source's class
   names, copy, or images should remain in the engineered output. If
   you find yourself wanting to keep a `<div class="...">` from the
   source, that's a sign you haven't re-engineered it.
6. **Spec the new component** in `Components/Motion/<Name>/spec.md`,
   cross-referencing `Design-Systems/local-services/motion-and-signature.md`.
7. **Verify** per the Standards: tsc 0, eslint 0, build clean, a11y
   unchanged from the base tier. Add the component to the engine
   barrel in `engine/src/index.ts`.
8. **Commit message** must name the source. Format:
   `Motion (<Component>): rebrand of <feature> from <source URL>`. No
   source URL in the commit message = do not commit.

## Common traps

- **"Approved for the design" ≠ approved for the copy.** If the
  source approval was for layout/motion only and the source's copy is
  distinctive, you must write fresh copy from
  `Businesses/<slug>/website/copy/`, not paraphrase the source.
- **A whole-page clone is rarely the right move.** The engine builds
  pages by composing components. A whole-page clone produces a
  one-off that doesn't compose. Capture the motion; rebuild the page.
- **Stock-ish elements are a smell.** If the source's signature is a
  full-bleed hero video, that is *not* pure engine work and should
  raise a separate conversation about licensing the video itself.
- **Test data warning.** Imagined reference templates (e.g.
  "the perfect dental site") are exactly the kind of thing that
  accidentally turns into a fabricated best-practice. If the source
  is hypothetical, stop and pick a real one with the operator's
  approval.

## Audit trail

Each `Components/Motion/<Name>/README.md` (when one is created)
should contain a single-line pointer back to the row in
`Factory/SOURCES.md` that approved the source. That way a future
auditor can trace any motion-tier asset back to its license and its
approving message.
