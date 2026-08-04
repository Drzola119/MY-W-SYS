# Website Factory OS

An operating system (not a codebase) for producing professional local-services
websites — dentists, gyms, salons, med spas, clinics — from minimal business
input, using Claude Code (or any capable coding agent) navigating a filesystem
instead of a chain of specialized agents.

Built on the "filesystem as memory, agent as OS" methodology (Jake Van Cleef),
adapted into a deterministic production pipeline for this specific use case.

## Start here

Open `CLAUDE.md`. It's the router — it tells any agent dropped into this
repo what everything else means and where to go next. Everything in this
README is a shortcut; `CLAUDE.md` is the source of truth.

## Quick start — running your first business through

1. `cp -r Businesses/_template Businesses/<city>-<niche>-<name>`
   e.g. `Businesses/london-dentist-brightsmile`
2. Fill in `Businesses/<slug>/business.md` with whatever you have (Google
   Business Profile URL, Instagram/Facebook, phone, address).
3. Add a row for it in `Factory/queue.json`, stage `"intake"`, status
   `"pending"`.
4. Point Claude Code at this repo root and say: *"Pick up
   Businesses/<slug> and run it through the pipeline."*
5. Watch `Businesses/<slug>/status.md` — it's updated after every stage.

## What's actually in here

- `Standards/` — the non-negotiable quality bar (Lighthouse scores, WCAG,
  no fabricated content, etc.)
- `Design-Systems/local-services/` — the shared visual and motion language
  for this niche, including the one signature element every site uses
- `Templates/` — recommended structure per sub-vertical (dentist vs gym vs
  salon are not the same site)
- `Components/` — pre-built, reusable sections. The system assembles sites
  from these; it doesn't invent a new hero section every time.
- `Pipelines/` — the 7 production stages, each with a clear input/output
  contract
- `Skills/` — reusable task instructions the pipeline stages call into
- `Factory/` — the queue manifest and the parallel-worker (git worktree)
  workflow
- `Businesses/` — one folder per real business, `_template/` is the starter
- `Memory/` — factory-wide decisions, open issues, handoff notes

## Scaling philosophy

This is deliberately built to run 3–5 businesses concurrently first (one
git worktree each), not 100. Prove the pipeline holds the quality bar at
small scale before adding more concurrent workers — see
`Factory/worktree-workflow.md` for why, and for how to add more once you're
ready.
