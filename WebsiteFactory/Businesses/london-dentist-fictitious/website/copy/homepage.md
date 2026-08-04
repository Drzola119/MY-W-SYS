# Copy — Homepage (`/`)

**FICTIONAL TEST DATA.** Per `Skills/generate-copy.md`: every claim
traces back to research. Voice follows `brand/voice.md` (calm, specific,
warm) and `Design-Systems/local-services/voice-and-copy.md`.

## Headline (H1)

> Calm, expert dental care in Camden.

Per `voice.md`: short, specific, no hype. "Expert" is supported by the
GBP review tone ("modern equipment", "talked me through the X-ray
findings"); "calm" is supported by three GBP reviews ("didn't feel
rushed", "calm", "patient with the kids"). "Camden" anchors the local
SEO target.

## Subhead

> We&rsquo;re a family practice on Fictitious Street, a short walk
> from Camden Town. New-patient appointments are 30 minutes, so we
> can examine, plan, and answer your questions without rushing.

Real specifics from `research/services.md` and `business.md`:
30-minute new-patient appointment, real address. "Without rushing"
mirrors the GBP review tone verbatim.

## AvailabilityStrip copy

- **Status:** "Open today" / "Closed today" (derived from
  `research/google-profile.md` hours).
- **Hours line:** "Today: 09:00–18:00" (uses JetBrains Mono per
  `brand/typography.md` utility font).
- **Accepting new patients:** "Yes — book a 30-minute new-patient
  appointment." (Real per `research/services.md`.)
- **Phone:** `+44 20 7946 0999` (real per `business.md`).

## Primary CTA

> **Book a check-up**

Per `voice.md` test: "Book a check-up" ✓, "Start your smile journey" ✗.
States the action's actual result, not the feeling.

## Secondary CTA

> **Call us — +44 20 7946 0999**

Per `Templates/dentist-clinic.md` CTA priority: phone is the
secondary CTA on the homepage.

## Brief services preview (3–4 cards above the fold)

Full list lives on `/services`. The homepage shows 3–4 high-intent
entries to anchor SEO and route visitors to detail pages:

- New patient consultation (30 min) — `/services#new-patient`
- Routine check-up — `/services#check-up`
- Teeth whitening — `/whitening`
- Emergency same-day — `/emergency`

These four appear because they each map to a primary keyword in
`research/keywords.md`. Other services live on `/services`.

## ReviewsTicker copy

The ReviewsTicker cycles through the real GBP review snippets in
`research/google-profile.md` (labeled as "FICTIONAL TEST DATA" in
research; on the live site they would be paraphrased from real
reviews).

Visible text (3-line snippets, names initialed per `voice.md`):

> "Switched to this practice earlier this year — clean, on-time, the
> hygienist actually explained what she was doing." — S. K.

> "Booked an emergency appointment on a Saturday morning after
> chipping a tooth. Seen within an hour, fixed same day." — M. R.

> "Took my two kids for their first check-ups. They were nervous
> but the dentist was great with them — patient, used simple words."
> — P. D.

> "Whitening results were better than I expected for the price. No
> pressure to upsell." — A. N.

> "The dentist talked me through the X-ray findings without rushing.
> Reasonable pricing too." — T. L.

5 reviews visible (one full rotation). Total GBP count is 86 per
research; the ticker shows a representative subset, not all of them.

## BookingCTA copy

- **Heading:** "Ready to book?"
- **Body:** "Pick a slot that works for you, or call us on
  +44 20 7946 0999. New patients get a 30-minute appointment so we
  have time to listen, examine, and plan."
- **Primary button:** "Book a check-up"
- **Secondary button:** "Call us"

Per `voice.md` register matching: "BookingCTA: reassuring, specific
about what happens next." The body line tells the visitor exactly what
their first visit will look like.

## Reassurance line (under BookingCTA)

> Same-day emergency slots most weekdays. Saturday mornings for
> emergencies by appointment.

Per `research/services.md` and `research/google-profile.md` (Saturday
hours, emergency same-day). Direct from the practice's differentiator
notes in `research/competitors.md`.

## SEO meta (page-level)

- **Title tag:** "Dentist Camden | Fictitious Dental Practice (test data)"
- **Meta description:** "Calm, expert dental care in Camden. 30-minute
  new-patient appointments, same-day emergency slots most weekdays,
  and Saturday mornings for emergencies."
- **Primary keyword:** `dentist Camden`

See `website/seo.md` for the full per-page SEO record.
