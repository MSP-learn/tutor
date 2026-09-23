#!/usr/bin/env node

import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const repositoryRoot = process.cwd();
const validator = path.join(repositoryRoot, 'scripts/validate-content.mjs');
const cases = [
  {
    name: 'broken local link',
    files: { 'index.md': '# Home\n\n[Missing](missing-page/)\n' },
    message: 'local link target "missing-page/"',
  },
  {
    name: 'broken anchor',
    files: { 'index.md': '# Home\n\n[Section](#missing)\n' },
    message: 'no matching anchor "#missing"',
  },
  {
    name: 'missing image path',
    files: { 'index.md': '# Home\n\n![Diagram](images/missing.png)\n' },
    message: 'local image path "images/missing.png"',
  },
  {
    name: 'missing image alt text',
    files: { 'index.md': '# Home\n\n![](images/diagram.png)\n', 'images/diagram.png': '' },
    message: 'image field "alt"',
  },
  {
    name: 'broken reference link',
    files: { 'index.md': '# Home\n\n[Missing][bad]\n\n[bad]: missing-page/\n' },
    message: 'local link target "missing-page/"',
  },
  {
    name: 'undefined reference link',
    files: { 'index.md': '# Home\n\n[Missing][bad]\n' },
    message: 'link reference definition "bad" does not exist',
  },
  {
    name: 'undefined collapsed reference link',
    files: { 'index.md': '# Home\n\n[Missing][]\n' },
    message: 'link reference definition "Missing" does not exist',
  },
  {
    name: 'missing reference image path',
    files: { 'index.md': '# Home\n\n![Diagram][img]\n\n[img]: images/missing.png\n' },
    message: 'local image path "images/missing.png"',
  },
  {
    name: 'undefined reference image',
    files: { 'index.md': '# Home\n\n![Diagram][img]\n' },
    message: 'image reference definition "img" does not exist',
  },
  {
    name: 'undefined shortcut reference image',
    files: { 'index.md': '# Home\n\n![Diagram]\n' },
    message: 'image reference definition "Diagram" does not exist',
  },
  {
    name: 'missing reference image alt text',
    files: { 'index.md': '# Home\n\n![][img]\n\n[img]: images/diagram.png\n', 'images/diagram.png': '' },
    message: 'image field "alt"',
  },
  {
    name: 'malformed percent-encoded local link',
    files: { 'index.md': '# Home\n\n[Bad](%zz)\n' },
    message: 'malformed percent-encoding',
    excludedMessage: 'URIError',
  },
];

function runValidator(contentRoot) {
  return spawnSync(process.execPath, [validator], {
    cwd: repositoryRoot,
    env: { ...process.env, CONTENT_ROOT: contentRoot },
    encoding: 'utf8',
  });
}

for (const testCase of cases) {
  const contentRoot = await mkdtemp(path.join(os.tmpdir(), 'tutor-content-check-'));
  try {
    for (const [relativePath, content] of Object.entries(testCase.files)) {
      const filePath = path.join(contentRoot, relativePath);
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, content);
    }
    const result = runValidator(contentRoot);
    const output = `${result.stdout}${result.stderr}`;
    if (result.status === 0 || !output.includes(testCase.message) || (testCase.excludedMessage && output.includes(testCase.excludedMessage))) {
      throw new Error(`${testCase.name} did not produce the expected file-specific error:\n${output}`);
    }
    console.log(`PASS ${testCase.name}: ${testCase.message}`);
  } finally {
    await rm(contentRoot, { recursive: true, force: true });
  }
}

const validRoot = await mkdtemp(path.join(os.tmpdir(), 'tutor-content-check-valid-'));
try {
  await mkdir(path.join(validRoot, 'images'), { recursive: true });
  await writeFile(
    path.join(validRoot, 'index.md'),
    '# Home\n\n## Start here\n\n[Start](#start-here)\n\n[Local][start]\n\n[External][web]\n\n![Diagram](images/diagram.png)\n\n![Remote][remote]\n\n[start]: #start-here\n[web]: https://example.invalid/guide\n[remote]: https://example.invalid/diagram.png\n',
  );
  await writeFile(path.join(validRoot, 'images/diagram.png'), 'fixture');
  const result = runValidator(validRoot);
  if (result.status !== 0) throw new Error(`valid content was rejected:\n${result.stdout}${result.stderr}`);
  console.log('PASS valid content: local links, anchors, image path, and alt text');
} finally {
  await rm(validRoot, { recursive: true, force: true });
}

const fixturePath = path.join(repositoryRoot, 'src/content/docs/phase2-missing-description.md');
try {
  await writeFile(fixturePath, '---\ntitle: Invalid fixture\n---\n\nThis fixture must be rejected by the Starlight schema.\n');
  const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], {
    cwd: repositoryRoot,
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
    encoding: 'utf8',
  });
  const output = `${result.stdout}${result.stderr}`;
  if (result.status === 0 || !output.includes('phase2-missing-description.md') || !output.includes('description')) {
    throw new Error(`invalid frontmatter was not reported with a file and field:\n${output}`);
  }
  console.log('PASS invalid frontmatter: source file and description field reported');
} finally {
  await rm(fixturePath, { force: true });
}

console.log('Content check tests passed.');
