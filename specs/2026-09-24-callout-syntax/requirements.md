# Requirements

## Scope and Phase 3 context

Tutor is a static Astro + Starlight documentation site whose source of truth is
standard Markdown under `src/content/docs`. Phase 1 provides the GitHub Pages
shell and Phase 2 provides pull-request content checks. This slice documents the
native callout syntax needed for the core visual content phase.

## Exit condition

The representative tutorial demonstrates note, tip, caution, and warning
callouts in standard Markdown. Astro/Starlight renders each example as a static,
accessible aside during the production build, and the existing pull-request
content checks continue to pass.

## Functional requirements

### R1. Standard Markdown source

- The example remains a `.md` file under `src/content/docs` with the required
  YAML frontmatter.
- Callouts use Starlight’s native triple-colon Markdown syntax.
- Contributors do not need to change application or configuration code to add a
  callout.

### R2. Four documented callout meanings

- `:::note` documents supplementary context.
- `:::tip` documents a helpful suggestion.
- `:::caution` documents a possible problem or unexpected result.
- `:::danger[Warning]` documents a serious mistake with the visible title
  “Warning”. Starlight’s native Markdown aside types use `danger` rather than a
  separate `warning` type, so the custom title preserves the requested warning
  meaning without introducing a custom renderer.

### R3. Static rendering

- `pnpm build` generates the tutorial as static HTML.
- The generated page contains one rendered aside for each documented callout
  type and preserves the warning title.
- No runtime server, client-side callout component, or content database is
  introduced.

## Non-goals

- Responsive image processing, references or citations, Mermaid, navigation,
  search, raw-HTML policy enforcement, or unrelated UI changes.
- New Astro components, custom Markdown plugins, or runtime services.
