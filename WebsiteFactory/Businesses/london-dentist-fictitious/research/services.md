# Services — Fictitious Dental Practice (test data)

**FICTIONAL TEST DATA.** Service list and any pricing are invented for
the test build. Per `Standards/quality-standards.md`, no service is
listed that the business doesn't actually offer, and no price appears
that wasn't found in research.

## Services actually published by the fictional business

Listed on the GBP and in-clinic printed menu (test data). These are
the only services Build should put on the website:

| Service | Description (paraphrased from research) | Price published? |
|---|---|---|
| New patient consultation | 30-min appointment including exam + treatment plan | No |
| Routine check-up | Exam + scale + polish | No |
| Hygiene-only clean | 30/45-min hygienist slot | No |
| Whitening (in-chair) | Single-visit whitening | Yes — "from £X" listed |
| Whitening (take-home) | Custom trays + gel, 2-week course | No |
| Composite bonding | Per-tooth | No |
| Crowns | Porcelain-fused and full ceramic options | No |
| Root canal treatment | Single-visit where possible | No |
| Emergency same-day | Trauma / pain / lost crown | No (varies by case) |
| Children's dentistry | NHS + private options | No |
| Invisalign / clear aligners | Provider-tier assessment at consultation | No |

## Pricing visibility

The fictional practice publishes **one** anchor price (in-chair
whitening "from £X") and otherwise publishes nothing. The Build
stage must respect this: do not invent prices for the other services.
For services without published pricing, the website can say "Pricing
on request" or simply omit the price field.

## Service categories (per Templates/dentist-clinic.md page structure)

The template lists: cleanings, whitening, implants, emergency — but
**the fictional practice does not offer implants**. Therefore the
website should not advertise implants. The template's category list is
a starting point; research narrows it to what's real.

## Content gaps (flag, do not invent)

- **No published prices for 9 of 11 services.** Build must omit price
  chips / priceRange fields for those services, not invent numbers.
- **Invisalign tier not published.** The business is "a provider"
  but doesn't state tier (e.g. "Diamond", "Platinum"). Build must
  not claim a tier.
- **No implants offered.** Page should not include them — even
  though the template lists them — because research shows the
  practice doesn't perform them.