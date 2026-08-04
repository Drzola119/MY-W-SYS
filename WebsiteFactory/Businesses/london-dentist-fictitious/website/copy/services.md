# Copy — Services (`/services`)

**FICTIONAL TEST DATA.** Per `Skills/generate-copy.md` and
`research/services.md`: only services the fictional business actually
offers are listed. Pricing is omitted except where the business
publishes it.

## Headline (H1)

> What we offer

Short, matter-of-fact. Per `brand/voice.md` register matching:
"Services grid: matter-of-fact, list-and-describe."

## Subhead

> Routine dentistry, hygiene, cosmetic work, and emergency care.
> We&rsquo;ll always tell you what we&rsquo;re doing and why.

"We" for the practice, "you" for the visitor. The second sentence
mirrors the GBP review feedback ("explained what she was doing",
"talked me through the X-ray findings").

## Full services grid

All 11 services from `research/services.md`. **No invented prices** —
price chips appear only where the practice actually publishes one.

### 1. New patient consultation
- **Duration:** 30 minutes
- **Includes:** exam, treatment plan, time to answer questions
- **Price:** Not published — "Pricing on request"
- **Icon:** `Calendar` (per `ServicesGrid` icon mapping)

### 2. Routine check-up
- **Includes:** exam + scale + polish
- **Price:** Not published
- **Icon:** `Stethoscope`

### 3. Hygiene-only clean
- **Duration:** 30 or 45 minutes (your choice at booking)
- **Includes:** with a hygienist
- **Price:** Not published
- **Icon:** `Sparkles`

### 4. Whitening (in-chair)
- **Type:** Single-visit whitening
- **Price:** **From £X** (the one anchor price the business publishes)
- **Icon:** `Sun`
- **Detail page:** `/whitening`

### 5. Whitening (take-home)
- **Type:** Custom trays + gel, 2-week course
- **Price:** Not published
- **Icon:** `Footprints`
- **Detail page:** `/whitening`

### 6. Composite bonding
- **Per-tooth:** Per-tooth pricing varies by case
- **Price:** Not published — "Pricing on request"
- **Icon:** `Wrench`

### 7. Crowns
- **Options:** Porcelain-fused and full ceramic
- **Price:** Not published
- **Icon:** `HeartPulse`

### 8. Root canal treatment
- **Approach:** Single-visit where possible
- **Price:** Not published
- **Icon:** `Activity`

### 9. Emergency same-day
- **For:** Trauma, pain, or lost crown
- **Approach:** Same-day slots most weekdays
- **Price:** Varies by case
- **Icon:** `Zap`
- **Detail page:** `/emergency`

### 10. Children's dentistry
- **Options:** NHS and private pathways
- **Price:** Not published
- **Icon:** `Baby`

### 11. Invisalign / clear aligners
- **Approach:** Provider-tier assessment at consultation
- **Price:** Not published (the business doesn't publish its tier)
- **Icon:** `Clock`

## Services grid layout

`ServicesGrid` (engine component) renders all 11 cards in a
`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` layout. Each card uses
`ServiceIconName` (string) to look up the icon — no Lucide functions
cross the RSC boundary, so the page can stay a Server Component.

## What is NOT on this page

- **No implants.** The fictional practice does not offer implants
  (per `research/services.md`). Cards and mentions are omitted
  entirely, even though `Templates/dentist-clinic.md` lists them as
  an example.
- **No published fee guide.** Only in-chair whitening has a
  published price. The other 10 services list "Not published" or
  "Pricing on request" — no invented numbers.
- **No provider tier claim for Invisalign.** `research/services.md`
  flags this as a gap. The card says "Provider-tier assessment at
  consultation" without claiming Diamond / Platinum / etc.

## BookingCTA (bottom of page)

- **Heading:** "Not sure which service you need?"
- **Body:** "Call us on +44 20 7946 0999 and we&rsquo;ll point you
  in the right direction. For urgent problems, see our
  [emergency page](/emergency)."
- **Primary button:** "Book a check-up"
- **Secondary button:** "Call us"

## Reassurance footnote

> If you&rsquo;re anxious about a visit, tell us when you book. We
> can plan a longer appointment, explain each step, and keep things
> at your pace.

Per `voice.md` empathy point: "in the FAQ answer about pain, in the
Hero subhead, in the BookingCTA reassurance line — but never in a
forced way."

## SEO meta

- **Title tag:** "Dental Services in Camden | Fictitious Dental Practice (test data)"
- **Meta description:** "Routine check-ups, hygiene, whitening, crowns,
  root canal, Invisalign, and emergency same-day care. 30-minute
  new-patient appointments."
- **Primary keyword:** `dentist NW1`
- **Secondary keywords:** `family dentist Camden`, `hygienist Camden`,
  `NHS dentist Camden`
