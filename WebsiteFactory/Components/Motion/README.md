# Motion (Premium Tier) — Scaffolding

> **No code yet.** This directory holds the **premium Motion tier** of
> the engine — a set of motion-rich components you opt into on top of
> the build-tier set. The base tier (everything in `Components/<Name>/`
> already and shipped via `@factory/engine`) is what every business
> gets by default. Motion is the upgrade. It is **not yet implemented**.
>
> No cloning, no third-party templates have been integrated to fill
> this tier — that work is gated on a separate, explicit instruction.
> See `Factory/SOURCES.md` and `Skills/rebrand-cloned-template.md` for
> the workflow once that gate opens.

## What's planned here

A small set of components that earn their place by giving the
niche-signature element (`AvailabilityStrip`) and the `Hero` a more
crafted motion language than the base tier provides. Candidates:

- **`AvailabilityStrip` (motion variant).** Same DOM and a11y as the
  base version, but with a staggered chip reveal and a "next
  available" pulse that loops once, then settles.
- **`Hero` (motion variant).** Title/subhead/CTA/image sequence with
  choreographed cross-fades and a slow pan on the image. Keeps the
  base tier's 600ms budget.
- **`BookingCTA` (motion variant).** The text grows from a stamped
  baseline; the button has a directional accent sweep on hover.
- **`ReviewsTicker` (motion variant).** A wider marquee with per-card
  scroll-snap on mobile (ticker disables on `prefers-reduced-motion`,
  same as the base).

Every motion-tier component must:

- Pass the base-tier's WCAG 2.1 AA contract (semantics, focus, contrast,
  reduced-motion behavior). The base component is the contract;
  motion is layered on top, never a substitute.
- Be `<`-themed from `brand/colors.md` and `brand/animation.md` only
  (no hardcoded durations, easings, or colors).
- Have its own `spec.md` documenting the motion language before code.
- Be measurable: stages, durations, easing names — all derived from a
  shared timing table so nothing is ad-hoc per component.

## What is NOT planned here

- **Not a tier for motion everywhere.** The base tier's intent is
  deliberate restraint. Motion-tier components get the spotlight;
  other components stay still.
- **Not a place for stock animation libraries bolted on.** If a
  custom easing or a spring from `framer-motion` is the right call,
  document why in the spec before adding it.
- **Not a backdoor for the Standard's "no scroll-reveal on every
  section" rule.** That's a hard floor across both tiers.

## How a business opts in

During `Pipelines/05-build.md`, after the base build is wired, the
build-stage session reads `brand/animation.md` and decides whether
this business earns Motion. The default is **base tier only**. The
opt-in path is documented in `Pipelines/05-build.md` (see the
"Motion tier" note added in Phase 4).

## Implementation status

| Component | Spec | Implementation |
|---|---|---|
| `AvailabilityStrip` (motion) | pending | not started |
| `Hero` (motion) | pending | not started |
| `BookingCTA` (motion) | pending | not started |
| `ReviewsTicker` (motion) | pending | not started |

Do not start any of these until:
1. A real business is selected to receive the motion tier, AND
2. The motion language for that niche is documented in
   `Design-Systems/local-services/motion-and-signature.md` or a new
   per-niche addendum, AND
3. A cloning source is named in `Factory/SOURCES.md` (only if the
   motion comes from a cloned template; otherwise pure-engine).
