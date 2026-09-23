# Technology Stack

## Decision summary

Use a static, TypeScript-based documentation stack that treats Markdown as content and GitHub as the contribution and publishing system.
The initial stack should stay small enough to deploy after the first valid tutorial is added.

## Core stack

| Area | Choice | Reason |
| --- | --- | --- |
| Static site | Astro with Starlight | Documentation-oriented navigation, accessible defaults, Markdown support, static output, and straightforward GitHub Pages hosting. |
| Language | TypeScript | Safer configuration and extension code with good Astro support. |
| Runtime | Node.js 22 LTS | Stable build runtime with broad tooling support. |
| Package manager | pnpm with a committed lockfile | Reproducible installs and efficient dependency management. |
| Content | Standard Markdown plus YAML frontmatter | Keeps tutorials portable, reviewable, and easy to author. |
| Code rendering | Shiki through Astro/Starlight | Build-time syntax highlighting without a client-side highlighter. |
| Callouts | Starlight asides or a documented Markdown directive | Supports consistent notes, tips, cautions, and warnings. |
| Diagrams and workflows | Mermaid, rendered safely from fenced blocks | Covers flowcharts, sequence diagrams, state diagrams, timelines, and related tutorial visuals. |
| Images | Repository-managed assets with Astro image processing where applicable | Keeps images versioned, optimized, and reviewable with their tutorials. |
| Hosting | GitHub Pages | Matches the repository-based publishing model and requires no application server. |
| Automation | GitHub Actions | Validates pull requests and deploys the static build after accepted content is merged. |

## Content contract

Each tutorial should be a Markdown file with a small required frontmatter schema.
The first schema should contain only fields needed for rendering and navigation, such as `title`, `description`, and `order` or `category`.
Optional fields may include authorship, last-reviewed date, tags, and source references after their behavior is defined.

Raw HTML should be disabled by default.
Any future extension that introduces executable content must document its security boundary before adoption.

## Pull-request validation

Start with checks that produce direct, file-specific feedback:

1. Install dependencies from the lockfile.
2. Validate required frontmatter and unique content routes.
3. Lint Markdown with `markdownlint-cli2` or an equivalent maintained tool.
4. verify local links, anchors, referenced images, and image alternative text.
5. Build the complete Astro site.
6. Run a small rendered-page smoke test and accessibility check once the site shell exists.

External-link checking should report transient network failures clearly and should not make content publishing unreliable without a deliberate policy.

## Deployment

A pull request runs validation but does not deploy the production site.
A merge to the default branch runs the same build and publishes the generated static output with the official GitHub Pages actions.
The workflow must set the correct Pages base path for `MSP-learn/tutor` and use GitHub's deployment environment protections.

## Quality tools

- Prettier for supported source and content formatting where it does not rewrite prose unexpectedly.
- ESLint for TypeScript and configuration code.
- Playwright for a minimal navigation and rendering smoke test.
- Axe integration for automated accessibility checks on representative pages.
- A maintained link checker for repository-local links and anchors.

## Constraints

- No runtime database or server is required for the initial release.
- Avoid MDX until a real tutorial requires controlled components that standard Markdown cannot express.
- Prefer build-time rendering over shipping client-side JavaScript.
- Pin action versions and application dependencies, and update them through reviewed pull requests.
- Add search only after the basic content and navigation path is stable.

## Revisit points

Reconsider the stack only when evidence shows that Astro/Starlight cannot meet a required authoring, rendering, accessibility, localization, or scale need.
Record significant changes as a focused architecture decision rather than silently replacing this baseline.
