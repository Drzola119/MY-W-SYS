# Stage 05 — Build

**Input:** everything in `research/`, `brand/`, `website/sitemap.md`,
`website/copy/`, `website/seo.md`, plus `Components/`, `Standards/`

**Output:** `Businesses/<slug>/website/src/` — the actual site code

## Steps

1. Assemble from `Components/` first. Only write a new one-off
   component if the sitemap genuinely needs a section nothing in
   `Components/` covers — and if you do, consider whether it should be
   promoted back into `Components/` for reuse (log that thought in
   `Memory/decisions.md`).
2. Every component instance is themed from `brand/colors.md` and
   `brand/typography.md` — never hardcode the reference-palette values
   from `Design-Systems/local-services/tokens.md` directly into a real
   business's build.
3. `AvailabilityStrip` is mandatory (`Standards/quality-standards.md`).
4. Wire in real content from `website/copy/` — no lorem ipsum, no
   placeholder images where a real one exists in `research/`.
5. Implement structured data from `website/seo.md`.
6. Self-check against `Standards/quality-standards.md` technical bar
   before handing to QA — don't rely on the QA stage to catch things
   you already know are wrong.

Update `status.md` and `queue.json` (`stage: "qa"`).

## Motion tier (optional)

The engine has two tiers:

- **Base tier (default).** Assembled from `Components/<Name>/`,
  shipped via `@factory/engine`. Every business gets this.
- **Motion tier (opt-in).** A small set of motion-rich components
  staged in `Components/Motion/`. **Not implemented yet.** No
  businesses should be built with Motion yet, and no cloning of any
  third-party source has been approved to fill this tier.

If a business's `brand/animation.md` reads as "the base tier is too
quiet for this niche", the right next step is **not to reach for a
template**. The right next step is:

1. Confirm the operator wants the Motion tier on principle.
2. Decide whether the motion comes from pure-engine composition
   (extend `Components/Motion/` with code we own) or from a
   rebranded third-party source.
3. If rebranding a third party, follow `Skills/rebrand-cloned-template.md`
   and record the source in `Factory/SOURCES.md` with the
   operator's per-row approval.

Do not run a clone or scape tool against any URL without explicit
per-message confirmation, per `CLAUDE.md`. A future row in
`Factory/SOURCES.md` is a tracker, not a license.

