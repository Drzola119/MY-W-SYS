# Pipeline Overview

Seven stages, each with a defined input and output. A business moves
through them in order; `Factory/queue.json.stage` tracks where it is.
Don't skip a stage's output just because it seems obvious — the file is
what lets the next session (possibly a different worktree, possibly a
different model) pick up cold.

| # | Stage | Reads | Writes | Skill(s) used |
|---|---|---|---|---|
| 01 | Intake | `business.md` as given by the person | `Businesses/<slug>/business.md` (completed) | — |
| 02 | Research | business.md, live web | `research/*.md` | — |
| 03 | Brand | research/*, `Design-Systems/` | `brand/*.md` | `analyze-brand`, `extract-colors-from-logo` |
| 04 | Content & SEO | research/*, brand/*, `Templates/<subvertical>.md` | `website/sitemap.md`, `website/copy/*.md`, `website/seo.md` | `generate-sitemap`, `generate-copy` |
| 05 | Build | everything above, `Components/`, `Standards/` | `website/src/` (actual code) | — |
| 06 | QA | website/src/, `Standards/quality-standards.md` | `website/qa-report.md` | `qa-review`, `accessibility-review` |
| 07 | Deploy | website/src/ (QA-passed) | `deployment/log.md` + live URL | — |

Full detail for each stage is in its own file: `01-intake.md` through
`07-deploy.md`.

## Stage gate rule

A business only advances in `Factory/queue.json` when its stage's output
file(s) exist and are non-empty. An agent should never mark a stage
complete and move on without having actually written the file.
