# Copy — Contact (`/contact`)

**FICTIONAL TEST DATA.** NAP (name, address, phone) must match
`business.md` and `research/google-profile.md` exactly. Per
`Standards/quality-standards.md` structured data: "LocalBusiness
schema with accurate NAP matching the Google Business Profile
exactly."

## Headline (H1)

> Visit the practice

Direct. Per `voice.md` register: contact pages are reassuring,
specific about what happens next.

## Subhead

> We&rsquo;re on Fictitious Street in Camden, a short walk from
> Camden Town station. Call us, message us, or drop in during
> opening hours.

Real specifics from `business.md` (test address, fictional).

## Contact details (NAP block)

- **Practice name:** Fictitious Dental Practice (test data)
- **Address:** 14 Fictitious Street, London NW1 0AA
- **Phone:** +44 20 7946 0999
- **Email:** hello@fictitious-dental-test.example.invalid
  *(placeholder — do not use in production; the fictional practice
  does not publish an email address on its GBP or socials. Build
  should drop the email row or replace with a contact form link.)*

**Content gap flag (Build note):** The fictional practice does not
publish a public email. `research/google-profile.md` lists phone
and address only. The Build stage should either:
- (a) omit the email row entirely, or
- (b) replace with a "Send us a message" link to a contact form
  (still requires client confirmation).

Default: **omit the email row** unless the client confirms an
address.

## Opening hours

| Day | Hours |
|---|---|
| Monday | 09:00–18:00 |
| Tuesday | 09:00–18:00 |
| Wednesday | 09:00–18:00 |
| Thursday | 09:00–20:00 |
| Friday | 09:00–17:00 |
| Saturday | 10:00–14:00 (emergencies by appointment) |
| Sunday | Closed |

Matches `research/google-profile.md` exactly. Per
`Standards/quality-standards.md`: NAP must match GBP — these hours
do.

## Map / directions

> We&rsquo;re on Fictitious Street, just off the high street in
> Camden. The nearest tube is Camden Town (Northern line), about
> 5 minutes&rsquo; walk. Bus routes 24, 27, 31, and 168 stop
> nearby.

(Vague but plausible — fictional practice, fictional area. Build
should embed a Google Maps iframe with the address, not a custom
artwork.)

## Accessibility

> The practice has step-free access from the street and a
> wheelchair-accessible toilet. If you have specific access needs,
> call us before your visit so we can prepare.

Per `research/google-profile.md` attributes (Wheelchair-accessible
entrance, wheelchair-accessible toilet).

## How to get in touch

- **Phone:** +44 20 7946 0999 (fastest — we answer during opening
  hours)
- **Book online:** [Book a check-up](/new-patients) (links to the
  new-patients page, which has the booking flow)
- **In person:** drop in during opening hours

Per `voice.md` "Phone is the fastest" — direct, honest.

## BookingCTA

- **Heading:** "Book a check-up"
- **Body:** "A 30-minute new-patient appointment, with time to
  examine, plan, and answer your questions. Call us or book online."
- **Primary button:** "Book a check-up"
- **Secondary button:** "Call us"

## SEO meta

- **Title tag:** "Contact &amp; Visit | Fictitious Dental Practice (test data)"
- **Meta description:** "Visit us at 14 Fictitious Street, London
  NW1 0AA. Open Monday–Saturday. Call +44 20 7946 0999 or book a
  check-up online."
- **Primary keyword:** (NAP consistency — see `website/seo.md`)
