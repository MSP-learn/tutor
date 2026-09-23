# Road Map

Work is divided into very small, independently reviewable phases.
Each phase should end with a usable result, focused tests, and updated contributor guidance where behavior changes.

## Phase 0: Constitution

**Goal:** Agree on the mission, initial stack, and implementation order.

- Add the constitution documents.
- Review the product principles and initial non-goals.
- Treat later scope changes as explicit decisions.

**Exit:** The repository contains the accepted mission, technology stack, and road map.

## Phase 1: Deployable documentation shell

**Goal:** Publish one minimal Markdown page.

- Create the Astro and Starlight project.
- Configure the GitHub Pages site path.
- Add one small example tutorial.
- Add the approved responsive documentation presentation and built-in static search once the shell page is discoverable.
- Add a production build and Pages deployment workflow.

**Exit:** A merge to the default branch publishes a readable, searchable example page to GitHub Pages.

## Phase 2: Pull-request content checks — complete

**Goal:** Prevent invalid content from reaching the site.

- Define the minimal tutorial frontmatter schema.
- Add Markdown linting.
- Check local links, anchors, image paths, and image alternative text.
- Require a successful site build on pull requests.
- Keep external-link checks network-independent and deployment restricted to the default branch.

**Exit:** A broken tutorial is rejected with a file-specific explanation, while a valid tutorial passes without application-code changes. The completed plan, requirements, and executable validation evidence are recorded in [`2026-09-24-pull-request-content-checks`](../2026-09-24-pull-request-content-checks/).

## Phase 3: Core visual content

**Goal:** Support the most common tutorial presentation needs.

- Confirm syntax-highlighted code blocks — complete. See [`2026-09-24-syntax-highlighted-code-blocks`](../2026-09-24-syntax-highlighted-code-blocks/).
- Document callout syntax for notes, tips, cautions, and warnings — complete. See [`2026-09-24-callout-syntax`](../2026-09-24-callout-syntax/).
- Support responsive images with required alternative text.
- Add a reference example for hyperlinks and citations.

**Exit:** One sample tutorial demonstrates every core visual primitive and passes validation.

## Phase 4: Diagrams and workflows

**Goal:** Render text-authored visuals safely.

- Add Mermaid fenced-block support.
- Cover flowchart, sequence, and state or workflow examples.
- Provide accessible labels or nearby text explanations.
- Reject unsafe or invalid diagram input with a useful message.

**Exit:** A contributor can add a working diagram entirely from Markdown.

## Phase 5: Navigation and discovery

**Goal:** Make a growing tutorial collection easy to browse.

- Generate navigation from content metadata.
- Add categories or tags only as needed by real content.
- Add previous, next, and related-page links where useful.

**Exit:** Readers can browse growing tutorial collections by metadata and move between tutorials without knowing repository paths.

## Phase 6: Contribution experience

**Goal:** Make tutorial pull requests predictable.

- Add a concise contributor guide.
- Add a tutorial template and pull-request checklist.
- Document local preview and validation commands.
- Add clear examples for assets, references, callouts, and diagrams.

**Exit:** A new contributor can submit a valid tutorial by following repository documentation alone.

## Phase 7: Accessibility and release hardening

**Goal:** Make the first public release dependable.

- Add representative keyboard and accessibility checks.
- Verify mobile layout and code-block overflow.
- Set performance budgets for key pages.
- Review dependency, action, and Markdown-rendering security.
- Document rollback and failed-deployment recovery.

**Exit:** The site meets the agreed accessibility, security, and reliability baseline for public launch.

## Phase discipline

- Keep each pull request focused on one phase or a small slice of a phase.
- Do not build later-phase infrastructure before the preceding user-visible path works.
- Add only the abstractions required by current tutorials.
- A phase is complete only when its outcome is visible in the built site or enforced by validation.
