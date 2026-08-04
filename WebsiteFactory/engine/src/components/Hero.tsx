"use client";

/*
 * Hero — page-opening section, sits directly below AvailabilityStrip.
 * See /Components/Hero/spec.md and
 * /Design-Systems/local-services/motion-and-signature.md before editing.
 * One orchestrated load sequence on mount: headline → subhead → CTA → image,
 * staggered ~120ms apart, total under 600ms. Respects prefers-reduced-motion.
 */

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export interface RatingBadge {
  score: number;
  count: number;
}

export interface HeroImage {
  src: string;
  alt: string;
}

export interface HeroProps {
  headline: string;
  subhead: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  ratingBadge?: RatingBadge;
  image?: HeroImage;
}

const STAGGER_MS = 120;
const REVEAL_DURATION = "duration-500";

export default function Hero({
  headline,
  subhead,
  ctaLabel = "Book now",
  onCtaClick,
  ratingBadge,
  image,
}: HeroProps) {
  const [mounted, setMounted] = useState(false);

  // Mount-time trigger so the staggered reveal only runs after the first
  // client render. SSR renders the hidden state, then the effect flips
  // `mounted` and the staggered transition plays. Lint flags this as
  // setState-in-effect; the pattern is intentional for mount animations.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const stagger = (index: number): React.CSSProperties => ({
    transitionDelay: `${index * STAGGER_MS}ms`,
  });

  const baseTransition = `transition-all ${REVEAL_DURATION} ease-out motion-reduce:transition-none motion-reduce:transform-none`;
  const hiddenState = "opacity-0 translate-y-3";
  const shownState = "opacity-100 translate-y-0";
  const reveal = (): string =>
    `${baseTransition} ${mounted ? shownState : hiddenState}`;

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
        <div>
          {ratingBadge && (
            <div
              className={`mb-4 flex items-center gap-1.5 text-sm ${reveal()}`}
              style={stagger(0)}
            >
              <Star
                className="h-4 w-4 fill-current"
                style={{ color: "var(--color-accent)" }}
                aria-hidden="true"
              />
              <span style={{ color: "var(--color-ink)" }}>
                {ratingBadge.score} ({ratingBadge.count} reviews)
              </span>
            </div>
          )}

          <h1
            className={`text-4xl font-semibold leading-tight sm:text-5xl ${reveal()}`}
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-display)",
              ...stagger(1),
            }}
          >
            {headline}
          </h1>

          <p
            className={`mt-4 max-w-md text-lg ${reveal()}`}
            style={{
              color: "var(--color-ink)",
              opacity: 0.85,
              ...stagger(2),
            }}
          >
            {subhead}
          </p>

          <button
            type="button"
            onClick={onCtaClick}
            className={`mt-8 rounded-full px-6 py-3 text-base font-medium transition-opacity hover:opacity-90 ${reveal()}`}
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-surface)",
              ...stagger(3),
            }}
          >
            {ctaLabel}
          </button>
        </div>

        {image && (
          <div
            className={`overflow-hidden rounded-2xl ${reveal()}`}
            style={stagger(4)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        )}
      </div>
    </section>
  );
}