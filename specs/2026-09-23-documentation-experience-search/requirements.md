# Requirements

## Scope and context

Tutor remains an Astro + Starlight static documentation site built from Markdown and published at the GitHub Pages project path `/tutor/`. This slice turns the Phase 1 shell into a portal-inspired, responsive reading experience and adds the approved global and suggestion search using Starlight's built-in Pagefind integration.

## Functional requirements

### R1. Static architecture and base path

- Keep Astro, Starlight, TypeScript, pnpm, static output, and the existing GitHub Pages site/base configuration.
- Generate all search assets at build time; do not add a server, runtime database, account, or content API.
- Ensure navigation, Pagefind assets, and search result links work below `/tutor/`.

### R2. Tutor visual system

- Use Tutor-specific warm paper/white surfaces, dark ink, muted text, thin borders, amber accent, modest shadows, and restrained radii.
- Apply the design through Starlight's supported custom CSS/configuration.
- Keep the existing Markdown tutorial readable with styled headings, links, prose, asides, code, and tables.

### R3. Navigation and responsive layout

- Preserve Starlight's semantic header, skip link, sidebar, table of contents, pagination, and generated HTML browse behavior.
- Provide a sticky header and clear desktop sidebar active state.
- At tablet and mobile widths, use the supported drawer navigation and a single-column reading layout.
- Tables and code must remain readable through narrow-screen horizontal overflow rather than clipping.

### R4. Global search

- Enable Starlight's built-in static Pagefind search for all documentation pages.
- Expose search from the global header and load the generated Pagefind index at runtime in the browser only.
- Search titles and page content and present result titles, snippets, and links to generated documentation routes.

### R5. Suggestion, empty, and no-results states

- As a query is entered, the built-in Pagefind UI provides keyboard-operable type-ahead suggestions/results.
- An empty query keeps the search control usable without requiring a server or a custom catalog.
- A query with no match presents an explicit Pagefind no-results message and recovery affordance.
- Search controls and results remain usable with keyboard navigation and assistive technology.

### R6. Progressive enhancement and accessibility

- Generated HTML must preserve reading and browse navigation when optional search JavaScript or Pagefind assets are unavailable.
- Preserve semantic landmarks, labels, skip navigation, visible `:focus-visible` treatment, sufficient contrast, and reduced-motion behavior.
- Do not make hover, color, animation, or a pointer gesture the only way to discover or operate a feature.

## Non-goals

- No runtime search service, database, custom search API, user accounts, comments, or content editor.
- No later diagrams, broad content catalog, or new tutorial authoring contract.
- No portal branding, copied portal components, or portal source changes.
- No replacement of Starlight's semantic shell with a bespoke client-side application.

## Acceptance outcome

The existing tutorial remains readable and discoverable in a warm, responsive Starlight shell. A reader can open global search, type a query, select a suggested/result entry, read its snippet, and receive a clear no-results state. A production build emits static Pagefind assets and base-path-correct routes that can be published unchanged below `/tutor/` on GitHub Pages.
