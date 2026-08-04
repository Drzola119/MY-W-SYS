"use client";

/*
 * ContactLocation — map embed + hours + phone + address. NAP must match
 * the Google Business Profile exactly (see Standards/quality-standards.md
 * — NAP consistency is a local SEO hard requirement, not just correctness).
 * See /Components/ContactLocation/spec.md before editing.
 */

import { Clock, MapPin, Phone } from "lucide-react";

export interface HoursEntry {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface ContactLocationProps {
  heading?: string;
  address: string;
  phone: string;
  hours: HoursEntry[];
  mapEmbedUrl?: string;
}

export default function ContactLocation({
  heading = "Visit us",
  address,
  phone,
  hours,
  mapEmbedUrl,
}: ContactLocationProps) {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--color-surface-alt)" }}
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <h2
            id="contact-heading"
            className="text-3xl font-semibold sm:text-4xl"
            style={{
              color: "var(--color-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            {heading}
          </h2>

          <dl className="mt-8 space-y-6">
            <div className="flex gap-4">
              <dt
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "var(--color-surface)",
                  color: "var(--color-primary)",
                }}
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </dt>
              <dd>
                <p
                  className="text-sm font-medium uppercase tracking-wide"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-utility)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Address
                </p>
                <p
                  className="mt-1 text-base"
                  style={{ color: "var(--color-ink)" }}
                >
                  {address}
                </p>
              </dd>
            </div>

            <div className="flex gap-4">
              <dt
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "var(--color-surface)",
                  color: "var(--color-primary)",
                }}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </dt>
              <dd>
                <p
                  className="text-sm font-medium uppercase tracking-wide"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-utility)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Phone
                </p>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="mt-1 inline-block text-base font-medium underline-offset-4 hover:underline"
                  style={{ color: "var(--color-primary)" }}
                >
                  {phone}
                </a>
              </dd>
            </div>

            <div className="flex gap-4">
              <dt
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "var(--color-surface)",
                  color: "var(--color-primary)",
                }}
              >
                <Clock className="h-4 w-4" aria-hidden="true" />
              </dt>
              <dd>
                <p
                  className="text-sm font-medium uppercase tracking-wide"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-utility)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Hours
                </p>
                <ul className="mt-1 space-y-1 text-base">
                  {hours.map((entry) => (
                    <li
                      key={entry.day}
                      className="flex items-center justify-between gap-4"
                    >
                      <span style={{ color: "var(--color-ink)" }}>
                        {entry.day}
                      </span>
                      <span
                        style={{
                          color: "var(--color-ink)",
                          opacity: entry.closed ? 0.5 : 0.85,
                          fontFamily: "var(--font-utility)",
                        }}
                      >
                        {entry.closed ? "Closed" : `${entry.open} – ${entry.close}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>

        <div
          className="overflow-hidden rounded-2xl border"
          style={{ borderColor: "var(--color-border)" }}
        >
          {mapEmbedUrl ? (
            <iframe
              title={`Map showing ${address}`}
              src={mapEmbedUrl}
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div
              className="flex h-full min-h-[360px] items-center justify-center p-8 text-center text-sm"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-ink)",
                opacity: 0.6,
              }}
            >
              Map embed pending — research should supply a Google Maps
              embed URL for this address.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}