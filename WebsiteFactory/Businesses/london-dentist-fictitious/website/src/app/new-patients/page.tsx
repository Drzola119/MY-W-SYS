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
 * /new-patients — FICTIONAL TEST DATA.
 * Per website/copy/new-patients.md: research has insurance as a content
 * gap, so the page uses "call us to confirm" rather than inventing a list.
 */

const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/fictitious.dental.test", Icon: Globe },
  { label: "Facebook", href: "https://www.facebook.com/fictitious-dental-test-page", Icon: Globe },
];

export default function NewPatientsPage() {
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
            New patients and families
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            We&rsquo;re accepting new patients — adults and children. Your
            first visit is 30 minutes, so we can examine, plan, and answer
            every question.
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
            What to bring
          </h2>
          <ul className="mt-6 space-y-3">
            <li
              className="flex items-start gap-3 text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
                aria-hidden="true"
              />
              <span>Photo ID (driving licence, passport, or similar)</span>
            </li>
            <li
              className="flex items-start gap-3 text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
                aria-hidden="true"
              />
              <span>A list of any medications you&rsquo;re taking</span>
            </li>
            <li
              className="flex items-start gap-3 text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
                aria-hidden="true"
              />
              <span>Your NHS number, if you have one (we see both NHS and private patients)</span>
            </li>
            <li
              className="flex items-start gap-3 text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
                aria-hidden="true"
              />
              <span>Insurance details, if you have dental insurance — we&rsquo;ll check whether we accept your plan</span>
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
            What to expect at your first visit
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            We&rsquo;ll start with a few questions about your dental history,
            any current concerns, and what you&rsquo;re hoping to get out of
            being a patient with us. Then we&rsquo;ll examine your teeth and
            gums, take any X-rays we need, and write up a treatment plan.
            You&rsquo;ll leave with a clear next step — and a chance to ask
            anything we haven&rsquo;t covered.
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
            Children&rsquo;s dentistry
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            We see children from their first tooth onwards. A first visit is
            usually short — a ride in the chair, a look at the teeth, and a
            chat with you about brushing and diet. Our team is patient with
            nervous kids (one of our recent reviews says exactly that, and
            we&rsquo;re proud of it).
          </p>
          <h3
            className="mt-8 text-base font-semibold"
            style={{ color: "var(--color-ink)" }}
          >
            NHS and private options for children
          </h3>
          <p
            className="mt-2 text-base leading-relaxed"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            We see children on both NHS and private pathways. We&rsquo;ll
            explain what&rsquo;s covered at your visit and won&rsquo;t push
            you toward private treatments if NHS is the right route.
          </p>
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
            Insured patients
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            <strong>A note on insurance.</strong> We accept several major
            dental insurance plans, but we don&rsquo;t publish the full list
            on the website — it changes often, and we&rsquo;d rather give you
            a straight answer than a stale one. Call us on +44 20 7946 0999
            with your plan details and we&rsquo;ll confirm in a minute.
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
            Nervous patients
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            If you&rsquo;re anxious about the visit, tell us when you book.
            We can plan a longer appointment, talk through each step before
            we do it, and pause whenever you need. Many of our patients
            started out nervous — you&rsquo;re not alone, and we won&rsquo;t
            rush you.
          </p>
        </div>
      </section>

      <BookingCTA
        headline="Book your first visit"
        subtext="A 30-minute new-patient appointment, just for you (and your child, if you're bringing them). Call us, or book online."
        ctaLabel="Book a check-up"
        phone={SITE.phone}
      />
      </NavbarFooter>
    </>
  );
}
