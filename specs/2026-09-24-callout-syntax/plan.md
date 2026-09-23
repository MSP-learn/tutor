# Plan

Implement the focused Phase 3 callout slice without adding runtime rendering or
changing Astro/Starlight’s static Markdown content path.

## 1. Document the native syntax

1. Keep the representative tutorial in standard Markdown under
   `src/content/docs`.
2. Use Starlight’s triple-colon aside directives for `note`, `tip`, and
   `caution`.
3. Use the native `danger` directive with the custom title `[Warning]` for
   warning-level guidance, because Starlight does not define a separate native
   `warning` type.

**Slice result:** Contributors have a copyable Markdown example for each of the
four requested callout meanings.

## 2. Confirm static output

1. Run the existing pull-request content checks.
2. Build the Astro site with `pnpm build`.
3. Inspect the generated tutorial HTML for the four static Starlight asides and
   the visible `Warning` title.

**Slice result:** Callouts render at build time without a custom runtime service.

## Non-goals

- No responsive image processing, references/citations, Mermaid, navigation,
  search, or unrelated UI changes.
- No replacement of Astro/Starlight Markdown rendering.
- No runtime services or client-side callout JavaScript.
