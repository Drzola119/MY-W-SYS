# Status

- **Slug:** london-dentist-fictitious
- **Current stage:** qa
- **Status:** done (holding — deploy not authorized)
- **Last updated:** 2026-08-04
- **Last updated by:** Phase 3 session (Website Factory OS implementation)

## Stage checklist
- [x] 01 Intake
- [x] 02 Research
- [x] 03 Brand
- [x] 04 Content & SEO
- [x] 05 Build
- [x] 06 QA
- [ ] 07 Deploy — **not run.** Phase 3's ground rules stop before it.

## Notes for next session

**FICTIONAL TEST DATA.** Every fact in this business folder is invented;
nothing refers to a real business. Phase 3 stops before Stage 07 (Deploy)
per the original prompt's ground rules. The queue row is deliberately left
at `qa` so nothing picks this up for deploy automatically.

Stage 06 (QA) done — see `website/qa-report.md`. It found two real
defects and both were fixed and re-verified in the same pass:

1. **Footer rendered above the hero on all 8 pages.** `NavbarFooter`
   nested `<footer>` inside its `sticky top-0 <header>`, and the
   component renders before page content. Byte offsets in the
   prerendered HTML showed `<footer>` at 6592 and `<h1>` at 12492. The
   first pass's HTTP 200 + body-size checks could not see this.
2. **No `<main>` landmark anywhere.**

Both fixed by giving `NavbarFooter` a `children` prop and rendering
`<header>` / `<main>{children}</main>` / `<footer>` as siblings.
**This is a breaking API change** — pages must now wrap content in
`<NavbarFooter>…</NavbarFooter>` instead of self-closing it. The engine
component, its website copy, all 8 website pages, the engine's `/demo`
page, and `Components/NavbarFooter/spec.md` were all updated.

Also added an explicit two-tone `:focus-visible` ring to both
`globals.css` files (ink outline + surface inner ring) so focus stays
visible on the primary-colored CTA panels instead of depending on
browser defaults.

Re-verified after the fixes: `tsc --noEmit` 0, `eslint src/` 0,
`next build` all 8 pages static, all 8 routes 200 over `next start`,
and each page has exactly one `<main>`, one `<footer>`, one `<header>`,
one `<nav>`, one `<h1>` in the order main → h1 → footer. Engine also
re-linted and rebuilt clean.

### Left for real-domain QA (cannot be done in this environment)

- Lighthouse audit (Perf / A11y / Best Practices / SEO ≥ 95) — not
  installed here.
- CLS measurement.
- 375px layout in a real browser.
- Keyboard tab pass to confirm the focus ring renders as intended.
- Image QA — the build ships zero images, so lazy-loading, `<Image />`
  optimization, and alt text are all unverified by construction.

### Architecture note (engine is now an npm workspace package)

The website consumes `@factory/engine` as an npm workspace package
defined at the repo root — `Businesses/.../website/package.json`
declares `"@factory/engine": "file:../../../engine"`. After
`npm install` at the root, `node_modules/@factory/engine` is a symlink
to `engine/`. Edits to `engine/src/components/NavbarFooter.tsx`
propagate to every site on next dev/build with no copy step.

The earlier test-build workaround (copying `engine/src/components/`
into `Businesses/.../website/src/engine/components/` and importing as
`@/engine/components`) has been removed. All page imports read
`@factory/engine/components`.

### Motion tier

This build is **base tier only**. The Motion tier scaffolding
(`Components/Motion/README.md`) exists but is not implemented. No
cloning is approved.

Because it's a copy, engine edits do not propagate to the website
automatically. The `NavbarFooter` fix above had to be applied to the
engine and then re-copied — remember this if you touch the engine.

### Other build notes

- Brand tokens applied via globals.css (teal #2F5D5B, amber #C9923B)
- Brand fonts via next/font: Fraunces (display), Inter (body),
  JetBrains Mono (utility)
- JSON-LD Dentist schema on every page; `aggregateRating` intentionally
  omitted to avoid fabricating review data
- Staff bios are a placeholder card, not invented names (research gap)
- Lucide v1.28 dropped brand icons (Facebook/Instagram); using `Globe`
  for both — `aria-label` still says "Instagram"/"Facebook"
