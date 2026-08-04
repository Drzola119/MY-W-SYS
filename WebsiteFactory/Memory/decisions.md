# Factory-Wide Decisions

Log of decisions that affect the system itself (Standards, Design-Systems,
Templates, Components, Pipelines, Skills) — not individual businesses.
One entry per decision, dated, short.

Format:
```
## YYYY-MM-DD — <short title>
What changed, and why. What it affects.
```

## 2026-08-04 — Factory OS scaffolded
Initial structure created: 7-stage pipeline, local-services design system
(dentist-clinic / gym-fitness / salon-spa sub-verticals), AvailabilityStrip
signature component, queue.json for concurrency-safe worker coordination.
Starting scale target: 3–5 concurrent worktrees, not 100.

## 2026-08-04 — Phase 1 engine bootstrap decisions

- **Single git repo at WebsiteFactory/** (engine/ is just another folder,
  not its own repo). Worktree workflow assumes one repo.
- **npm** as package manager (default; no deviation).
- **No shadcn/ui** for Phase 1. The 9 components are simple enough with
  plain Tailwind v4 + framer-motion + lucide-react; shadcn primitives
  add Radix overhead and the JSX references don't use them. Revisit in
  Phase 3 if a real per-business site genuinely needs an Accordion or
  Dialog primitive.
- **lucide-react pinned at v1.x** (the project's current major — they
  renumbered from 0.x in 2025). All icon imports (`Circle`, `Star`,
  `Calendar`, etc.) work as before.
- **`/demo` is a Client Component** because it passes Lucide icon
  function components as values into `ServicesGrid`. RSC disallows
  passing functions across the server→client boundary. Real per-business
  sites (Stage 05) will be Server Components and resolve icon *names*
  via a small lookup — TBD before Phase 3.
- **`react-hooks/set-state-in-effect` suppressed in two places**, both
  intentional: Hero's mount-trigger for the staggered reveal, and
  NavbarFooter's SSR-safe "today" computation (server vs. client can
  disagree on `new Date().getDay()`).
- **Display font = Fraunces** (Google Fonts, warm humanist serif —
  matches the spec's "warm, humanist serif with some weight"); body =
  Geist Sans; utility = Geist Mono.
- **Reference palette in globals.css** is the prototyping palette from
  `Design-Systems/local-services/tokens.md`. Real businesses in Phase 3
  override `--color-primary` etc. via their own `brand/colors.md`.

Quality gate verified at end of Phase 1: `npm run lint`, `npm run
typecheck`, `npm run build` all pass clean. Build prerenders /, /_not-
found, and /demo as static content.

## 2026-08-04 — Phase 2 factory CLI

- **scripts/factory.mjs** — Node ESM CLI, no deps (uses `node:fs`,
  `node:path`). Five commands: `list`, `pickup`, `claim`, `advance`,
  `new`. Race-safety via `modifyQueue()`, which re-reads `queue.json`
  inside the same read-modify-write as the write.
- **RefusalError pattern** — mutators `throw new RefusalError(reason)`
  to skip the write; `modifyQueue` catches and returns the reason.
  Cleaner than `{ refuse: ... }` return objects, which previously got
  confused with mutated queue payloads and caused a real bug (fixed
  during Phase 2 test runs).
- **Lazy path resolution** — paths are functions, not module-top
  constants, so the same imported module serves multiple tests with
  different `FACTORY_ROOT` values without re-importing.
- **node:test for tests** — built-in test runner, no Jest/Vitest dep.
  12 tests cover `new`, `claim`, `pickup`, `advance`, `list`, plus the
  race-safety and stage-gate refusals. All pass.
- **Test isolation** — each test creates a fresh temp dir under
  `os.tmpdir()` and copies a tiny slice of the real `_template/` into
  it so `copyTree` has something real to recurse over. The real queue
  and businesses tree are never touched.
- **Worktree doc updated** — `Factory/worktree-workflow.md` now points
  at the real commands (`node scripts/factory.mjs …`) and documents
  the test invocation.

## 2026-08-04 — Phase 3 test business (london-dentist-fictitious)

All content in `Businesses/london-dentist-fictitious/` is **fictional
test data**, labeled as such at the top of every file. It exists to
exercise Stages 02–06 end to end; Stage 07 (Deploy) was deliberately
not run.

- **Engine imported by copy, not by package.** Next.js 16 + Turbopack
  would not resolve files outside the project root — tsconfig paths,
  webpack aliases, `transpilePackages`, relative `../../` paths, and a
  `node_modules` symlink all failed. `engine/src/components/` is copied
  into `website/src/engine/components/` and imported as
  `@/engine/components`. This is a test-build workaround, not the
  production architecture: a real setup should use a monorepo/workspace
  package. Editing the engine does **not** propagate to a built site
  without re-running the copy.
- **Lucide brand icons are gone in v1.28.** Facebook/Instagram were
  removed from `lucide-react`. Footer socials use `Globe` for both;
  `aria-label` still reads "Instagram"/"Facebook" so screen readers
  announce the platform correctly. Visual differentiation is lost.
  Revisit if brand icons matter — they'd need to be inlined as SVG.
- **`aggregateRating` omitted from JSON-LD.** The Hero shows the
  research-sourced rating (4.7 / 86) as visual trust, but the
  structured data does not claim an aggregate rating, because we don't
  have verifiable review data. Visual display and structured-data
  claims are held to different bars on purpose.
- **Content gaps get an honest line, not an invention.** Insurance list
  → "call us to confirm"; staff names → a placeholder card inviting the
  client to supply real names; before/after imagery → section omitted
  entirely and the whitening page says so; email → row omitted. No
  fabricated substitutes anywhere.
- **NavbarFooter API changed during QA (breaking).** It used to nest
  `<footer>` inside its sticky `<header>` and was rendered self-closed,
  which put the footer above the hero on every page and left the site
  with no `<main>`. It now takes `children` and renders header / main /
  footer as siblings. Every page must wrap its content in
  `<NavbarFooter>…</NavbarFooter>`. See `Components/NavbarFooter/spec.md`.
- **Explicit `:focus-visible` ring in both globals.css files.** Two-tone
  (ink outline + surface inner ring) so it stays visible on the
  primary-colored CTA sections as well as the default surface. Browser
  defaults were not relied on.
- **QA lesson worth keeping: HTTP 200 is not a layout check.** The
  first QA pass verified status codes and body sizes and still missed
  a footer rendering at the top of all 8 pages. Element *order* in the
  prerendered HTML is now part of the QA checklist.
