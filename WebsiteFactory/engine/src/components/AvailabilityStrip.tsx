"use client";

/*
 * AvailabilityStrip — the niche signature element. See
 * /Components/AvailabilityStrip/spec.md and
 * /Design-Systems/local-services/motion-and-signature.md before editing.
 * Reads all color from CSS custom properties so the same file works
 * across every business — only brand/colors.md changes.
 */

import { Circle } from "lucide-react";

export type AvailabilityStatus = "open" | "closed" | "closing-soon";

export interface AvailabilityStripProps {
  status?: AvailabilityStatus;
  nextAvailable?: string;
  acceptingNew?: boolean;
  ctaLabel?: string;
  ctaOverride?: string;
  onCtaClick?: () => void;
}

const statusConfig: Record<
  AvailabilityStatus,
  { label: string; dotClass: string }
> = {
  open: { label: "Open now", dotClass: "bg-emerald-500" },
  "closing-soon": { label: "Closing soon", dotClass: "bg-amber-500" },
  closed: {
    label: "Closed",
    dotClass: "bg-[color:var(--color-ink)] opacity-40",
  },
};

export default function AvailabilityStrip({
  status = "open",
  nextAvailable,
  acceptingNew = false,
  ctaLabel = "Book now",
  ctaOverride,
  onCtaClick,
}: AvailabilityStripProps) {
  const config = statusConfig[status];
  const label = ctaOverride ?? ctaLabel;

  return (
    <div
      className="w-full border-b"
      style={{
        backgroundColor: "var(--color-surface-alt)",
        borderColor: "var(--color-border)",
      }}
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm sm:px-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <Circle
              className={`h-2 w-2 fill-current motion-safe:animate-pulse motion-reduce:animate-none ${config.dotClass}`}
              aria-hidden="true"
            />
            <span style={{ color: "var(--color-ink)" }}>{config.label}</span>
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
          type="button"
          onClick={onCtaClick}
          className="rounded-full px-4 py-1.5 text-sm font-medium transition-opacity hover:opacity-90 motion-reduce:transition-none"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-surface)",
          }}
        >
          {label}
        </button>
      </div>
    </div>
  );
}