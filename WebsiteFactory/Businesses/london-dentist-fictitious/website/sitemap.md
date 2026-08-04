# Sitemap — Fictitious Dental Practice (test data)

**FICTIONAL TEST DATA.** Page list below is for the test build only.
Per `Skills/generate-sitemap.md`: start from `Templates/dentist-clinic.md`
and narrow to what research actually supports.

## Pages

| # | Path | Purpose | Primary CTA |
|---|------|---------|-------------|
| 1 | `/` | Homepage — Hero + AvailabilityStrip + brief services preview + ReviewsTicker + BookingCTA | Book a check-up |
| 2 | `/services` | Full services grid (all 11 services from research) — no invented pricing | Book a check-up |
| 3 | `/about` | Brief practice story + StaffBios (only if research finds real names) | Book a check-up |
| 4 | `/whitening` | Whitening services detail (in-chair + take-home) — anchor cosmetic page | Book a whitening consultation |
| 5 | `/emergency` | Emergency dental services — same-day policy + how to reach us | Call now |
| 6 | `/new-patients` | Family + new patient info — what to bring, kids' dentistry, insurance call-to-action | Book a new-patient consultation |
| 7 | `/faq` | Insurance, pain management, emergency policy | Book a check-up |
| 8 | `/contact` | Full ContactLocation — map, hours, phone, address (NAP must match GBP exactly) | Book a check-up |

## What was removed from the template's starting list

Per `Skills/generate-sitemap.md` step 2 — removed because research
doesn't support it:

- **A "Implants" page or section.** Template's page structure lists
  "implants" as an example service. Research shows the fictional
  practice does **not** offer implants. Page and mention are omitted.
  No implants card in the services grid, no implants FAQ entry.
- **A `Pricing` page.** The fictional practice publishes one anchor
  price (in-chair whitening "from £X") and nothing else. A dedicated
  pricing page built around invented numbers would violate
  `Standards/quality-standards.md` content integrity rules. Pricing
  mentions live on the individual service pages where the only
  published price exists (whitening).
- **A "Before/After" gallery.** Template's ethical note (and
  `Standards/quality-standards.md`) forbids stock before/after imagery
  presented as the practice's work. The fictional practice has no
  before/after on GBP or socials. The section is omitted entirely.
- **A video testimonials section.** Research shows no video testimonials.
  Section omitted.
- **A blog.** `research/keywords.md` flags this — without regular
  content, a sparse blog reads worse than no blog. Omitted.

## What was added

- **`/whitening` and `/emergency` pages.** Pulled from
  `research/keywords.md` per-page keyword map. Both target real
  search intent ("teeth whitening Camden", "emergency dentist
  Camden") that the homepage can't effectively capture alone.
- **`/new-patients` page.** Pulled from the keyword map. Research
  has insurance as a content gap — the page handles this with a
  "call us to confirm we accept your plan" line rather than inventing
  a list.

## Anchor sections on the homepage

The homepage also has these anchor-linked sections (`#availability`,
`#services`, `#reviews`, `#book`) so the AvailabilityStrip's signature
element flows naturally into the rest of the page.

## Emergency-accessible from every page

Per `Templates/dentist-clinic.md` CTA priority: "Emergency contact
should be reachable from every page if the practice offers it." The
NavbarFooter includes a phone-tap link to `+44 20 7946 0999` so the
emergency line is reachable from every route.
