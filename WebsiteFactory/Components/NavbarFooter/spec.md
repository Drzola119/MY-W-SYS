# Component — NavbarFooter

Site navigation + footer. Nav should be short — sitemap from Stage 04
rarely needs more than 4–5 top-level links for this niche. Footer
repeats phone/address/hours (many visitors scroll straight to the
bottom looking for this) plus social links found in research.

Props: `brandName`, `pages: [{ label, href }]`, `phone`, `address`,
`hours`, `socials`, `children`.

## It wraps the page — do not self-close it

The component renders three siblings: `<header>` (sticky nav),
`<main>{children}</main>`, and `<footer>`. Page content goes in as
children:

```tsx
<NavbarFooter brandName={...} pages={...} phone={...} address={...}>
  <Hero ... />
  <ServicesGrid ... />
</NavbarFooter>
```

Rendering it self-closed (`<NavbarFooter ... />`) produces a page with
no `<main>` landmark and a footer stuck under the nav at the top of
the page, because the sticky header sits before all page content in
the DOM. This was a real bug caught in the first QA pass on
`london-dentist-fictitious` — HTTP 200 checks did not catch it, only
inspecting element order in the prerendered HTML did.
