# Worktree Workflow — Running Businesses in Parallel

## Repo layout (npm workspace)

The Website Factory monorepo is a single npm workspace:

```
WebsiteFactory/
  package.json         # root, workspaces: ["engine", "Businesses/*/website"]
  engine/              # @factory/engine — shared components, imported by all sites
  Businesses/<slug>/
    website/           # one Next.js app per business
    brand/  research/  # per-business artifacts
```

The engine is a **single source of truth** for shared components. A
business website consumes it via:

```json
// Businesses/<slug>/website/package.json
"dependencies": {
  "@factory/engine": "file:../../../engine",
  ...
}
```

After `npm install` at the root, `node_modules/@factory/engine` is a
symlink to `engine/`. Edits made in `engine/` take effect immediately
in every site that imports from `@factory/engine/components` — no
copy step, no rebuild. The NavbarFooter fix that QA caught in Phase
3 lives in exactly one file: `engine/src/components/NavbarFooter.tsx`.

**If you came from before the workspace conversion:** the old
workaround was to copy `engine/src/components/` into each business's
`website/src/engine/`. That copy is gone. Imports that used
`@/engine/components` now read `@factory/engine/components`. See
`Businesses/london-dentist-fictitious/status.md` for the migration
applied to the test business.

To run tasks in a workspace member:

```
# root:    npm install                                (boots whole workspace)
# engine:  npm --workspace engine run typecheck
# engine:  npm --workspace engine run build
# site:    npm --workspace Businesses/<slug>/website run dev
```

## Why worktrees

Each business should be worked in its own git worktree, not its own
Claude conversation window pointed at the same checkout — that avoids
file collisions when two businesses are mid-Build at once. Claude Code
has native worktree support; this maps directly onto one worktree per
`Businesses/<slug>/`.

## Starting a worker

```
git worktree add ../website-factory-<slug> factory/<slug>
cd ../website-factory-<slug>
claude
```

Then, in that session: *"Pick up Businesses/<slug> from Factory/queue.json
and continue from its current stage."* — the session reads `CLAUDE.md`,
finds the business, and proceeds; it doesn't need the full backstory
re-explained each time, that's the point of the filesystem holding the
context.

## Using the `factory` CLI

Day-to-day queue management is done through `scripts/factory.mjs`.
Run it from the repo root.

```
node scripts/factory.mjs list
node scripts/factory.mjs pickup
node scripts/factory.mjs claim <slug> [--worktree <name>]
node scripts/factory.mjs advance <slug>
node scripts/factory.mjs new <slug> <subvertical> <city> <business-name>
```

- `list` — print every business with stage, status, assigned worktree.
- `pickup` — claim the first `pending` business automatically.
- `claim <slug>` — claim a specific business; refuses if it's not in
  `pending` status (race-safety: a re-read of `queue.json` happens
  inside the same read-modify-write as the claim, so two workers
  can't both win). The default worktree name is `factory/<slug>`;
  pass `--worktree <name>` to override.
- `advance <slug>` — move a business from its current stage to the
  next. Refuses if the current stage's expected output files don't
  exist or are empty (see `/Pipelines/00-overview.md` "stage gate
  rule"). Resets status to `pending` and clears `assigned_worktree`.
- `new <slug> <subvertical> <city> <business-name>` — copy
  `Businesses/_template/` to `Businesses/<slug>/`, fill in
  `business.md` with the basics, and add an `intake` / `pending`
  row to `queue.json`. Refuses on bad slug or duplicate.

The CLI is advisory-locking only — see
`/Factory/queue-schema.md` "Claiming a business". Two workers running
`claim` at exactly the same moment can both succeed if the second
write happens before the first read completes; in practice at 3–5
concurrent workers the odds are negligible. If you ever need stronger
guarantees, wrap `claim` in a file lock (the OS-level `flock` on POSIX,
or `LockFileEx` on Windows).

## Tests

Race-safety and stage-gate behavior is covered by
`scripts/factory.test.mjs`. Run:

```
node --test scripts/factory.test.mjs
```

Each test runs in an isolated temp directory (the CLI respects a
`FACTORY_ROOT` env var), so the tests never touch the real queue.

## How many at once

Start with 3. Claude Code power users report 4–8 concurrent worktrees as
a realistic reliable ceiling per person before you become the bottleneck
on review — not Claude. Don't treat "run 100 at once" as the target
metric; treat "5 running continuously, each finishing in hours not days"
as the target — it gets you to 100 finished sites in about a week without
the coordination overhead and failure surface of true 100-way
concurrency. Scale worker count up only after you've run at least one
full batch of 5 end-to-end and the QA pass rate on the first attempt
(not after rework) is high.

## Closing out

After Stage 07 (Deploy):

```
cd ..
git worktree remove website-factory-<slug>
```

Merge `factory/<slug>` back to main once deployed and confirmed.

## Model routing per stage (optional)

If you're running some stages on a cheaper backend (e.g. MiniMax M3 via
an alternate `ANTHROPIC_BASE_URL`) instead of Claude, the natural split
is: cheaper model for mechanical stages (Research data-gathering,
Build's component assembly, routine QA checklist runs) and your best
available model for the stages where taste and judgment set the quality
ceiling — Brand (color/type/voice decisions) and the final QA sign-off.
Every stage still reads the same `Standards/` and `Design-Systems/`
files regardless of which model executes it — that consistency is what
the filesystem is for.