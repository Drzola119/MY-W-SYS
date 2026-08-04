"use client";

/*
 * ReviewsTicker — horizontal auto-scrolling row of real Google review
 * snippets. Volume-of-trust, not curated-best-three. See
 * /Components/ReviewsTicker/spec.md and
 * /Design-Systems/local-services/motion-and-signature.md before editing.
 * Pauses on hover/focus. Respects prefers-reduced-motion (static grid).
 */

import { Star } from "lucide-react";

export interface Review {
  initial: string;
  name?: string;
  rating: number;
  snippet: string;
  date: string;
}

export interface ReviewsTickerProps {
  reviews: Review[];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= rating ? "fill-current" : "opacity-30"
          }`}
          style={{ color: "var(--color-accent)" }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className="flex h-full w-72 shrink-0 flex-col gap-3 rounded-2xl border p-5"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-surface)",
              fontFamily: "var(--font-utility)",
            }}
            aria-hidden="true"
          >
            {review.initial}
          </span>
          <div className="flex flex-col">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-ink)" }}
            >
              {review.name ?? `${review.initial}.`}
            </span>
            <span
              className="text-xs"
              style={{
                color: "var(--color-ink)",
                opacity: 0.6,
                fontFamily: "var(--font-utility)",
              }}
            >
              {review.date}
            </span>
          </div>
        </div>
        <StarRow rating={review.rating} />
      </header>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--color-ink)", opacity: 0.85 }}
      >
        &ldquo;{review.snippet}&rdquo;
      </p>
    </article>
  );
}

export default function ReviewsTicker({ reviews }: ReviewsTickerProps) {
  if (reviews.length === 0) {
    return null;
  }

  // Duplicate the list so the marquee can loop seamlessly.
  const looped = [...reviews, ...reviews];

  return (
    <section
      aria-label="Customer reviews"
      className="w-full py-12 motion-reduce:py-8"
      style={{ backgroundColor: "var(--color-surface-alt)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          className="text-2xl font-semibold sm:text-3xl"
          style={{
            color: "var(--color-primary)",
            fontFamily: "var(--font-display)",
          }}
        >
          What people are saying
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--color-ink)", opacity: 0.7 }}
        >
          Real Google reviews &mdash; sourced from this business&rsquo;s profile.
        </p>
      </div>

      <div
        className="mt-8 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        {/* Static grid for users with prefers-reduced-motion. */}
        <div className="mx-auto hidden max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 motion-reduce:grid md:grid-cols-3">
          {reviews.map((r, idx) => (
            <ReviewCard key={`static-${idx}-${r.initial}`} review={r} />
          ))}
        </div>

        {/* Auto-scrolling marquee for everyone else. */}
        <div
          className="group flex w-max gap-4 px-4 motion-reduce:hidden"
          tabIndex={0}
          aria-label={`${reviews.length} reviews, scrolling automatically`}
        >
          <div
            className="flex shrink-0 gap-4 motion-safe:animate-[ticker_60s_linear_infinite] group-hover:[animation-play-state:paused] group-focus:[animation-play-state:paused]"
            style={{ willChange: "transform" }}
          >
            {looped.map((r, idx) => (
              <ReviewCard key={`a-${idx}-${r.initial}-${idx}`} review={r} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}