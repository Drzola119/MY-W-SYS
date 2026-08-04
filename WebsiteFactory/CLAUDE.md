# Website Factory OS

You are operating inside the **Website Factory OS** — an operating system for
producing professional local-services websites (dentists, gyms, salons, med
spas, clinics) from minimal business inputs: a Google Business Profile and/or
social accounts.

You are not "a website builder agent." You are Claude, navigating this
filesystem. What role you play — researcher, brand analyst, developer, QA
reviewer — depends entirely on which stage of the pipeline you're currently
standing in. Nothing about you changes between stages except which files you
read.

## The one rule

**Never guess. Always route.** If you're not sure what to do next, or you've
landed somewhere that doesn't have the answer, come back to this file and
re-read the map below. Do not improvise a folder structure, invent a
convention, or assume — the answer is always in a file somewhere in this
repo. If it genuinely isn't, that's a gap to fix in `Memory/decisions.md`,
not a reason to invent silently.

## The map

| Folder | What it answers | Read it when |
|---|---|---|
| `Standards/` | What "professional" means, non-negotiably | Before any Build or QA stage |
| `Design-Systems/local-services/` | Color/type/motion/voice rules for this niche | Brand stage, Build stage |
| `Templates/` | Recommended pages, sections, CTAs per sub-vertical | Research stage, Build stage |
| `Components/` | Reusable, pre-built sections — assemble, don't invent | Build stage |
| `Pipelines/` | The 7-stage production sequence, one file per stage | Every stage — this is your task list |
| `Skills/` | Reusable instructions for a specific piece of work | Whenever a Pipeline stage tells you to |
| `Factory/queue.json` | Which businesses exist, what stage each is on, who owns them | First thing, every session |
| `Businesses/<slug>/` | Everything about one specific business | Whenever you're actively working a business |
| `Memory/` | Factory-wide decisions, open issues, handoff notes | End of session, or when something surprising happens |

## How a session actually goes

1. Read `Factory/queue.json`. Find the business you were pointed at, or the
   highest-priority `pending` one if you're picking your own work.
2. Read `Businesses/<slug>/status.md` to see exactly which stage it's on and
   what's already done.
3. Open `Pipelines/0X-<stage>.md` for that stage. It tells you what to read,
   what to produce, and where to write it.
4. Read whatever `Skills/*.md` that pipeline stage points you to.
5. Read `Design-Systems/local-services/` and the relevant `Templates/*.md`
   before making any design or content decision — don't invent brand or
   layout choices from scratch.
6. Do the work. Write outputs only into `Businesses/<slug>/...` — never
   modify `Standards/`, `Design-Systems/`, `Templates/`, `Components/`, or
   `Skills/` while working a business unless the task is explicitly to
   improve the system itself.
7. Update `Businesses/<slug>/status.md` and `Factory/queue.json` before you
   stop, even if the stage isn't finished. The next session (you, another
   worktree, another model) must be able to pick this up cold.
8. If you made a non-obvious call — a brand exception, a standard you bent,
   a workaround — write one line in `Businesses/<slug>/memory/decisions.md`.
   If it's a decision that should apply factory-wide, also add it to
   `Memory/decisions.md`.

## Starting a new business

Copy `Businesses/_template/` to `Businesses/<slug>/`, fill in `business.md`
with whatever the person gave you (Google Business Profile link, Instagram,
etc.), add an entry to `Factory/queue.json` with stage `intake`, status
`pending`, and hand it to Pipeline stage 01.

## Parallel work

Each business in `in_progress` should be owned by exactly one git worktree.
See `Factory/worktree-workflow.md` before starting a second concurrent
business. Never let two sessions write to the same `Businesses/<slug>/` at
once — check `Factory/queue.json` for `assigned_worktree` first.

## Model note

Some pipeline stages may run on a cheaper backend (e.g. MiniMax M3) instead
of Claude for cost reasons — that's a per-stage infrastructure choice, not
something you need to manage. What matters is that every stage still reads
`Standards/` and `Design-Systems/` before producing output, regardless of
which model is running it. Consistency comes from the files, not the model.
