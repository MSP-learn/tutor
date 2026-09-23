# Plan

Implement the approved Tutor documentation experience and static search while preserving Astro/Starlight static output and the GitHub Pages `/tutor/` base path.

## 1. Design system

1. Define Tutor-specific warm paper, white surface, dark ink, muted text, border, amber accent, radius, shadow, typography, and spacing tokens.
2. Apply the tokens through Starlight's supported custom CSS/configuration without copying the portal implementation.
3. Style prose, links, code, asides, tables, and visible keyboard focus states.

## 2. Navigation and layout

1. Keep Starlight's semantic header, skip link, sidebar, table of contents, pagination, and generated HTML browse fallback.
2. Make the header sticky and the sidebar active state clear on desktop.
3. Configure drawer navigation and single-column reading behavior at tablet/mobile breakpoints.
4. Add narrow-screen overflow handling for tables and code blocks.

## 3. Search

1. Enable Starlight's built-in static Pagefind integration for every generated documentation page.
2. Keep the global header search, type-ahead suggestions, result snippets, and no-results messaging on the generated Pagefind UI.
3. Verify Pagefind assets and result links resolve below `/tutor/` without a server or runtime database.

## 4. Content and indexing

1. Preserve the existing Markdown tutorial and landing page as the initial indexed content.
2. Ensure generated headings, prose, and navigation remain indexable while shell chrome is excluded by Starlight.
3. Do not add diagrams, accounts, comments, or a broad content catalog as part of this slice.

## 5. Verification

1. Install from the committed pnpm lockfile and run the production Astro build.
2. Inspect generated `/tutor/` routes, assets, Pagefind files, search UI, and links.
3. Check keyboard focus, reduced-motion CSS, responsive layout rules, readable tables, and no-results/suggestion behavior in a browser-capable local preview.
4. Check the deployed `/tutor/` URL and representative tutorial/search navigation after GitHub Pages deployment.
