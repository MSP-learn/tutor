#!/usr/bin/env node

import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const repositoryRoot = process.cwd();
const renderedPage = path.join(repositoryRoot, 'dist/tutorials/first-tutorial/index.html');

try {
  await access(renderedPage);
} catch {
  console.error('Code block validation requires a current build. Run "pnpm build" first.');
  process.exit(1);
}

const html = await readFile(renderedPage, 'utf8');
const codeBlock = html.match(/<pre data-language="typescript">([\s\S]*?)<\/pre>/);

if (!codeBlock) {
  throw new Error('Expected the tutorial build to contain a TypeScript code block.');
}

if (!/<code>[\s\S]*?<\/code>/.test(codeBlock[0])) {
  throw new Error('Expected the TypeScript code block to contain a code element.');
}

if (!/<span[^>]+style="[^\"]*--0:#[0-9A-Fa-f]{6}/.test(codeBlock[0])) {
  throw new Error('Expected Shiki to emit styled syntax tokens for the TypeScript code block.');
}

console.log('Code block validation passed: the built tutorial contains a Shiki-highlighted TypeScript block.');
