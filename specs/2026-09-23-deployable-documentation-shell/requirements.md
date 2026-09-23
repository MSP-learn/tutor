# Requirements

## Scope

Deliver **Phase 1: Deployable documentation shell** from `specs/Constitution/road-map.md`. The result is the smallest useful Tutor site: one statically rendered Markdown tutorial that can be built and published to GitHub Pages. Do not implement Phase 2 or later content validation, visual primitives, search, or contribution tooling beyond what is needed to build and deploy this shell.

## Functional requirements

### R1. Astro and Starlight shell

- The repository contains an Astro project using Starlight and TypeScript.
- The project uses Node.js 22 LTS and pnpm with a committed lockfile.
- The site renders static HTML and does not require a runtime server, database, account system, or client-side content store.
- The Starlight shell provides a readable document layout and working top-level navigation for the example page.

### R2. GitHub Pages path

- Configure the site for the `MSP-learn/tutor` GitHub Pages project path.
- Generated links and assets work below the `/tutor/` base path rather than assuming the domain root.
- The configuration remains suitable for publishing through the repository's GitHub Pages deployment environment.

### R3. Example tutorial

- Add one small tutorial as standard Markdown with YAML frontmatter containing the fields needed by the Starlight page and navigation, at minimum a title and description.
- Give the tutorial a stable route under `/tutorials/`; the planned example route is `/tutorials/first-tutorial/`.
- The page contains a short explanatory introduction and at least one readable code example, with no executable contributor content or unsafe raw HTML.
- The example is linked from the site's navigation or landing page so a reader can discover it without knowing the source path.

### R4. Production build

- `pnpm build` (or the project's documented equivalent) performs a complete production build and emits the static site without errors.
- The build output contains the example tutorial page, its navigation, and its referenced assets/links.

### R5. Pages deployment workflow

- Add a pinned GitHub Actions workflow that installs dependencies from the lockfile, builds the production site, and publishes the generated output with the official GitHub Pages actions.
- The workflow deploys after a merge or push to the default branch; pull requests do not publish the production site.
- The workflow uses the repository's Pages environment and permissions required by the official deployment action.
- Workflow configuration is limited to Phase 1 build-and-deploy behavior; broad pull-request linting and content/link policy belong to Phase 2.

## Acceptance outcome

After a successful merge to the default branch, GitHub Pages serves a readable example tutorial at the configured `/tutor/` path. A contributor can identify the Markdown source, run the production build locally, and publish the same static output through the workflow without adding application code.

## Historical follow-on

The Phase 1 acceptance context above is preserved. Responsive documentation presentation and approved build-time global/suggestion search are follow-on work defined in [`2026-09-23-documentation-experience-search`](../2026-09-23-documentation-experience-search/).

## Explicit non-goals

- No complete frontmatter schema or generalized content-validation framework.
- No Markdown linting, image-alt enforcement, external-link policy, or advanced local-link tooling beyond the checks required to validate this one example.
- No Mermaid, callout system, image library, custom search service, categories, accounts, comments, runtime service, or browser editor. Static global and suggestion search is intentionally handled by the later dated documentation-experience specification.
- No deployment to a host other than GitHub Pages.
