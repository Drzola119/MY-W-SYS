"use client";

/*
 * StaffBios — team/staff member cards. Real people only — sourced from
 * research/. If no staff info exists, this component is omitted from the
 * sitemap entirely rather than populated with placeholders. See
 * /Components/StaffBios/spec.md before editing.
 */

export interface StaffMember {
  name: string;
  role: string;
  bio: string;
  photo?: { src: string; alt: string };
}

export interface StaffBiosProps {
  heading?: string;
  intro?: string;
  staff: StaffMember[];
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

export default function StaffBios({
  heading = "Meet the team",
  intro,
  staff,
}: StaffBiosProps) {
  if (staff.length === 0) return null;

  return (
    <section
      className="w-full"
      style={{ backgroundColor: "var(--color-surface-alt)" }}
      aria-labelledby="staff-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <h2
            id="staff-heading"
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

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member, idx) => (
            <li
              key={`${member.name}-${idx}`}
              className="flex flex-col gap-4 rounded-2xl border p-6"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              {member.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.photo.src}
                  alt={member.photo.alt}
                  className="h-32 w-32 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span
                  className="flex h-32 w-32 items-center justify-center rounded-full text-2xl font-semibold"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-surface)",
                    fontFamily: "var(--font-display)",
                  }}
                  aria-hidden="true"
                >
                  {initials(member.name)}
                </span>
              )}

              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-ink)" }}
                >
                  {member.name}
                </h3>
                <p
                  className="mt-0.5 text-sm font-medium uppercase tracking-wide"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-utility)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {member.role}
                </p>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-ink)", opacity: 0.75 }}
              >
                {member.bio}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}