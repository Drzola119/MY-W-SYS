"use client";

import {
  AvailabilityStrip,
  BookingCTA,
  NavbarFooter,
  ServicesGrid,
} from "@factory/engine/components";
import type { ServiceItem, SocialLink } from "@factory/engine/components";
import { Globe } from "lucide-react";

import { Schema } from "@/app/Schema";
import { hours, navPages, services, SITE } from "@/lib/site";

/*
 * /whitening — FICTIONAL TEST DATA.
 * Cosmetic anchor page. Per website/copy/whitening.md, the practice
 * publishes one anchor price (in-chair whitening "From £X"); take-home
 * pricing is not published. No before/after imagery — section omitted
 * entirely per Templates/dentist-clinic.md ethical note.
 */

const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/fictitious.dental.test", Icon: Globe },
  { label: "Facebook", href: "https://www.facebook.com/fictitious-dental-test-page", Icon: Globe },
];

const whiteningServices: ServiceItem[] = [
  services[3],
  services[4],
];

export default function WhiteningPage() {
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
        ctaLabel="Book a whitening consultation"
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
            Teeth whitening in Camden
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg"
            style={{ color: "var(--color-ink)", opacity: 0.85 }}
          >
            In-chair whitening in a single visit, or take-home trays over two
            weeks. Both options are available at the practice — your dentist
            will recommend the right one at your consultation.
          </p>
        </div>
      </section>

      <section
        className="w-full"
        style={{ backgroundColor: "var(--color-surface-alt)" }}
      >
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          <div className="space-y-6">
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              Whitening is the cosmetic treatment we get the most questions
              about, and we keep it simple. You sit in the chair, we apply
              the product, you leave with a noticeably brighter smile. The
              whole visit is usually under an hour.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              If you&rsquo;d rather whiten at home, we make custom trays from
              a mould of your teeth, give you the gel, and check in at the
              end of the two-week course. It&rsquo;s a slower change, but
              you control the pace.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-ink)", opacity: 0.85 }}
            >
              We&rsquo;ll talk you through realistic outcomes at your
              consultation. Whitening works on natural teeth — it
              doesn&rsquo;t change the colour of crowns, veneers, or
              fillings. If you&rsquo;ve got visible restorations,
              we&rsquo;ll mention that upfront so there are no surprises.
            </p>
          </div>
        </div>
      </section>

      <ServicesGrid
        heading="What we offer"
        intro="The two options we provide. We'll recommend the right one at your consultation based on your starting shade and routine."
        items={whiteningServices}
        columns={2}
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
            What we don&rsquo;t do
          </h2>
          <ul className="mt-6 space-y-4">
            <li
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
                No before/after photos
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--color-ink)", opacity: 0.75 }}
              >
                We don&rsquo;t publish before/after imagery on our website or
                social channels. You&rsquo;ll see the shade changes during
                your own treatment.
              </p>
            </li>
            <li
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
                No hype
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--color-ink)", opacity: 0.75 }}
              >
                You&rsquo;ll see &ldquo;shade changes&rdquo;, not
                &ldquo;Hollywood smile&rdquo;.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <BookingCTA
        headline="Book a whitening consultation"
        subtext="A 30-minute conversation, no obligation. We'll tell you what's realistic for your teeth and let you decide."
        ctaLabel="Book a whitening consultation"
        phone={SITE.phone}
      />
      </NavbarFooter>
    </>
  );
}
