# Skill — Extract Colors From Logo

Given a logo image or brand photos from `research/`:

1. Identify the 1–2 dominant, intentional brand colors (ignore
   incidental colors like a white background or a person's clothing in
   a random photo).
2. Convert to hex, check against WCAG AA contrast on both a light and
   dark background to decide which pairing works for body text.
3. Generate a neutral scale (5–7 steps) that complements the primary
   without competing with it.
4. Pick exactly one accent — either the secondary brand color if there
   is a clear one, or a derived complementary tone. Don't add a second
   accent that wasn't asked for.
5. Write the result into `brand/colors.md` as CSS custom properties
   plus a one-line rationale for each choice.

If no usable logo/photo material exists, say so explicitly and fall
back per `Design-Systems/local-services/tokens.md` — flag the fallback,
don't silently apply it.
