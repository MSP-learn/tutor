# Requirements

## Scope and Phase 3 context

Tutor is a static Astro + Starlight documentation site whose source of truth is
standard Markdown under `src/content/docs`. Phase 1 provides the GitHub Pages
shell and Phase 2 provides pull-request content checks. This slice confirms the
existing build-time code-block rendering path before later Phase 3 visual
primitives are added.

## Exit condition

The representative tutorial contains a language-tagged fenced code block, the
production build renders it as static syntax-highlighted HTML through the
existing Astro/Starlight Shiki path, and focused validation proves the generated
markup. Pull-request checks must continue to build the site before running that
focused assertion.

## Functional requirements

### R1. Standard Markdown source

- The example remains a `.md` file under `src/content/docs` with YAML
  frontmatter already required by the content schema.
- The code example uses a normal fenced Markdown block with an explicit
  `typescript` language tag.
- Contributors do not need to change application or configuration code to add a
  highlighted code block.

### R2. Build-time syntax highlighting

- `pnpm build` generates the tutorial as static HTML.
- The generated code block identifies its language as TypeScript and retains
  semantic `<pre>` and `<code>` elements.
- The generated block contains styled syntax-token markup emitted during the
  build by Astro/Starlight's Shiki integration.
- No runtime server, client-side highlighter, or content database is introduced.

### R3. Focused regression evidence

- `pnpm test:code-block` fails when the built tutorial is missing, when the
  TypeScript block is absent, or when Shiki token styling is absent.
- The pull-request workflow runs the focused check after `pnpm build`.

## Non-goals

- Callout syntax, responsive image processing, references or citations, Mermaid,
  navigation changes, search changes, and unrelated UI work.
