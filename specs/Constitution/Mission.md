# Mission

## Purpose

Tutor is a public documentation website that turns community-authored Markdown tutorials into clear, visual, and trustworthy learning experiences.
Contributors add and improve tutorials through pull requests, and every accepted change is validated before the site is published to GitHub Pages.

## Product promise

A contributor should be able to add a valid Markdown tutorial without changing application code.
After the pull request is reviewed, validated, and merged, the website should build and publish automatically.
A reader should be able to understand the tutorial through prose, diagrams, images, workflows, links, references, callouts, and code examples.

## Governing principles

1. **Markdown is the source of truth.** Tutorial content lives in version-controlled Markdown files with small, documented metadata fields.
2. **Content changes arrive through pull requests.** Direct publishing is not part of the content workflow; review and automated validation precede deployment.
3. **The first valid tutorial is enough to launch.** The platform must not require a large initial catalog before it can build and deploy.
4. **Visuals improve understanding.** Diagrams, images, workflows, callouts, references, and code blocks are first-class content rather than decorative extras.
5. **Progressive enhancement protects access.** Core reading and navigation work in generated HTML even when optional client-side features are unavailable.
6. **References remain traceable.** External claims and borrowed material should link to their sources, while internal references should be checked during validation.
7. **Safety is the default.** Untrusted scripts and unsafe raw HTML are not rendered from tutorial Markdown.
8. **Accessibility is part of correctness.** Visual content needs text alternatives, navigation must work by keyboard, and the rendered site should use semantic structure and sufficient contrast.
9. **Keep contribution friction low.** Validation failures must explain which file is invalid and how to correct it.
10. **Prefer a small static system.** Add servers, databases, accounts, or custom authoring tools only when a demonstrated need cannot be met by the repository and static site.

## Initial scope

- Markdown tutorial pages with documented frontmatter.
- Syntax-highlighted code blocks.
- Images with required alternative text.
- Hyperlinks, internal references, and a generated navigation structure.
- Callouts for notes, tips, cautions, and warnings.
- Diagrams and workflows authored as text and rendered safely.
- Pull-request validation and automatic GitHub Pages deployment after merge.

## Initial non-goals

- A browser-based content editor.
- User accounts, comments, ratings, or payments.
- A runtime content database or content-management service.
- Arbitrary scripts embedded by contributors.
- Supporting every diagram language in the first release.

## Success signals

- A contributor can add one tutorial in a single pull request.
- Invalid Markdown, broken internal links, missing required metadata, and failed site builds prevent publishing.
- A merged valid tutorial appears on GitHub Pages without a manual deployment step.
- A reader can navigate, read, copy code, follow references, and understand visual material on desktop and mobile.
