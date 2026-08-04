"use client";

import {
  AvailabilityStrip,
  BookingCTA,
  NavbarFooter,
} from "@factory/engine/components";
import type { SocialLink } from "@factory/engine/components";
import { Globe } from "lucide-react";

import { Schema } from "@/app/Schema";
import { hours, navPages, SITE } from "@/lib/site";

/*
 * /emergency — FICTIONAL TEST DATA.
 * Per website/copy/emergency.md: same-day emergency slots most weekdays,
 * Saturday mornings by appointment. Phone is the primary CTA on this page.
 */

const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/fictitious.dental.test", Icon: Globe },
  { label: "Facebook", href: "https://www.facebook.com/fictitious-dental-test-page", Icon: Globe },
];

export default function EmergencyPage() {
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
        ctaLabel="Call us now"
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
            Emergency dentist in Camden
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            If you&rsquo;re in pain, have a broken tooth, or have lost a
            crown, we hold same-day slots most weekdays and Saturday mornings.
            Call us first — we&rsquo;ll tell you when to come in.
          </p>
        </div>
      </section>

      <section
        className="w-full"
        style={{ backgroundColor: "var(--color-surface-alt)" }}
      >
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          <h2
            className="text-2xl font-semibold sm:text-3xl"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            What counts as a dental emergency
          </h2>
          <ul className="mt-6 space-y-2">
            <li
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              Toothache that doesn&rsquo;t settle with over-the-counter pain relief
            </li>
            <li
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              A broken or knocked-out tooth
            </li>
            <li
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              A lost crown or filling that&rsquo;s causing pain or damage
            </li>
            <li
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              Swelling in the mouth or face
            </li>
            <li
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              Bleeding that won&rsquo;t stop after an extraction
            </li>
          </ul>
        </div>
      </section>

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
            What to do right now
          </h2>

          <div className="mt-8 space-y-6">
            <article
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: "var(--color-surface-alt)",
                borderColor: "var(--color-border)",
              }}
            >
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                If you&rsquo;ve knocked a tooth out
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--color-ink)", opacity: 0.8 }}
              >
                Pick the tooth up by the crown (the white part), not the root.
                Rinse it briefly if it&rsquo;s dirty, then either put it
                back in the socket and hold it there, or store it in milk.
                Call us straight away — the sooner we see you, the better
                the chance of saving the tooth.
              </p>
            </article>

            <article
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: "var(--color-surface-alt)",
                borderColor: "var(--color-border)",
              }}
            >
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                If you have a swollen face or fever
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--color-ink)", opacity: 0.8 }}
              >
                This can be a sign of infection. Call us, and in the
                meantime take over-the-counter pain relief as directed. If
                the swelling is spreading or you&rsquo;re having trouble
                breathing or swallowing, go to A&amp;E.
              </p>
            </article>

            <article
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: "var(--color-surface-alt)",
                borderColor: "var(--color-border)",
              }}
            >
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                If you have a broken tooth or lost crown
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--color-ink)", opacity: 0.8 }}
              >
                Save the broken piece or crown if you can find it. Avoid
                eating on that side. Call us to book a same-day slot.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="w-full"
        style={{ backgroundColor: "var(--color-surface-alt)" }}
      >
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          <h2
            className="text-2xl font-semibold sm:text-3xl"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            When we&rsquo;re closed
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            Outside our hours, call 111 (NHS) for advice. For severe
            swelling, difficulty breathing or swallowing, or trauma you
            can&rsquo;t manage, go to A&amp;E.
          </p>
        </div>
      </section>

      <BookingCTA
        tone="primary"
        headline="Call us now"
        subtext="If you're in pain, don't wait. Call +44 20 7946 0999 and we'll find you a same-day slot if one is available."
        ctaLabel="Call us now"
        phone={SITE.phone}
      />
      </NavbarFooter>
    </>
  );
}
