"use client";

import {
  AvailabilityStrip,
  BookingCTA,
  NavbarFooter,
} from "@factory/engine/components";
import { Camera, Globe } from "lucide-react";
import type { SocialLink } from "@factory/engine/components";

import { Schema } from "@/app/Schema";
import { hours, navPages, SITE } from "@/lib/site";

/*
 * /about — FICTIONAL TEST DATA.
 * Practice story + a placeholder for staff bios. Per website/copy/about.md,
 * research found photos but no names, so we render a placeholder card that
 * explicitly invites the client to populate the section. We do NOT invent
 * staff (per Standards/quality-standards.md).
 */

const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/fictitious.dental.test", Icon: Globe },
  { label: "Facebook", href: "https://www.facebook.com/fictitious-dental-test-page", Icon: Globe },
];

export default function AboutPage() {
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
            A small family practice in Camden
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            We&rsquo;re a small team on Fictitious Street. We take our time,
            explain what we&rsquo;re doing, and treat you like a person, not
            a slot in the diary.
          </p>
        </div>
      </section>

      <section
        className="w-full"
        style={{ backgroundColor: "var(--color-surface-alt)" }}
      >
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          <div className="prose-like space-y-6">
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              We opened on Fictitious Street in Camden because the area needed
              a practice that takes the time to listen. We see patients of all
              ages, from a child&rsquo;s first check-up through to emergency
              same-day care, and we look after a number of families across
              several generations.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              Our work is general dentistry first — check-ups, hygiene,
              fillings, crowns, root canals — with cosmetic treatments
              available when patients ask for them. We don&rsquo;t upsell.
              If we recommend something, we&rsquo;ll explain why.
            </p>
          </div>

          <h2
            className="mt-12 text-2xl font-semibold sm:text-3xl"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            What we believe
          </h2>

          <ul className="mt-6 space-y-6">
            <li
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                We&rsquo;ll explain what we&rsquo;re doing.
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--color-ink)", opacity: 0.75 }}
              >
                Every step, every finding, every recommendation. If you
                don&rsquo;t understand something, ask — we&rsquo;d rather
                explain it twice than have you leave with a question.
              </p>
            </li>
            <li
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                We don&rsquo;t rush.
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--color-ink)", opacity: 0.75 }}
              >
                A 30-minute new-patient appointment is 30 minutes. We never
                double-book the same chair.
              </p>
            </li>
            <li
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                We don&rsquo;t upsell.
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--color-ink)", opacity: 0.75 }}
              >
                If you came in for a check-up, that&rsquo;s what you&rsquo;ll
                get. We&rsquo;ll talk about other treatments only if you ask
                or if we see something that genuinely needs attention.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section
        className="w-full"
        style={{ backgroundColor: "var(--color-surface)" }}
        aria-labelledby="team-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-2xl">
            <h2
              id="team-heading"
              className="text-3xl font-semibold sm:text-4xl"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-display)",
              }}
            >
              Meet the team
            </h2>
            <p
              className="mt-3 text-base"
              style={{ color: "var(--color-ink)", opacity: 0.75 }}
            >
              Individual bios and team photos coming soon. We&rsquo;d
              rather show you real names than placeholders.
            </p>
          </div>

          <div
            className="mt-10 flex flex-col items-center gap-4 rounded-2xl border p-12 text-center"
            style={{
              backgroundColor: "var(--color-surface-alt)",
              borderColor: "var(--color-border)",
            }}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-primary)",
              }}
              aria-hidden="true"
            >
              <Camera className="h-5 w-5" />
            </span>
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--color-ink)" }}
            >
              Team photos and bios coming soon
            </h3>
            <p
              className="max-w-md text-sm leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.75 }}
            >
              In the meantime, you can{" "}
              <a
                href="/contact"
                className="font-medium underline-offset-4 hover:underline"
                style={{ color: "var(--color-primary)" }}
              >
                meet us in person
              </a>{" "}
              — bookings are 30 minutes so we have time to introduce
              ourselves.
            </p>
          </div>
        </div>
      </section>

      <BookingCTA
        headline="Come and see us"
        subtext="A 30-minute new-patient appointment is the easiest way to find out what we're like. We'll examine, plan, and answer every question."
        ctaLabel="Book a check-up"
        phone={SITE.phone}
      />
      </NavbarFooter>
    </>
  );
}
