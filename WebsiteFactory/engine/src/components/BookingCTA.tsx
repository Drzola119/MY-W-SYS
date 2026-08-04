"use client";

/*
 * BookingCTA — repeated mid/end-of-page call-to-action block, distinct
 * from the AvailabilityStrip's persistent top-of-page CTA. See
 * /Components/BookingCTA/spec.md before editing.
 */

import { Phone } from "lucide-react";

export interface BookingCTAProps {
  headline: string;
  subtext?: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  phone?: string;
  tone?: "surface" | "primary";
}

export default function BookingCTA({
  headline,
  subtext,
  ctaLabel,
  onCtaClick,
  phone,
  tone = "surface",
}: BookingCTAProps) {
  const isPrimary = tone === "primary";
  const bg = isPrimary ? "var(--color-primary)" : "var(--color-surface-alt)";
  const headingColor = isPrimary ? "var(--color-surface)" : "var(--color-primary)";
  const subColor = isPrimary ? "var(--color-surface)" : "var(--color-ink)";
  const buttonBg = isPrimary ? "var(--color-accent)" : "var(--color-primary)";
  const buttonFg = isPrimary ? "var(--color-primary)" : "var(--color-surface)";

  return (
    <section
      className="w-full"
      style={{ backgroundColor: bg }}
      aria-labelledby="booking-cta-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 md:py-20">
        <h2
          id="booking-cta-heading"
          className="text-3xl font-semibold leading-tight sm:text-4xl"
          style={{
            color: headingColor,
            fontFamily: "var(--font-display)",
          }}
        >
          {headline}
        </h2>

        {subtext && (
          <p
            className="max-w-xl text-base"
            style={{ color: subColor, opacity: 0.85 }}
          >
            {subtext}
          </p>
        )}

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={onCtaClick}
            className="rounded-full px-6 py-3 text-base font-medium transition-opacity hover:opacity-90 motion-reduce:transition-none"
            style={{
              backgroundColor: buttonBg,
              color: buttonFg,
            }}
          >
            {ctaLabel}
          </button>

          {phone && (
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline motion-reduce:transition-none"
              style={{ color: headingColor }}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              or call&nbsp;{phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}