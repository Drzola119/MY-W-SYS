# Components

Assemble, don't invent. Every business's Build stage should be able to
produce a full site almost entirely by composing these, themed with that
business's own `brand/*.md` tokens.

| Component | Purpose | Status |
|---|---|---|
| `AvailabilityStrip` | Niche signature element — real-time-feeling open/booking status | Built (reference code included) |
| `Hero` | Page-opening section with orchestrated load sequence | Built (reference code included) |
| `ReviewsTicker` | Horizontal scroll of real Google review snippets | Spec only |
| `BookingCTA` | Persistent/repeated booking call-to-action | Spec only |
| `ServicesGrid` | Services/products list, sub-vertical aware | Spec only |
| `StaffBios` | Team/staff member cards | Spec only |
| `FAQ` | Accordion FAQ section | Spec only |
| `ContactLocation` | Map, hours, phone, address block | Spec only |
| `NavbarFooter` | Site nav + footer | Spec only |

"Spec only" components should be built out the first time a real business
needs them, then promoted here for reuse — don't let Build stages
one-off these silently. If a build produces one, copy it back here and
write its spec before moving on.

All components read color/type from CSS custom properties (`--color-*`,
per `Design-Systems/local-services/tokens.md`) rather than hardcoded
values, so the same component file works across every business — only the
tokens change.
