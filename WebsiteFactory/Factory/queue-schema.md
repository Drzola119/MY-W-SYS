# Queue Schema — Factory/queue.json

One entry per business. This file is the single source of truth for
"what stage is this business on and who owns it right now" — it exists
because plain folder-based status (`status.md` alone) doesn't give two
concurrent workers a safe way to avoid grabbing the same business. Keep
using `status.md` for human-readable narrative status; use this file for
machine-checkable ownership.

## Fields

| Field | Type | Notes |
|---|---|---|
| `slug` | string | Must match the `Businesses/<slug>/` folder name exactly |
| `business_name` | string | Display name |
| `subvertical` | string | Must match a file in `Templates/` |
| `city` | string | |
| `stage` | string | `intake` \| `research` \| `brand` \| `content-seo` \| `build` \| `qa` \| `deploy` \| `done` |
| `status` | string | `pending` \| `in_progress` \| `blocked` \| `complete` |
| `assigned_worktree` | string or null | e.g. `factory/london-dentist-brightsmile`, or null if unclaimed |
| `updated_at` | ISO 8601 timestamp | Update every time you touch this entry |
| `notes` | string | One line, optional — anything blocking or noteworthy |

## Claiming a business (avoiding double-work)

Before starting work on a `pending` entry:

1. Re-read the file (don't trust a stale copy from earlier in your
   session — another worker may have claimed it since).
2. If it's still `pending`, immediately write `status: "in_progress"`
   and your `assigned_worktree` name in the same edit, and save.
3. If you re-read and it's already `in_progress` with a different
   worktree, skip it — pick the next `pending` entry instead.

This is an advisory lock, not a database transaction — at 3–5 concurrent
workers the odds of a true race are low, but always re-read immediately
before claiming, never claim from a stale read.

## When blocked

Set `status: "blocked"` and put the reason in `notes` — e.g. "no logo
found, need client input" — rather than leaving it silently
`in_progress` with no progress. Add a line to `Memory/issues.md` if it
needs a person's attention.
