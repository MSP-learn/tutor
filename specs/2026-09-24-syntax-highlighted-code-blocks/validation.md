# Validation

Run these commands from the repository root with Node.js 22 LTS and the
committed pnpm lockfile.

## 1. Reproducible installation

```sh
pnpm install --frozen-lockfile
```

**Pass:** dependencies install from the lockfile without changing it.

## 2. Existing content checks

```sh
pnpm lint:markdown
pnpm test:content
pnpm check:content
```

**Pass:** the Phase 2 Markdown, content behavior, and local-reference checks
continue to pass for the updated tutorial.

## 3. Production build

```sh
pnpm build
```

**Pass:** Astro/Starlight statically generates
`dist/tutorials/first-tutorial/index.html` from the Markdown tutorial.

## 4. Focused code-block assertion

```sh
pnpm test:code-block
```

**Pass:** the check finds the generated TypeScript `<pre data-language="typescript">`
block, its nested `<code>` element, and styled Shiki token markup. It reports a
clear failure when the built page is missing or the expected highlighted block is
not present.

## 5. Pull-request workflow

`.github/workflows/content-checks.yml` runs the focused assertion after the
production build. The existing deployment workflow remains restricted to pushes
to `main`; this slice does not change deployment triggers.

## Executable pass/fail summary

The slice passes when installation, all existing content checks, the static build,
and `pnpm test:code-block` exit 0. A missing language marker, semantic code-block
structure, or Shiki token styling is a validation failure.
