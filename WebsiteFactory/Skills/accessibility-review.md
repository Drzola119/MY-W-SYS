# Skill — Accessibility Review

Beyond automated Lighthouse/axe scores, manually verify:

- Tab through the whole page — every interactive element reachable,
  focus visible, order logical
- Every image has meaningful alt text (or empty alt for decorative
  images) — not the filename, not "image"
- Color contrast holds for the actual rendered brand colors, not just
  the reference palette
- Forms have real labels, not placeholder-text-as-label
- `prefers-reduced-motion` genuinely disables the hero load sequence
  and scroll reveals when set

Record results in the same `qa-report.md` as the general QA skill.
