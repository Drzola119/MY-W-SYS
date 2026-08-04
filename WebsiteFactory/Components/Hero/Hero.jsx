// Components/Hero/Hero.jsx
//
// See spec.md. Sits directly below AvailabilityStrip — keep this section
// disciplined; the strip already carries the design's signature moment.

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function Hero({
  headline,
  subhead,
  ctaLabel = "Book now",
  onCtaClick = () => {},
  ratingBadge, // { score: 4.9, count: 214 } — omit if not real
  image, // { src, alt } — real photo only
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stagger = (index) => ({
    transitionDelay: `${index * 120}ms`,
  });

  const baseTransition =
    "transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none";
  const hiddenState = "opacity-0 translate-y-3";
  const shownState = "opacity-100 translate-y-0";

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
        <div>
          {ratingBadge && (
            <div
              className={`mb-4 flex items-center gap-1.5 text-sm ${baseTransition} ${
                mounted ? shownState : hiddenState
              }`}
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
            className={`text-4xl font-semibold leading-tight sm:text-5xl ${baseTransition} ${
              mounted ? shownState : hiddenState
            }`}
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-display)",
              ...stagger(1),
            }}
          >
            {headline}
          </h1>

          <p
            className={`mt-4 max-w-md text-lg ${baseTransition} ${
              mounted ? shownState : hiddenState
            }`}
            style={{ color: "var(--color-ink)", opacity: 0.85, ...stagger(2) }}
          >
            {subhead}
          </p>

          <button
            onClick={onCtaClick}
            className={`mt-8 rounded-full px-6 py-3 text-base font-medium transition-opacity hover:opacity-90 ${baseTransition} ${
              mounted ? shownState : hiddenState
            }`}
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
            className={`overflow-hidden rounded-2xl ${baseTransition} ${
              mounted ? shownState : hiddenState
            }`}
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
