# Naming Conventions

## Business slugs

`<city>-<subvertical>-<business-name>`, all lowercase, hyphen-separated,
no special characters. Examples:

- `london-dentist-brightsmile`
- `manchester-gym-ironforge`
- `paris-salon-luxecoiffure`

This slug is used consistently as: the folder name under `Businesses/`,
the git branch/worktree name, and the key in `Factory/queue.json`. Never
let these three drift out of sync.

## Sub-verticals (must match a file in `Templates/`)

`dentist-clinic` · `gym-fitness` · `salon-spa` — add a new one only by
adding a new `Templates/<subvertical>.md` file first, not by improvising
inside a business folder.

## Git branches / worktrees

`factory/<slug>` — e.g. `factory/london-dentist-brightsmile`. See
`Factory/worktree-workflow.md`.

## Files inside a business folder

Keep the `_template/` structure exactly — don't add ad-hoc files at the
top level of a business folder. If a stage produces something that doesn't
fit an existing subfolder, that's a sign the template needs updating
(propose it in `Memory/decisions.md`), not a reason to freelance the
structure for one business.
