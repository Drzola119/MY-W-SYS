# SEO — Fictitious Dental Practice (test data)

**FICTIONAL TEST DATA.** Per `Pipelines/04-content-and-seo.md` step 3:
title tags, meta descriptions, target keyword per page, and the
correct `LocalBusiness` schema sub-type for this vertical.

## LocalBusiness schema (per page)

JSON-LD embedded in the `<head>` of every page via Next.js
`Metadata` API or a `<Script>` tag. Sub-type: **`Dentist`**
(per `Standards/quality-standards.md` "or the correct sub-type —
`Dentist`, `HealthClub`, `BeautySalon`").

```json
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": "https://www.fictitious-dental-test.example.invalid/#dentist",
  "name": "Fictitious Dental Practice",
  "image": "https://www.fictitious-dental-test.example.invalid/og.jpg",
  "url": "https://www.fictitious-dental-test.example.invalid/",
  "telephone": "+44 20 7946 0999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "14 Fictitious Street",
    "addressLocality": "London",
    "postalCode": "NW1 0AA",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.5390,
    "longitude": -0.1426
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday"], "opens": "09:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "09:00", "closes": "20:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "14:00" }
  ],
  "priceRange": "££",
  "medicalSpecialty": "Dentistry",
  "availableService": [
    { "@type": "MedicalProcedure", "name": "New patient consultation" },
    { "@type": "MedicalProcedure", "name": "Routine check-up" },
    { "@type": "MedicalProcedure", "name": "Hygiene-only clean" },
    { "@type": "MedicalProcedure", "name": "In-chair whitening" },
    { "@type": "MedicalProcedure", "name": "Take-home whitening" },
    { "@type": "MedicalProcedure", "name": "Composite bonding" },
    { "@type": "MedicalProcedure", "name": "Crowns" },
    { "@type": "MedicalProcedure", "name": "Root canal treatment" },
    { "@type": "MedicalProcedure", "name": "Emergency same-day care" },
    { "@type": "MedicalProcedure", "name": "Children's dentistry" },
    { "@type": "MedicalProcedure", "name": "Invisalign / clear aligners" }
  ],
  "sameAs": [
    "https://www.instagram.com/fictitious.dental.test",
    "https://www.facebook.com/fictitious-dental-test-page"
  ]
}
```

### Notes on the schema

- **No `aggregateRating` or `review` fields.** Per
  `Standards/quality-standards.md`, "Never fabricate reviews,
  ratings, star counts, or testimonials." The fictional practice
  has a research-stage 4.7★/86 reviews count, but the comment
  fabricates review text would be a violation. Real implementation
  pulls from the GBP API once live. **For the test build, the
  schema omits `aggregateRating` entirely.** This is the honest
  treatment — schema-level review claims require real review data,
  not research placeholders.
- **`priceRange: ££`** is a generic GBP symbol, not a fabricated
  service price. It communicates mid-market positioning without
  inventing a number.
- **`medicalSpecialty: Dentistry`** aligns with the `@type:
  Dentist` sub-type.
- **`availableService` lists all 11 services** from
  `research/services.md`. `Implants` is intentionally absent.

### NAP consistency

| Field | Schema value | business.md | research/google-profile.md |
|---|---|---|---|
| Name | Fictitious Dental Practice | Fictitious Dental Practice (test data) | — |
| Street | 14 Fictitious Street | 14 Fictitious Street, London NW1 0AA | — |
| Locality | London | London | — |
| Postal | NW1 0AA | NW1 0AA | — |
| Country | GB | (implicit UK) | — |
| Phone | +44 20 7946 0999 | +44 20 7946 0999 | — |
| Hours | per `dayOfWeek` block | Mon–Fri 9–18, Thu 9–20, Sat 10–14 | matches |

(GBP hours from `research/google-profile.md` are the canonical
source. Schema, business.md, and the contact page all match.)

## Per-page SEO

| Page | Title tag | Meta description | Primary keyword | Secondary keywords |
|---|---|---|---|---|
| `/` | Dentist Camden \| Fictitious Dental Practice (test data) | Calm, expert dental care in Camden. 30-minute new-patient appointments, same-day emergency slots most weekdays, and Saturday mornings for emergencies. | dentist Camden | family dentist Camden, Saturday dentist Camden |
| `/services` | Dental Services in Camden \| Fictitious Dental Practice (test data) | Routine check-ups, hygiene, whitening, crowns, root canal, Invisalign, and emergency same-day care. 30-minute new-patient appointments. | dentist NW1 | family dentist Camden, hygienist Camden, NHS dentist Camden |
| `/about` | About the Practice \| Fictitious Dental Practice (test data) | A small family dental practice in Camden. 30-minute new-patient appointments, no upselling, no rushing. | (trust signal — not a primary search target) | — |
| `/whitening` | Teeth Whitening Camden \| Fictitious Dental Practice (test data) | In-chair whitening in a single visit, or take-home trays over two weeks. Book a consultation to find out which is right for you. | teeth whitening Camden | in-chair whitening Camden, whitening cost Camden |
| `/emergency` | Emergency Dentist Camden \| Fictitious Dental Practice (test data) | Same-day emergency dentist in Camden most weekdays, Saturday mornings for emergencies. Call +44 20 7946 0999. | emergency dentist Camden | Saturday dentist Camden, urgent dentist Camden |
| `/new-patients` | New Patients &amp; Families \| Fictitious Dental Practice (test data) | We&rsquo;re accepting new patients — adults and children. 30-minute first visits, NHS and private options. Call us to confirm your insurance. | family dentist Camden | children's dentist Camden, new dentist Camden, NHS dentist Camden |
| `/faq` | FAQ \| Fictitious Dental Practice (test data) | Insurance, pain management, and emergency policy — the questions we get asked most often, answered directly. | (supportive content) | — |
| `/contact` | Contact &amp; Visit \| Fictitious Dental Practice (test data) | Visit us at 14 Fictitious Street, London NW1 0AA. Open Monday–Saturday. Call +44 20 7946 0999 or book a check-up online. | (NAP consistency) | — |

## Per-page keyword source

Per `research/keywords.md` per-page keyword map. The map's row
"Contact / Visit" is implicitly a NAP-consistency page, not a
search-target — that's why the contact page's primary keyword is
absent.

## Negative keywords (avoid)

Per `research/keywords.md`:

- "best dentist Camden", "top dentist Camden" — superlatives
  nothing supports.
- "cheap dentist Camden" — wrong intent; would contradict
  positioning.

These are not on the page. Nothing in the copy uses them.

## Title tag conventions

- **Length:** 50–60 characters where possible. Service pages
  longest at 60; homepage shortest at 39.
- **Format:** `<Page subject> | <Practice name>` — common
  local-SERP format.
- **No keyword stuffing.** Each title names the page subject
  once, plus the brand.

## Meta description conventions

- **Length:** 140–160 characters.
- **Format:** One sentence on what the page is, one sentence on
  the differentiator.
- **Includes a CTA** (book / call) on service pages; CTAs sit
  inline so the meta description itself is informative.

## Heading hierarchy (per page)

Each page follows the same pattern:

- **H1:** one per page, matches the page subject (e.g. "What we
  offer").
- **H2:** main sections (e.g. "Insurance", "What to expect").
- **H3:** sub-sections within H2s (e.g. "Will it hurt?").

Per `Standards/quality-standards.md` "Semantic HTML — `<nav>`,
`<main>`, `<section>`, proper heading order. No div-soup."

## Image alt text

Image alt text conventions (per `Standards/quality-standards.md`
"real alt text, not just automated-tool-passing"):

- **Decorative:** `alt=""` (so screen readers skip).
- **Informative:** describe what the image shows, in plain English —
  no "image of" prefix.
- **Anchor images (logos):** `alt="Fictitious Dental Practice"`.

## Page-level SEO checklist (Build stage)

- [ ] Each page sets a unique `<title>` (not the global default).
- [ ] Each page sets a unique `<meta name="description">`.
- [ ] Canonical URL points to the live domain (not `localhost`).
- [ ] `og:image` (1200×630) per page (or global fallback).
- [ ] JSON-LD `Dentist` schema included once per page (not duplicated).
- [ ] H1 matches the page's primary keyword subject.
- [ ] All images have meaningful `alt` text.
- [ ] Internal links use descriptive anchor text (not "click here").
