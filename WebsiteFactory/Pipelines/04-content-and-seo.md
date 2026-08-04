# Stage 04 — Content & SEO

**Input:** `research/*`, `brand/*`, `Templates/<subvertical>.md`

**Output:** `Businesses/<slug>/website/sitemap.md`,
`website/copy/*.md` (one file per page), `website/seo.md`

## Steps

1. Run `Skills/generate-sitemap.md` using the sub-vertical template's
   recommended page structure as the starting point — adjust only where
   research supports a specific reason to (e.g. no membership tiers
   published → don't build a pricing page around invented numbers).
2. Run `Skills/generate-copy.md` per page, using `brand/voice.md` and
   `Design-Systems/local-services/voice-and-copy.md`. Real specifics
   only — see `Standards/quality-standards.md` content-integrity rules.
3. Write `seo.md`: title tags, meta descriptions, target keyword per
   page (from `research/keywords.md`), and the correct `LocalBusiness`
   schema sub-type for this vertical.

Update `status.md` and `queue.json` (`stage: "build"`).
