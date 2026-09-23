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

## 4. Rendered callout evidence

Inspect the generated tutorial HTML:

```sh
grep -o 'starlight-aside--\(note\|tip\|caution\|danger\)' \
  dist/tutorials/first-tutorial/index.html | sort | uniq -c
grep -F '>Warning<' dist/tutorials/first-tutorial/index.html
```

**Pass:** the generated page contains one static Starlight aside for each of
`note`, `tip`, `caution`, and `danger`, and the danger aside displays the custom
`Warning` title.

## 5. Pull-request workflow

`.github/workflows/content-checks.yml` continues to run the existing content
checks and production build. The deployment workflow remains restricted to
pushes to `main`; this slice does not change deployment triggers.

## Executable pass/fail summary

The slice passes when installation, all existing content checks, the static
build, and the rendered-callout inspection exit successfully. A missing aside,
unsupported directive, or missing warning title is a validation failure.
