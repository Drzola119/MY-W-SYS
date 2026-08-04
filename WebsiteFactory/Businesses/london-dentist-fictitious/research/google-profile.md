# Google Business Profile — Fictitious Dental Practice (test data)

**FICTIONAL TEST DATA.** None of the reviews, ratings, photos, or attributes
below refer to a real business. This file exists to exercise the
research-stage output shape — see `business.md` for the fictional-data
disclaimer.

## Hours (as displayed on GBP)

| Day      | Open  | Close |
|----------|-------|-------|
| Monday   | 09:00 | 18:00 |
| Tuesday  | 09:00 | 18:00 |
| Wednesday| 09:00 | 18:00 |
| Thursday | 09:00 | 20:00 |
| Friday   | 09:00 | 17:00 |
| Saturday | 10:00 | 14:00 |
| Sunday   | Closed| Closed |

## Categories

- Primary: **Dentist**
- Secondary: **Dental clinic**, **Cosmetic dentist**, **Emergency dental service**

## Attributes

- `Accessibility`: Wheelchair-accessible entrance, wheelchair-accessible toilet
- `Planning`: Appointment required
- `Payments`: NFC mobile payments, debit cards, credit cards; **no**
  mention of insurance accepted on the GBP itself (see content gap below)

## Star rating (test data)

- **Average:** 4.7
- **Count:** 86 (fictional)

## Real review snippets (test data, obviously fictional)

> "Switched to this practice earlier this year — clean, on-time, the
> hygienist actually explained what she was doing. Will be back." — **S. K.**, 5★, 2 weeks ago

> "Booked an emergency appointment on a Saturday morning after chipping
> a tooth. Seen within an hour, fixed same day. Couldn't have asked for
> more." — **M. R.**, 5★, 1 month ago

> "Friendly front desk, modern equipment. The dentist talked me through
> the X-ray findings without rushing. Reasonable pricing too." — **T. L.**, 4★, 2 months ago

> "Took my two kids for their first check-ups. They were nervous but the
> dentist was great with them — patient, used simple words, let them
> choose a sticker at the end." — **P. D.**, 5★, 3 months ago

> "Whitening results were better than I expected for the price. No
> pressure to upsell." — **A. N.**, 5★, 4 months ago

> "Wait was longer than I'd hoped (about 20 min past my appointment),
> but the actual visit was thorough and unhurried once I was in." — **J. W.**, 4★, 5 months ago

## Photo inventory (test data)

- **Storefront** — 3 photos (modern shopfront, signage, street view)
- **Interior / reception** — 4 photos (clean, modern, plant on desk)
- **Treatment rooms** — 3 photos (chair-side, X-ray machine, natural light)
- **Team** — 5 photos (smiling staff, casual clinic wear)
- **Before/after (whitening)** — **NOT PRESENT** — fictional business
  doesn't publish before/after on GBP. See content gap.

## Content gaps (flag, do not invent)

- **Insurance accepted list not on GBP.** The fictional practice lists
  payment methods but does not enumerate accepted insurers on its
  profile. Build stage should resolve this with the client — until then,
  don't invent a list on the website.
- **No before/after gallery on GBP.** Templates/dentist-clinic.md
  flags before/after photos as a content gap — fictional business has
  none, so the build should omit this section or source only from the
  business's own channels (see Templates ethical note).
- **No published pricing on GBP.** See services.md for how this carries
  through to the build.