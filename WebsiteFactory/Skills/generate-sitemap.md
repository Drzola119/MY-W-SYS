# Skill — Generate Sitemap

Given `Templates/<subvertical>.md`'s recommended page structure and
`research/*.md`:

1. Start from the template's page list.
2. Remove any page/section that research shows doesn't apply (e.g. no
   membership tiers published → don't build a dedicated pricing page
   around invented numbers; fold a lighter pricing mention into
   Services instead).
3. Don't add pages the template and research don't both support.
4. Output `website/sitemap.md`: page list, one-line purpose per page,
   primary CTA per page.
