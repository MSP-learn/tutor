#!/usr/bin/env node

import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { generateDocsIdFromEntry } from '../src/content/docs-route-id.mjs';

const repositoryRoot = process.cwd();
const contentRoot = path.resolve(process.env.CONTENT_ROOT ?? path.join(repositoryRoot, 'src/content/docs'));
const publicRoot = path.join(repositoryRoot, 'public');
const errors = [];

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(entryPath)));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(entryPath);
  }
  return files.sort();
}

function lineNumber(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

function report(filePath, source, offset, message) {
  const relative = path.relative(repositoryRoot, filePath).split(path.sep).join('/');
  errors.push(`${relative}:${lineNumber(source, offset)}: ${message}`);
}

function routeFor(filePath) {
  const relative = path.relative(contentRoot, filePath).split(path.sep).join('/');
  const withoutExtension = generateDocsIdFromEntry(relative);
  if (withoutExtension === 'index') return '/';
  if (withoutExtension.endsWith('/index')) return `/${withoutExtension.slice(0, -'/index'.length)}/`;
  return `/${withoutExtension}/`;
}

function normalizeRoute(route) {
  const decoded = decodeURIComponent(route).replace(/\\/g, '/');
  if (decoded === '' || decoded === '/') return '/';
  const withoutExtension = decoded.replace(/\.md$/, '');
  return `/${withoutExtension.replace(/^\/+|\/+$/g, '')}/`;
}

function routeCandidates(target, currentRoute) {
  const base = target.startsWith('/') ? target : new URL(target, `https://tutor.invalid${currentRoute}`).pathname;
  const normalized = normalizeRoute(base);
  return new Set([normalized, base.endsWith('.md') ? normalizeRoute(base) : base]);
}

function headingSlug(heading, used) {
  const base = heading
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  let slug = base;
  let suffix = 1;
  while (used.has(slug)) slug = `${base}-${suffix++}`;
  used.add(slug);
  return slug;
}

function removeCodeAndComments(source) {
  return source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^```[\s\S]*?^```\s*$/gm, (block) => block.replace(/[^\n]/g, ' '))
    .replace(/^~~~[\s\S]*?^~~~\s*$/gm, (block) => block.replace(/[^\n]/g, ' '))
    .replace(/^ {0,3}:::[^\n]*$/gm, (directive) => directive.replace(/[^\n]/g, ' '));
}

function frontmatterEnd(source) {
  if (!source.startsWith('---')) return 0;
  const end = source.indexOf('\n---', 3);
  return end === -1 ? 0 : end + 4;
}

function localTarget(target) {
  return target && !/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(target) && !target.startsWith('#');
}

function referenceLabel(label) {
  return label.trim().replace(/\s+/g, ' ').toLowerCase();
}

