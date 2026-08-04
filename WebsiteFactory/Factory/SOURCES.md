# SOURCES — Source Inventory for Engine Content

> Tracks the provenance of every visual or copy template the engine
> uses. **No source has been entered here yet.** This file exists so
> that when the Motion-tier work begins (or any future work that
> brings third-party templates into the engine), the provenance check
> is a normal part of the workflow, not an afterthought.

## Why this file exists

The engine reaches for templates only when:

1. Pure-engine code doesn't yet produce the motion language a niche
   requires (Motion tier — see `Components/Motion/README.md`), OR
2. A specific component pattern has been approved for sourcing from a
   third party (rare; default is always pure engine).

In both cases the source must be:

- A site the operator owns, or
- A site the operator has an explicit license/usage-rights grant for.

The ground rules in `CLAUDE.md` are: "Never run any website-cloning
tool against a live third-party URL unless I've explicitly told you,
in that specific message, that I have confirmed usage rights for that
specific source."

This file is the record. Every entry below requires the user to have
greenlit it in the same message that added the row. A row without
explicit approval is a backstop, not a starting point.

## Entry format

```
## YYYY-MM-DD — <component or feature>
- **Source URL:** only if permitted for the purpose; otherwise "internal"
- **What was taken:** e.g. "the staggered chip-reveal sequence on
  AvailabilityStrip" — one bullet per asset, not whole pages
- **What was NOT taken:** copy, brand marks, photographs, staff names —
  none of those cross from a third party into a real business site
- **Approved by:** the user message timestamp + the user's words
  confirming usage rights
- **Where it lives:** path to the engineered version in the repo
```

Approval is required *per row*. A previous row's approval does not
carry to a new source.

## Open

(empty)
