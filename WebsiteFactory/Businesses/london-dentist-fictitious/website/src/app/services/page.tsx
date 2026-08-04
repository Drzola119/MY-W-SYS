"use client";

import {
  AvailabilityStrip,
  BookingCTA,
  NavbarFooter,
  ServicesGrid,
} from "@factory/engine/components";
import { Globe } from "lucide-react";
import type { SocialLink } from "@factory/engine/components";

import { Schema } from "@/app/Schema";
import { hours, navPages, services, SITE } from "@/lib/site";

/*
 * /services — FICTIONAL TEST DATA.
 * Full 11-service grid. No invented pricing — only the whitening card
 * has a priceRange, per research/services.md.
 */

const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/fictitious.dental.test", Icon: Globe },
  { label: "Facebook", href: "https://www.facebook.com/fictitious-dental-test-page", Icon: Globe },
];

export default function ServicesPage() {
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
        acceptingNew
        ctaLabel="Book a check-up"
      />

      <section
        className="w-full"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-2xl">
            <h1
              className="text-4xl font-semibold leading-tight sm:text-5xl"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-display)",
              }}
            >
              What we offer
            </h1>
            <p
              className="mt-4 max-w-xl text-lg"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              Routine dentistry, hygiene, cosmetic work, and emergency care.
              We&rsquo;ll always tell you what we&rsquo;re doing and why.
            </p>
          </div>
        </div>
      </section>

      <ServicesGrid
        heading="Every service we offer"
        intro="Prices are shown only where the practice publishes them. For everything else, ask at your consultation — we'll always quote before any treatment."
        items={services}
        columns={3}
      />

      <section
        className="w-full"
        style={{ backgroundColor: "var(--color-surface-alt)" }}
      >
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            If you&rsquo;re anxious about a visit, tell us when you book. We
            can plan a longer appointment, explain each step, and keep things
            at your pace.
          </p>
        </div>
      </section>

      <BookingCTA
        headline="Not sure which service you need?"
        subtext="Call us on +44 20 7946 0999 and we'll point you in the right direction. For urgent problems, see our emergency page."
        ctaLabel="Book a check-up"
        phone={SITE.phone}
      />
      </NavbarFooter>
    </>
  );
}
