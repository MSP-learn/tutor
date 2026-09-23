# Plan

Implement only the Phase 1 exit path described in `specs/Constitution/road-map.md`: one Markdown page, one production build, and one GitHub Pages deployment workflow.

## 1. Shell delivery slice

1. Create the Astro and Starlight project, using the constitution's TypeScript, Node.js 22 LTS, and pnpm choices.
2. Commit the package manifest and lockfile, and keep the generated project structure small and recognizable.
3. Configure Starlight for static output, the site identity, and a navigation entry for the example tutorial.
4. Set the canonical GitHub Pages site URL and `/tutor/` base path for `MSP-learn/tutor`; verify generated asset and navigation URLs use that base path.

**Slice result:** a locally runnable Starlight shell with a stable project-path configuration and an empty or placeholder navigation target ready for content.

## 2. Content delivery slice

1. Add one standard Markdown tutorial at the planned `/tutorials/first-tutorial/` route with minimal YAML frontmatter (`title` and `description`).
2. Keep the tutorial intentionally small: explain one useful first step, include a short fenced code example, and avoid later-phase diagrams, callouts, images, or custom components.
3. Link the tutorial from the Starlight navigation or landing page so it is discoverable from the generated site.
4. Confirm the content is rendered as safe generated HTML and that the example's source remains independent of application code.

**Slice result:** the site presents one understandable Markdown tutorial with a visible route and navigation link.

## 3. Deployment delivery slice

1. Add a GitHub Actions workflow with pinned action versions and Node.js 22/pnpm setup.
2. Install from the committed lockfile and run the production build in the workflow.
3. Publish the generated output with the official GitHub Pages artifact and deploy actions, using the Pages environment and required permissions.
4. Trigger deployment only from the default branch after merge; keep pull requests out of production deployment.

**Slice result:** a successful default-branch workflow can publish the built shell to the `MSP-learn/tutor` Pages site.

## 4. Verification delivery slice

1. Run the local production build and inspect the generated files for the example route, navigation, and `/tutor/`-prefixed links/assets.
2. Perform focused content/link checks for the example frontmatter, the navigation-to-tutorial link, and any local references used by the page; report file-specific failures.
3. Observe a successful GitHub Actions build and deployment run from the default branch.
4. Open the deployed example URL, confirm it is readable HTML, and exercise the navigation link and code example on the published `/tutor/` path.
5. Stop after the Phase 1 exit condition is proven; defer generalized content checks and visual-content infrastructure to later phases.

**Slice result:** local build, focused content/link checks, hosted workflow, and a readable deployed example page all provide evidence for the Phase 1 exit.

## Historical follow-on

This Phase 1 plan remains the historical shell-delivery record. The approved responsive documentation UI and static global/suggestion search are implemented in the new dated specification [`2026-09-23-documentation-experience-search`](../2026-09-23-documentation-experience-search/), not retrofitted into this plan.
