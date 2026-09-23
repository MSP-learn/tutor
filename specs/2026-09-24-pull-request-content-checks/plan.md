# Plan

Implement the completed Phase 2 pull-request content checks slice from the Tutor road map. This specification records the small, static validation path that protects Markdown tutorials before they can reach the default-branch Pages deployment.

## Phase 2 context and exit condition

Phase 1 established the Astro/Starlight documentation shell, the `/tutor/` GitHub Pages base path, one Markdown tutorial, and default-branch-only deployment. The existing content schema and validation scripts are the implementation foundation for Phase 2; this slice adds the contributor-facing specification and pull-request automation without replacing them.

**Exit condition:** A broken tutorial is rejected in a pull request with a file-specific explanation, while a valid tutorial passes every required check without application-code changes. A pull request must install from the lockfile, pass Markdown lint, pass the content test suite, pass local content validation, and build the complete static site. Only a successful push to the default branch may deploy Pages.

## 1. Define the minimal tutorial frontmatter schema

1. Keep Astro/Starlight content schema as the primary enforcement point in `src/content.config.ts`.
2. Require exactly the two contributor-facing fields needed by the current contract: non-empty `title` and non-empty `description`.
3. Do not introduce required `order`, `category`, authorship, tags, review dates, or source-reference fields in Phase 2.
4. Preserve the existing schema and its file/field diagnostics; the content test exercises a missing-description fixture through the Astro build.

**Decision:** Required frontmatter is `title` plus `description` only. Astro/Starlight schema validation, rather than a second hand-written frontmatter parser, is authoritative.

## 2. Establish canonical routes and local-reference checks

1. Treat the Markdown file path under `src/content/docs` as the canonical route identity: `index.md` maps to `/`, a directory `index.md` maps to that directory route, and another Markdown file maps to its path without `.md`.
2. Reject duplicate generated routes with both source file paths in the diagnostic.
3. Check local Markdown links against generated tutorial routes and heading/explicit anchors.
4. Check local image paths against the source document or `public/` and require non-empty alt text for Markdown images and HTML `<img>` elements.
5. Leave absolute URLs, protocol-relative URLs, and other external links network-independent: they are not fetched by local validation.

**Decision:** File path is canonical route identity. Link and image validation is repository-local and deterministic.

## 3. Add the pull-request check workflow

1. Add a pull-request-only GitHub Actions workflow using the pinned checkout, pnpm setup, and Node setup actions already used by deployment.
2. Install with `pnpm install --frozen-lockfile`.
3. Run, in order, `pnpm lint:markdown`, `pnpm test:content`, `pnpm check:content`, and `pnpm build`.
4. Keep `.github/workflows/deploy.yml` restricted to pushes on `main`; pull requests must never publish a Pages artifact or deployment.

**Result:** Every pull request receives the same deterministic content and production-build checks before merge.

## 4. Record executable evidence

1. Run the local commands from the validation specification on Node.js 22 and the committed pnpm lockfile.
2. Confirm the current valid tutorial passes all content checks and the static build.
3. Confirm the content test covers broken local links, anchors, image paths, empty alt text, and missing required frontmatter with source-file/field diagnostics.
4. Report command results and retain the check names as the pull-request contract.

## Non-goals

- No replacement or removal of the existing Astro/Starlight schema or content scripts.
- No network-dependent external-link checker; external-link policy remains intentionally network-independent.
- No runtime server, database, content service, browser editor, MDX, Mermaid, callout system, or responsive image processing.
- No search, navigation redesign, or changes to the historical Phase 1 and documentation-experience/search specifications.
- No changes to Pages deployment triggers beyond preserving default-branch-only deployment.
