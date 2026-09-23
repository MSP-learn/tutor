# Validation

This validation proves the Phase 2 pull-request content checks slice and its exit condition. Commands are expected to run from the repository root with Node.js 22 LTS and the committed `pnpm-lock.yaml`.

## 1. Reproducible installation

```sh
pnpm install --frozen-lockfile
```

**Pass:** exit status 0 and dependencies match the lockfile. **Fail:** any non-zero status blocks the remaining checks and reports the installation error.

## 2. Markdown lint

```sh
pnpm lint:markdown
```

**Pass:** `markdownlint-cli2` exits 0 for the tutorial Markdown. **Fail:** a non-zero result names the Markdown file and line/rule reported by the linter.

## 3. Content behavior tests

```sh
pnpm test:content
```

**Pass:** the executable test reports passing cases for a broken local link, broken anchor, missing image path, missing image alt text, valid local references, and missing required frontmatter description. The missing-description build failure must include `__phase2-missing-description.md` and `description`.

**Fail:** a case exits successfully when it should fail, fails without the expected file-specific message, or rejects the valid fixture.

## 4. Local content validation

```sh
pnpm check:content
```

**Pass:** all Markdown files under `src/content/docs` pass route, local link, fragment-anchor, local image-path, and image-alt checks. External links are ignored for network access and therefore do not make this command dependent on the network.

**Fail:** the command exits non-zero and prints a repository-relative file plus line and a concrete target/anchor/image/alt error. Duplicate generated routes must name both conflicting files.

## 5. Production pull-request build

```sh
pnpm build
```

**Pass:** Astro/Starlight loads the primary content schema, generates the complete static site, and exits 0. The generated tutorial remains available at the route derived from its Markdown path.

**Fail:** a schema, route, content, or build error exits non-zero; required frontmatter failures must include the source filename and field.

## 6. Pull-request workflow inspection

The pull-request workflow must execute these commands after checkout and setup, in this order:

1. `pnpm install --frozen-lockfile`
2. `pnpm lint:markdown`
3. `pnpm test:content`
4. `pnpm check:content`
5. `pnpm build`

**Pass:** a pull request runs all five checks and no Pages deployment job is eligible on the pull-request event. The existing deployment workflow remains eligible only for pushes to `main`.

**Fail:** any command is absent, uses an unfrozen install, allows a failed check to continue, or enables deployment from a pull request.

## Executable pass/fail summary

Phase 2 passes only if all five local commands exit 0 on valid repository content, `pnpm test:content` proves each invalid fixture fails with file-specific evidence, and the workflow inspection confirms the same checks run for pull requests while deployment remains default-branch-only. Any non-zero command, missing diagnostic, network-dependent external-link check, or unintended deployment trigger is a failure.

## Non-goals verified by inspection

- The existing Astro/Starlight schema and content scripts remain in place; this slice does not duplicate or remove them.
- No external link is fetched during local validation.
- No runtime service, MDX, browser editor, or responsive image-processing pipeline is added.
- Historical Phase 1 shell and documentation-experience/search specifications and existing UI/search implementation remain unchanged.
