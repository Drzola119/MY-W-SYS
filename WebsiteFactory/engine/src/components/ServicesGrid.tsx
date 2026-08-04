"use client";

/*
 * ServicesGrid — grid/list of services or programs. Card content varies
 * slightly by sub-vertical (see /Templates/<subvertical>.md). Never
 * invent a priceRange that research didn't find — omit the field instead
 * of guessing. See /Components/ServicesGrid/spec.md before editing.
 *
 * The `icon` prop is a string name (e.g. "Stethoscope") resolved via an
 * internal ICON_MAP below — that's how this stays usable from Server
 * Components without passing function values across the RSC boundary.
 */

import {
  Activity,
  Baby,
  Calendar,
  Clock,
  Footprints,
  HeartPulse,
  LucideIcon,
  Sparkles,
  Stethoscope,
  Sun,
  Wrench,
  Zap,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  Baby,
  Calendar,
  Clock,
  Footprints,
  HeartPulse,
  Sparkles,
  Stethoscope,
  Sun,
  Wrench,
  Zap,
};

export type ServiceIconName = keyof typeof ICON_MAP;

export interface ServiceItem {
  name: string;
  description: string;
  priceRange?: string;
  icon?: ServiceIconName;
  scheduleChip?: string;
}

export interface ServicesGridProps {
  heading: string;
  intro?: string;
  items: ServiceItem[];
  columns?: 2 | 3 | 4;
}

export default function ServicesGrid({
  heading,
  intro,
  items,
  columns = 3,
}: ServicesGridProps) {
  if (items.length === 0) return null;

  const colsClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
        ? "md:grid-cols-2 lg:grid-cols-4"
        : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--color-surface)" }}
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <h2
            id="services-heading"
            className="text-3xl font-semibold sm:text-4xl"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            {heading}
          </h2>
          {intro && (
            <p
              className="mt-3 text-base"
              style={{ color: "var(--color-ink)", opacity: 0.75 }}
            >
              {intro}
            </p>
          )}
        </div>

        <ul className={`mt-10 grid grid-cols-1 gap-6 ${colsClass}`}>
          {items.map((item, idx) => {
            const Icon = item.icon ? ICON_MAP[item.icon] : undefined;
            return (
              <li
                key={`${item.name}-${idx}`}
                className="flex flex-col gap-4 rounded-2xl border p-6 transition-shadow motion-reduce:transition-none hover:shadow-md"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  {Icon && (
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "var(--color-surface-alt)",
                        color: "var(--color-primary)",
                      }}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  )}
                  {item.scheduleChip && (
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: "var(--color-accent)",
                        color: "var(--color-primary)",
                        fontFamily: "var(--font-utility)",
                      }}
                    >
                      {item.scheduleChip}
                    </span>
                  )}
                </div>

                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-ink)" }}
                >
                  {item.name}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-ink)", opacity: 0.75 }}
                >
                  {item.description}
                </p>

                {item.priceRange && (
                  <p
                    className="mt-auto pt-2 text-sm font-medium"
                    style={{
                      color: "var(--color-primary)",
                      fontFamily: "var(--font-utility)",
                    }}
                  >
                    {item.priceRange}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}