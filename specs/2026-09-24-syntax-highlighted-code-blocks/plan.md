# Plan

Implement the focused Phase 3 syntax-highlighted code-block slice without adding
runtime rendering or changing the static Astro/Starlight content path.

## 1. Confirm the existing rendering path

1. Keep tutorial source in standard Markdown under `src/content/docs`.
2. Use a language-tagged fenced code block in the existing first tutorial.
3. Let Astro/Starlight use its existing build-time Shiki integration; do not add a
   client-side highlighter, custom component, or runtime service.

**Slice result:** The built tutorial contains a static, language-labelled,
syntax-highlighted code block.

## 2. Add focused build evidence

1. Add `pnpm test:code-block` to inspect the generated tutorial HTML.
2. Require the expected TypeScript language marker, semantic `<pre>/<code>`
   structure, and styled Shiki token output.
3. Run the focused check after the production build in pull-request validation.

**Slice result:** A future regression in the generated code-block markup fails a
small, file-specific check instead of being hidden by a successful build.

## Non-goals

- No callouts, responsive image processing, references/citations, Mermaid, or
  navigation changes.
- No replacement of Astro/Starlight Markdown rendering.
- No runtime services or client-side syntax-highlighting JavaScript.
