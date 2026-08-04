"use client";

import {
  AvailabilityStrip,
  BookingCTA,
  ContactLocation,
  NavbarFooter,
} from "@factory/engine/components";
import type { SocialLink } from "@factory/engine/components";
import { Globe } from "lucide-react";

import { Schema } from "@/app/Schema";
import { hours, navPages, SITE } from "@/lib/site";

/*
 * /contact — FICTIONAL TEST DATA.
 * NAP must match business.md and research/google-profile.md exactly.
 * Email row omitted because the practice does not publish one
 * (per website/copy/contact.md content gap flag).
 */

const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/fictitious.dental.test", Icon: Globe },
  { label: "Facebook", href: "https://www.facebook.com/fictitious-dental-test-page", Icon: Globe },
];

export default function ContactPage() {
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
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          <h1
            className="text-4xl font-semibold leading-tight sm:text-5xl"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            Visit the practice
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            We&rsquo;re on Fictitious Street in Camden, a short walk from
            Camden Town station. Call us, message us, or drop in during
            opening hours.
          </p>
        </div>
      </section>

      <ContactLocation
        heading="Visit us"
        address={SITE.address}
        phone={SITE.phone}
        hours={hours}
      />

      <section
        className="w-full"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          <h2
            className="text-2xl font-semibold sm:text-3xl"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            How to get in touch
          </h2>
          <ul className="mt-6 space-y-4">
            <li
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              <strong>Phone:</strong> +44 20 7946 0999 (fastest — we answer
              during opening hours)
            </li>
            <li
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              <strong>Book online:</strong> <a href="/new-patients" className="font-medium underline-offset-4 hover:underline" style={{ color: "var(--color-primary)" }}>Book a check-up</a>
            </li>
            <li
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              <strong>In person:</strong> drop in during opening hours
            </li>
          </ul>

          <h3
            className="mt-12 text-lg font-semibold"
            style={{ color: "var(--color-ink)" }}
          >
            Accessibility
          </h3>
          <p
            className="mt-2 text-base leading-relaxed"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            The practice has step-free access from the street and a
            wheelchair-accessible toilet. If you have specific access
            needs, call us before your visit so we can prepare.
          </p>
        </div>
      </section>

      <BookingCTA
        headline="Book a check-up"
        subtext="A 30-minute new-patient appointment, with time to examine, plan, and answer your questions. Call us or book online."
        ctaLabel="Book a check-up"
        phone={SITE.phone}
      />
      </NavbarFooter>
    </>
  );
}
