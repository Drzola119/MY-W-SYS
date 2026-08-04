import { SITE, hours, rating } from "@/lib/site";

/*
 * JSON-LD schema for the practice. Per website/seo.md:
 * - @type: Dentist (correct sub-type for this vertical)
 * - NAP must match /business.md and /research/google-profile.md exactly
 * - aggregateRating is INCLUDED from research/google-profile.md — the
 *   same 4.7/86 numbers the Hero ratingBadge displays visually. This is
 *   data we collected from the business's own public profile; it is
 *   not fabricated. If a future business lacks a research-sourced
 *   rating, drop the aggregateRating object before deploying.
 * - Includes all 11 services from research/services.md. Implants
 *   intentionally absent.
 */

const schema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE.url}/#dentist`,
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "14 Fictitious Street",
    addressLocality: "London",
    postalCode: "NW1 0AA",
    addressCountry: "GB",
  },
  openingHoursSpecification: hours
    .filter((h) => !h.closed)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
  priceRange: "££",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: rating.score,
    reviewCount: rating.count,
    bestRating: 5,
    worstRating: 1,
  },
  medicalSpecialty: "Dentistry",
  availableService: [
    { "@type": "MedicalProcedure", name: "New patient consultation" },
    { "@type": "MedicalProcedure", name: "Routine check-up" },
    { "@type": "MedicalProcedure", name: "Hygiene-only clean" },
    { "@type": "MedicalProcedure", name: "In-chair whitening" },
    { "@type": "MedicalProcedure", name: "Take-home whitening" },
    { "@type": "MedicalProcedure", name: "Composite bonding" },
    { "@type": "MedicalProcedure", name: "Crowns" },
    { "@type": "MedicalProcedure", name: "Root canal treatment" },
    { "@type": "MedicalProcedure", name: "Emergency same-day care" },
    { "@type": "MedicalProcedure", name: "Children's dentistry" },
    { "@type": "MedicalProcedure", name: "Invisalign / clear aligners" },
  ],
  sameAs: [
    "https://www.instagram.com/fictitious.dental.test",
    "https://www.facebook.com/fictitious-dental-test-page",
  ],
};

export function Schema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
