# Requirements

## Scope and Phase 2 context

Tutor is an Astro + Starlight static documentation site whose source of truth is standard Markdown under `src/content/docs`. Phase 1 already provides the `/tutor/` GitHub Pages shell and default-branch deployment. Phase 2 makes invalid tutorial content visible and merge-blocking in pull requests while preserving that shell and its historical UI/search work.

## Exit condition

Phase 2 is complete when a pull request runs frozen-lockfile installation, Markdown lint, content tests, local content validation, and a production build; a broken tutorial fails with a diagnostic naming its source file and the relevant field or target; and a valid tutorial passes without application-code changes. Pages deployment remains limited to pushes to the default branch.

## Functional requirements

### R1. Minimal tutorial frontmatter

- Every tutorial must provide non-empty YAML frontmatter fields `title` and `description`.
- `title` and `description` are the only required contributor-facing frontmatter fields in Phase 2. `order`, `category`, authorship, tags, dates, and references are not required.
- Astro/Starlight's content schema in `src/content.config.ts` is the primary source of truth and validation mechanism.
- Missing or empty required fields must fail the Astro content/build validation with the Markdown source filename and field name in the error.

### R2. Canonical route identity

- A Markdown file's path under `src/content/docs` defines its generated route; the path is canonical and no frontmatter route field is introduced.
- `index.md` represents `/`; a nested `index.md` represents its directory route; another file represents its path with the `.md` suffix removed and trailing route slash.
- Duplicate generated routes must fail and identify the conflicting source files.

### R3. File-specific local content validation

- Local Markdown links must resolve to a generated tutorial route.
- Inline, full reference, collapsed reference, and shortcut reference Markdown links and images are subject to the same local-target checks.
- Fragment links must resolve to a heading slug or explicit HTML `id` anchor in the target document.
- Local image paths must resolve relative to the Markdown file or from `public/` for root paths.
- Markdown image alt text and HTML `<img>` alt attributes must be present and non-empty.
- Malformed percent-encoding in a local link target must be reported as a file-specific validation error rather than a raw decoder exception.
- Diagnostics must identify the repository-relative source file, line where available, and concrete failing target, anchor, image path, or `alt` field.
- Absolute URLs and protocol-relative URLs are external references and must not be fetched; external-link checks are network-independent and do not fail because a network is unavailable.

### R4. Markdown lint

- Pull requests must run the existing `pnpm lint:markdown` script using `markdownlint-cli2` against repository tutorial Markdown.
- Markdown lint failures must fail the pull-request job and retain the linter's source-file/line diagnostics.
- Phase 2 does not introduce prose rewriting or a second formatter that could silently alter tutorial content.

### R5. Pull-request checks and build

- A pull-request workflow must run `pnpm install --frozen-lockfile`.
- After installation it must run `pnpm lint:markdown`, `pnpm test:content`, `pnpm check:content`, and `pnpm build`.
- The checks must run on a GitHub-hosted runner with the repository's pinned action versions and Node.js 22/pnpm versions.
- `pnpm build` must validate the complete Astro/Starlight static site, including schema loading and route generation.
- The deployment workflow must remain triggered only by pushes to `main`; pull requests must not deploy Pages.

## Non-goals

- No replacement, removal, or duplicate implementation of the existing Astro/Starlight schema or `scripts/validate-content.mjs` and `scripts/test-content-check.mjs`.
- No network-dependent external-link crawling or external availability policy.
- No runtime service, database, MDX, browser-based editor, arbitrary contributor scripts, or responsive image processing.
- No new route metadata, categories, search changes, visual primitives, or redesign of existing UI/search work.
- No change to historical dated feature specifications other than this additive Phase 2 record.

## Acceptance evidence

The requirements pass when the local commands in `validation.md` succeed on the current valid content and the pull-request workflow contains each required command, while the existing content test demonstrates file-specific failures for missing links, anchors, image paths, alt text, reference-style targets, malformed percent-encoding, and required description frontmatter.
