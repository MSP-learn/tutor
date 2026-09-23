# Tutor documentation experience and search design

## Design intent

Tutor keeps Starlight's semantic, statically generated documentation shell and adds a restrained visual layer inspired by the portal reference. The result should feel like Tutor: warm paper surfaces, dark ink, quiet borders, and an amber accent, without copying portal components or branding.

## Tokens

The custom stylesheet defines Tutor-specific tokens and maps them to Starlight's supported color and layout variables:

- Surfaces: warm paper `#f7f8f6`, stronger paper `#eef1ee`, and white content surfaces.
- Text: dark ink `#17211f`, soft ink `#4d5d59`, and muted ink `#778681`.
- Structure: thin neutral borders, modest `8px` radii, and a low-contrast `0 8px 24px` shadow.
- Accent: decorative amber `#d99518` with a pale amber surface, plus darker interactive amber `#7a5200` for link hover, focus outlines, and search controls.
- Layout: a readable `68rem` content width, a `17rem` desktop sidebar, and a `4rem` sticky navigation bar.
- Typography: system UI body text, tight display heading tracking, and a system monospace stack for code.

## Navigation and shell

Starlight owns the generated header, skip link, sidebar, table of contents, breadcrumbs, pagination, and semantic landmarks. The header remains sticky with a translucent paper surface. The desktop sidebar is a persistent browse rail with a clear active item; Starlight's mobile menu becomes the drawer. The generated HTML remains the browse fallback if client-side behavior is unavailable.

The existing sidebar is the source of truth for the current tutorial. No custom client-side navigation or duplicate portal shell is introduced.

## Tables and prose

Prose uses dark readable text, modest heading scale, visible links, and accent-bordered asides. Tables retain semantic headers and gain a horizontal overflow viewport on narrow screens rather than shrinking below a useful reading width. Code stays build-time highlighted and scrolls horizontally when needed.

## Responsive behavior

- **Desktop (above 50rem):** sticky header, persistent sidebar, wide prose column, and right-hand table of contents.
- **Tablet (between 30rem and 50rem):** sticky compact header, drawer navigation, full-width prose, and a compact table-of-contents treatment.
- **Mobile (up to 30rem):** single-column reading, compact typography and spacing, drawer navigation, and overflow-safe code/table surfaces.

Breakpoints change layout rather than content. There is no hover-only navigation or desktop-only search path.

## Keyboard and accessibility

Starlight's skip link, landmarks, sidebar controls, focus management, and Pagefind search controls remain in use. The custom layer adds a high-contrast `:focus-visible` outline using the darker interactive accent and does not remove outlines. Search is labeled by the built-in UI, supports keyboard type-ahead selection, exposes results and no-results messaging, and links to generated pages. Reduced-motion preferences disable decorative scrolling, transitions, and animation. Color is never the sole indicator of the active navigation item.

## Global and suggestion search

Starlight's built-in Pagefind integration is enabled for the statically generated documentation pages. The global header search opens the Pagefind interface, which searches titles and page content, presents matching snippets, and offers type-ahead suggestions as the query is entered. Empty queries expose the search affordance without requiring a catalog page; unmatched queries expose Pagefind's localized no-results state and recovery controls.

Pagefind assets are emitted at the configured Astro base path. Search results use generated relative/base-aware URLs, so the same static output works at `/tutor/` on GitHub Pages. No server, runtime database, custom index, or bespoke search API is introduced.
