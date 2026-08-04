# Stage 01 — Intake

**Input:** whatever the person gives you — a Google Business Profile link,
Instagram/Facebook handle, existing website, or just a name + city.

**Output:** `Businesses/<slug>/business.md`, fully filled in.

## Steps

1. If `Businesses/<slug>/` doesn't exist yet, copy it from
   `Businesses/_template/`.
2. Fill in every field in `business.md`: legal/trading name, sub-vertical
   (must match one of `Templates/*.md` — ask rather than guess if it's
   genuinely ambiguous), city, source links, phone, address, hours if
   visible.
3. Note explicitly which sub-vertical this is — it determines which
   `Templates/*.md` the later stages use.
4. Add or update the entry in `Factory/queue.json`: slug, stage
   `"research"`, status `"pending"`.
5. Update `Businesses/<slug>/status.md`.

Do not do any research or design work in this stage — intake is purely
"capture what we were given, cleanly."
