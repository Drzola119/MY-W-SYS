"use client";

/*
 * NavbarFooter — site navigation + footer. Nav should be short — sitemap
 * from Stage 04 rarely needs more than 4–5 top-level links for this niche.
 * Footer repeats phone/address/hours (many visitors scroll straight to the
 * bottom looking for this) plus socials. See
 * /Components/NavbarFooter/spec.md before editing.
 */

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export interface NavPage {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  Icon: LucideIcon;
}

export interface HoursEntry {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface NavbarFooterProps {
  brandName: string;
  pages: NavPage[];
  phone: string;
  address: string;
  hours?: HoursEntry[];
  socials?: SocialLink[];
  /* Page content. Rendered inside <main> between the header and footer. */
  children?: ReactNode;
}

function todayHoursLine(hours: HoursEntry[] | undefined): string {
  if (!hours || hours.length === 0) return "";
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = days[new Date().getDay()];
  const entry = hours.find((h) => h.day === today);
  if (!entry) return "";
  return entry.closed ? "Closed today" : `Today ${entry.open} – ${entry.close}`;
}

export default function NavbarFooter({
  brandName,
  pages,
  phone,
  address,
  hours,
  socials = [],
  children,
}: NavbarFooterProps) {
  const [open, setOpen] = useState(false);
  const [todayLine, setTodayLine] = useState("");

  // SSR-safe "today" computation: server and client can disagree on
  // `new Date().getDay()`, so we render the today line only after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayLine(todayHoursLine(hours));
  }, [hours]);

  return (
    <>
      <header
        className="sticky top-0 z-30 w-full border-b backdrop-blur"
        style={{
          backgroundColor: "color-mix(in oklab, var(--color-surface) 92%, transparent)",
          borderColor: "var(--color-border)",
        }}
      >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="text-base font-semibold sm:text-lg"
          style={{
            color: "var(--color-primary)",
            fontFamily: "var(--font-display)",
          }}
        >
          {brandName}
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {pages.map((p) => (
            <li key={p.href}>
              <a
                href={p.href}
                className="text-sm font-medium hover:opacity-70 motion-reduce:transition-none"
                style={{ color: "var(--color-ink)" }}
              >
                {p.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-opacity hover:opacity-90 motion-reduce:transition-none"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-surface)",
              }}
            >
              Call&nbsp;{phone}
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="md:hidden text-sm font-medium"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          style={{ color: "var(--color-primary)" }}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-nav"
          className="flex flex-col gap-2 border-t px-4 py-3 md:hidden"
          style={{ borderColor: "var(--color-border)" }}
        >
          {pages.map((p) => (
            <li key={`m-${p.href}`}>
              <a
                href={p.href}
                className="block py-1 text-sm font-medium"
                style={{ color: "var(--color-ink)" }}
                onClick={() => setOpen(false)}
              >
                {p.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="mt-2 inline-block rounded-full px-4 py-1.5 text-sm font-medium"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-surface)",
              }}
              onClick={() => setOpen(false)}
            >
              Call&nbsp;{phone}
            </a>
          </li>
        </ul>
      )}
      </header>

      <main>{children}</main>

      <footer
        className="w-full border-t"
        style={{
          backgroundColor: "var(--color-surface-alt)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div>
            <p
              className="text-base font-semibold"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-display)",
              }}
            >
              {brandName}
            </p>
            {todayLine && (
              <p
                className="mt-2 text-sm"
                style={{
                  color: "var(--color-ink)",
                  opacity: 0.7,
                  fontFamily: "var(--font-utility)",
                }}
              >
                {todayLine}
              </p>
            )}
          </div>

          <div>
            <p
              className="text-xs font-medium uppercase tracking-wide"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-utility)",
                letterSpacing: "0.08em",
              }}
            >
              Pages
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {pages.map((p) => (
                <li key={`f-${p.href}`}>
                  <a
                    href={p.href}
                    className="hover:opacity-70"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-xs font-medium uppercase tracking-wide"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-utility)",
                letterSpacing: "0.08em",
              }}
            >
              Contact
            </p>
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--color-ink)" }}
            >
              {address}
            </p>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="mt-1 inline-block text-sm font-medium hover:underline"
              style={{ color: "var(--color-primary)" }}
            >
              {phone}
            </a>
          </div>

          <div>
            <p
              className="text-xs font-medium uppercase tracking-wide"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-utility)",
                letterSpacing: "0.08em",
              }}
            >
              Follow
            </p>
            {socials.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:opacity-80 motion-reduce:transition-none"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-surface)",
                      }}
                    >
                      <s.Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className="mt-3 text-xs"
                style={{ color: "var(--color-ink)", opacity: 0.5 }}
              >
                No social profiles yet.
              </p>
            )}
          </div>
        </div>

        <div
          className="border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="mx-auto max-w-6xl px-4 py-4 text-xs sm:px-6"
            style={{
              color: "var(--color-ink)",
              opacity: 0.5,
              fontFamily: "var(--font-utility)",
            }}
          >
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}