// Components/AvailabilityStrip/AvailabilityStrip.jsx
//
// The niche signature element — see spec.md and
// Design-Systems/local-services/motion-and-signature.md before editing.
// Reads all color from CSS custom properties so it themes per-business
// with zero code changes: only brand/colors.md output changes.

import { Circle } from "lucide-react";

export default function AvailabilityStrip({
  status = "open", // "open" | "closed" | "closing-soon"
  nextAvailable, // e.g. "2:30pm today" — omit if no real data
  acceptingNew = false,
  ctaLabel = "Book now",
  onCtaClick = () => {},
}) {
  const statusConfig = {
    open: { label: "Open now", dot: "bg-emerald-500" },
    "closing-soon": { label: "Closing soon", dot: "bg-amber-500" },
    closed: { label: "Closed", dot: "bg-[var(--color-ink)] opacity-40" },
  }[status];

  return (
    <div
      className="w-full border-b"
      style={{
        backgroundColor: "var(--color-surface-alt)",
        borderColor: "var(--color-border)",
      }}
      role="status"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm sm:px-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <Circle
              className={`h-2 w-2 fill-current ${statusConfig.dot} motion-safe:animate-pulse motion-reduce:animate-none`}
              aria-hidden="true"
            />
            <span style={{ color: "var(--color-ink)" }}>
              {statusConfig.label}
            </span>
          </span>

          {nextAvailable && (
            <span
              className="hidden sm:inline"
              style={{ color: "var(--color-ink)", opacity: 0.75 }}
            >
              Next available&nbsp;{nextAvailable}
            </span>
          )}

          {acceptingNew && (
            <span
              className="hidden md:inline rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-surface)",
              }}
            >
              Accepting new clients
            </span>
          )}
        </div>

        <button
          onClick={onCtaClick}
          className="rounded-full px-4 py-1.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-surface)",
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
