# Stage 07 — Deploy

**Input:** QA-passed `website/src/`

**Output:** `Businesses/<slug>/deployment/log.md`, live URL

## Steps

1. Deploy per whatever hosting target this factory is configured for
   (not specified here — add your hosting-specific notes to this file
   once you've picked one, e.g. Vercel/Netlify/Cloudflare Pages).
2. Record the deploy: URL, timestamp, commit hash, in `log.md`.
3. Update `status.md` and `queue.json` (`stage: "done"`, `status:
   "complete"`).
4. Close out the git worktree for this business — see
   `Factory/worktree-workflow.md`.
