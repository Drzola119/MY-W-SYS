"use client";

import {
  AvailabilityStrip,
  BookingCTA,
  Hero,
  NavbarFooter,
  ReviewsTicker,
  ServicesGrid,
} from "@factory/engine/components";
import type { ServiceItem, SocialLink } from "@factory/engine/components";
import { Globe } from "lucide-react";

import { Schema } from "@/app/Schema";
import { hours, navPages, rating, reviews, services, SITE } from "@/lib/site";

/*
 * Homepage (/) — FICTIONAL TEST DATA.
 * H1: "Calm, expert dental care in Camden." per website/copy/homepage.md.
 * Above the fold: AvailabilityStrip + Hero. Below: 4-service preview,
 * ReviewsTicker, two BookingCTAs (surface tone for the inline closer,
 * primary tone for the bookend).
 */

const socials: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/fictitious.dental.test",
    Icon: Globe,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/fictitious-dental-test-page",
    Icon: Globe,
  },
];

const previewServices: ServiceItem[] = [
  services[0],
  services[1],
  services[3],
  services[8],
];

export default function HomePage() {
  return (
    <>
      <Schema />
      <NavbarFooter
        brandName={SITE.name}
        pages={navPages}
        phone={SITE.phone}
        address={SITE.address}
        hours={hours}
        socials={socials}
      >

      <AvailabilityStrip
        status="open"
        nextAvailable="2:30pm today"
        acceptingNew
        ctaLabel="Book a check-up"
      />

      <Hero
        headline="Calm, expert dental care in Camden."
        subhead="We're a family practice on Fictitious Street, a short walk from Camden Town. New-patient appointments are 30 minutes, so we can examine, plan, and answer your questions without rushing."
        ctaLabel="Book a check-up"
        ratingBadge={rating}
      />

      <ServicesGrid
        heading="What we offer"
        intro="A short list of the services our patients ask about most. The full list is on the Services page."
        items={previewServices}
        columns={4}
      />

      <ReviewsTicker reviews={reviews} />

      <BookingCTA
        headline="Ready to book?"
        subtext="Pick a slot that works for you, or call us on +44 20 7946 0999. New patients get a 30-minute appointment so we have time to listen, examine, and plan."
        ctaLabel="Book a check-up"
        phone={SITE.phone}
      />

      <BookingCTA
        tone="primary"
        headline="Same-day emergency?"
        subtext="Same-day emergency slots most weekdays. Saturday mornings for emergencies by appointment. Call us first — we'll tell you when to come in."
        ctaLabel="Call us now"
        phone={SITE.phone}
      />
      </NavbarFooter>
    </>
  );
}
