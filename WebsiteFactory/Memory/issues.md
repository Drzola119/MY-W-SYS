# Open Issues

Things that need a person's attention — blocked businesses, systemic
problems (e.g. a Standard that's proving too strict/loose in practice),
missing pieces (e.g. a Component that's still spec-only and keeps
getting needed). Not a place for routine per-business notes — those go
in `Businesses/<slug>/memory/`.

Format:
```
## YYYY-MM-DD — <short title>
Description. Who/what it's blocking. Status.
```

## 2026-08-04 — Footer social icons are visually generic (Globe for both)
**Status:** Backlog, do not fix now.

`lucide-react@1.28` removed brand icons (Facebook, Instagram) from
the package. The NavbarFooter footer in `@factory/engine` used to
accept a `socials[]: { label, href, Icon }` list and is wired up to use
real brand icons. Because of the upstream removal, all 8 pages of
the test business (`Businesses/london-dentist-fictitious`) render
with `Globe` as the icon for both Instagram and Facebook. The
`aria-label` still reads "Instagram" / "Facebook", so screen-reader
announcements are correct. Visual differentiation between platforms
is gone — the footer looks generic.

**Why deferred:** fixing it requires one of (a) inline SVG of the
brand marks (legal review per brand-guidelines), (b) a different icon
package that still ships brand icons, or (c) shipping brand assets
inside `@factory/engine`. Each of those needs a deliberate
decision, not a drive-by. Logged as a backlog.

**Resolution candidates when picked up:**
- Inline-svg brand marks owned by the engine, with `aria-label`
  carrying the platform name. Most portable.
- Replace `Globe` with a per-platform geometric token (e.g.
  square-for-FB, circle-for-IG). Differentiates visually without
  using any brand mark. Safest from a trademark standpoint.
- Switch to an icon package that hasn't dropped brand icons (if such
  a thing still exists in 2026 with a permissive license).

**Who it's blocking:** any business whose footer social row is a
user-visible brand cue. Cosmetic, not functional — a11y data is
intact. Acceptable to deploy a real business with this today, but
worth fixing before the engine spins up multiple brands.

