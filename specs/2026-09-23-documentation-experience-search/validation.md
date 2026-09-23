# Validation

## 1. Install and static build

- Use Node.js 22 LTS and install from `pnpm-lock.yaml` with `pnpm install --frozen-lockfile`.
- Run `pnpm build` and require a zero exit status.
- Confirm the build remains static and emits the landing page and tutorial route.
- Confirm `dist/pagefind/` contains the Pagefind runtime, index, fragments, and UI assets.

## 2. Generated route and base-path checks

- Inspect generated HTML for `/tutor/`-prefixed stylesheet, script, navigation, canonical, and Pagefind references.
- Confirm the tutorial route is `/tutor/tutorials/first-tutorial/` and its source remains Markdown.
- Confirm selecting a search result resolves to a generated `/tutor/` page rather than a domain-root path.

## 3. Search behavior checks

In a local production preview and the deployed site:

- Open the global header search with a pointer and keyboard shortcut/control, then focus the search input.
- Enter a term from the tutorial and verify type-ahead suggestions/results, title, snippet, and navigation link.
- Move through suggestions/results with the keyboard and activate one without a pointer.
- Enter an unmatched term and verify the explicit no-results message and clear/recovery control.
- Verify the empty search control remains usable and no server request is required beyond static Pagefind assets.

## 4. Responsive and accessibility checks

At desktop, tablet, and mobile viewport widths:

- Verify the sticky header, desktop sidebar, mobile drawer, and table-of-contents treatment match the responsive design.
- Verify prose remains readable, tables and code scroll horizontally without clipping, and no layout depends on hover.
- Verify skip navigation, landmarks, sidebar/search labels, active navigation, and `:focus-visible` outlines.
- Enable reduced motion and verify decorative transitions, scrolling, and animations are suppressed.
- Run a representative keyboard pass and an accessibility audit on the landing and tutorial pages.

## 5. Deployed `/tutor/` checks

After the normal GitHub Pages deployment:

- Open `https://msp-learn.github.io/tutor/` and `https://msp-learn.github.io/tutor/tutorials/first-tutorial/`.
- Confirm the pages, navigation, styles, Pagefind assets, suggestions, snippets, and no-results state load under `/tutor/`.
- Confirm the existing tutorial heading, prose, and code example remain present.

## Pass criteria

The static build succeeds, generated assets and links honor `/tutor/`, search provides global results and suggestions plus an explicit no-results state, responsive/accessibility checks pass, and the deployed routes remain readable. No server or runtime database is introduced.
