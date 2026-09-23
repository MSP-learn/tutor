# Validation

Validation proves the Phase 1 exit condition without expanding into the later content-validation phases.

## 1. Local production build

- Install with pnpm from the committed lockfile using Node.js 22 LTS.
- Run the documented production build (`pnpm build` or an equivalent project script).
- Require a zero exit status and no missing-content, route, or asset errors.
- Confirm the generated output contains the example tutorial route and static HTML suitable for GitHub Pages.

## 2. Focused content and link checks

- Confirm the example Markdown has the required title and description frontmatter and renders at `/tutorials/first-tutorial/`.
- Confirm the navigation or landing page links to that tutorial and the generated href includes the `/tutor/` base path where appropriate.
- Check every link and local asset reference used by the example for a valid target; a broken target names its source file and target.
- Read the generated example HTML to confirm the title, introductory prose, and code example are present. These checks cover this single Phase 1 example and do not require the generalized Phase 2 linting/schema framework.

## 3. GitHub Actions deployment

- Merge or otherwise exercise the default-branch deployment trigger in the repository's normal review flow.
- Require the GitHub Actions workflow to finish successfully for dependency installation, production build, Pages artifact upload, and Pages deployment.
- Confirm the workflow uses the intended `MSP-learn/tutor` Pages configuration and does not publish from pull-request runs.

## 4. Readable deployed example page

- Open the deployed URL:
  `https://msp-learn.github.io/tutor/tutorials/first-tutorial/`
- Require a successful response and a readable rendered page, including the tutorial heading, introductory text, and code example.
- Follow the page's navigation link and verify that the site remains under the `/tutor/` path with no broken asset or internal-link requests.
- Treat a page that builds but is blank, misrouted, unreadable, or missing its example content as a failed Phase 1 validation.

## Phase 1 pass criteria

Phase 1 passes only when the local production build succeeds, the focused content/link checks pass, the GitHub Actions deployment succeeds, and the deployed example page is readable at the configured GitHub Pages path. Generalized Markdown linting, full link policy, diagrams, callouts, and accessibility/release hardening remain later-phase work.