function referenceDefinitions(body) {
  const definitions = new Map();
  const ranges = [];
  for (const match of body.matchAll(/^ {0,3}\[([^\]\n]+)\]:[ \t]*(<[^>\n]*>|[^<\s][^\s]*)(?:[ \t]+(?:"[^"]*"|'[^']*'|\([^)]*\)))?[ \t]*$/gm)) {
    const label = referenceLabel(match[1]);
    if (!definitions.has(label)) definitions.set(label, { target: match[2], offset: match.index });
    ranges.push([match.index, match.index + match[0].length]);
  }
  return { definitions, ranges };
}

function withinRanges(offset, ranges) {
  return ranges.some(([start, end]) => offset >= start && offset < end);
}

function checkReferenceDefinition({ filePath, source, offset, definitions, label, kind }) {
  const normalizedLabel = referenceLabel(label);
  const definition = definitions.get(normalizedLabel);
  if (!definition) {
    report(filePath, source, offset, `${kind} reference definition "${label}" does not exist`);
  }
  return definition;
}

async function checkTarget({ filePath, source, offset, target, kind, route, routes }) {
  const cleanTarget = target.replace(/^<|>$/g, '');
  const [targetPath, fragment = ''] = cleanTarget.split('#', 2);
  if (kind === 'image' && !localTarget(cleanTarget)) return;
  if (kind === 'link' && !localTarget(cleanTarget) && !cleanTarget.startsWith('#')) return;

  if (kind === 'image') {
    const imagePath = targetPath.startsWith('/')
      ? path.join(publicRoot, targetPath.slice(1))
      : path.resolve(path.dirname(filePath), targetPath);
    if (!(await exists(imagePath))) {
      report(filePath, source, offset, `local image path "${cleanTarget}" does not exist`);
    }
    return;
  }

  let candidates;
  try {
    candidates = routeCandidates(targetPath || route, route);
  } catch (error) {
    if (error instanceof URIError) {
      report(filePath, source, offset, `local link target "${cleanTarget}" contains malformed percent-encoding`);
      return;
    }
    throw error;
  }
  const destination = [...candidates].find((candidate) => routes.has(candidate));
  if (!destination) {
    report(filePath, source, offset, `local link target "${cleanTarget}" does not resolve to a tutorial route`);
    return;
  }
  if (fragment && !routes.get(destination).anchors.has(fragment)) {
    report(filePath, source, offset, `local link target "${cleanTarget}" has no matching anchor "#${fragment}"`);
  }
}

const files = await markdownFiles(contentRoot);
const routes = new Map();
const documents = [];

for (const filePath of files) {
  const source = await readFile(filePath, 'utf8');
  const route = routeFor(filePath);
  const existing = routes.get(route);
  if (existing) {
    report(filePath, source, 0, `duplicate generated route "${route}" also produced by ${path.relative(repositoryRoot, existing.filePath).split(path.sep).join('/')}`);
    continue;
  }
  const bodyStart = frontmatterEnd(source);
  const body = removeCodeAndComments(source.slice(bodyStart));
  const anchors = new Set();
  for (const match of body.matchAll(/^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$/gm)) headingSlug(match[1], anchors);
  for (const match of body.matchAll(/\bid=["']([^"']+)["']/g)) anchors.add(match[1]);
  const document = { filePath, source, body, bodyStart, route, anchors };
  routes.set(route, document);
  documents.push(document);
}

for (const document of documents) {
  const { filePath, source, body, bodyStart, route } = document;
  const { definitions, ranges: definitionRanges } = referenceDefinitions(body);
  const imageReferenceRanges = [];
  for (const match of body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+[^)]*)?\)/g)) {
    if (!match[1].trim()) report(filePath, source, bodyStart + match.index, 'image field "alt" must not be empty');
    await checkTarget({ filePath, source, offset: bodyStart + match.index, target: match[2], kind: 'image', route, routes });
  }
  for (const match of body.matchAll(/!\[([^\]]*)\]\[([^\]]*)\]/g)) {
    imageReferenceRanges.push([match.index, match.index + match[0].length]);
    const label = match[2] || match[1];
    const definition = checkReferenceDefinition({ filePath, source, offset: bodyStart + match.index, definitions, label, kind: 'image' });
    if (!match[1].trim()) report(filePath, source, bodyStart + match.index, 'image field "alt" must not be empty');
    if (definition) {
      await checkTarget({ filePath, source, offset: bodyStart + match.index, target: definition.target, kind: 'image', route, routes });
    }
  }
  for (const match of body.matchAll(/!\[([^\]\n]+)\]/g)) {
    if (withinRanges(match.index, definitionRanges)) continue;
    if (body[match.index + match[0].length] === '(' || body[match.index + match[0].length] === '[') continue;
    imageReferenceRanges.push([match.index, match.index + match[0].length]);
    const definition = checkReferenceDefinition({ filePath, source, offset: bodyStart + match.index, definitions, label: match[1], kind: 'image' });
    if (definition) await checkTarget({ filePath, source, offset: bodyStart + match.index, target: definition.target, kind: 'image', route, routes });
  }
  for (const match of body.matchAll(/<img\b([^>]*?)>/gi)) {
    const attributes = match[1];
    const src = attributes.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
    const alt = attributes.match(/\balt\s*=\s*["']([^"']*)["']/i)?.[1];
    if (src && !alt?.trim()) report(filePath, source, bodyStart + match.index, 'image field "alt" is required and must not be empty');
    if (src) await checkTarget({ filePath, source, offset: bodyStart + match.index, target: src, kind: 'image', route, routes });
  }
  for (const match of body.matchAll(/(?<!!)(?:\[[^\]]*\])\(([^)\s]+)(?:\s+[^)]*)?\)/g)) {
    await checkTarget({ filePath, source, offset: bodyStart + match.index, target: match[1], kind: 'link', route, routes });
  }
  for (const match of body.matchAll(/(?<!!)\[([^\]\n]+)\](?:\[([^\]]*)\])?/g)) {
    if (withinRanges(match.index, definitionRanges)) continue;
    if (withinRanges(match.index, imageReferenceRanges)) continue;
    if (match[2] === undefined && body[match.index + match[0].length] === '(') continue;
    if (match[2] === undefined) {
      const definition = checkReferenceDefinition({ filePath, source, offset: bodyStart + match.index, definitions, label: match[1], kind: 'link' });
      if (definition) await checkTarget({ filePath, source, offset: bodyStart + match.index, target: definition.target, kind: 'link', route, routes });
      continue;
    }
    const label = match[2] || match[1];
    const definition = checkReferenceDefinition({ filePath, source, offset: bodyStart + match.index, definitions, label, kind: 'link' });
    if (definition) await checkTarget({ filePath, source, offset: bodyStart + match.index, target: definition.target, kind: 'link', route, routes });
  }
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content validation passed: ${documents.length} Markdown file${documents.length === 1 ? '' : 's'} checked.`);
