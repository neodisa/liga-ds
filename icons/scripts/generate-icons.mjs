/**
 * Generate React icon components from the IconPack Liga360 Figma library.
 *
 *   FIGMA_TOKEN=figd_xxx npm run generate
 *
 * Env:
 *   FIGMA_TOKEN     (required) Figma personal access token — figma.com → Settings → Security.
 *   FIGMA_FILE_KEY  (default hj8gYTV9PWJ8HiJzf8J7RJ) the IconPack file key.
 *   FIGMA_NODE      (default 0:1) the page/frame node to harvest icons from.
 *
 * Pipeline: enumerate COMPONENT nodes under FIGMA_NODE → export each as SVG (batched
 * images API) → SVGO + SVGR (1em, currentColor, ref, title) → write src/icons/*.tsx and
 * regenerate the barrel.
 */
import { writeFileSync, mkdirSync, rmSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from '@svgr/core';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const ICONS_DIR = resolve(ROOT, 'src/icons');
const INDEX = resolve(ROOT, 'src/index.ts');

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY || 'hj8gYTV9PWJ8HiJzf8J7RJ';
const NODE = process.env.FIGMA_NODE || '0:1';

if (!TOKEN) {
  console.error(
    'Missing FIGMA_TOKEN.\n' +
      'Create a personal access token at figma.com → Settings → Security → Personal access tokens,\n' +
      'then run:  FIGMA_TOKEN=figd_xxx npm run generate',
  );
  process.exit(1);
}

const figma = async (path) => {
  const res = await fetch(`https://api.figma.com/v1${path}`, { headers: { 'X-Figma-Token': TOKEN } });
  if (!res.ok) throw new Error(`Figma API ${res.status} on ${path}: ${await res.text()}`);
  return res.json();
};

const pascal = (s) => {
  const c = s
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
  return /^[a-zA-Z]/.test(c) ? c : `I${c}`;
};

// Build a component name, handling Figma variant sets ("Style=Filled, Name=search").
const componentName = (node, parentSetName) => {
  if (parentSetName && node.name.includes('=')) {
    const variant = node.name
      .split(',')
      .map((p) => p.split('=')[1]?.trim())
      .filter(Boolean)
      .join(' ');
    return `Icon${pascal(parentSetName)}${pascal(variant)}`;
  }
  return `Icon${pascal(node.name)}`;
};

console.log(`Fetching node ${NODE} from file ${FILE_KEY}…`);
const { nodes } = await figma(`/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(NODE)}`);
const root = nodes[NODE]?.document;
if (!root) throw new Error(`Node ${NODE} not found in file.`);

const icons = [];
const used = new Set();
const claim = (base) => {
  let name = base;
  let i = 2;
  while (used.has(name)) name = `${base}${i++}`;
  used.add(name);
  return name;
};
const walk = (node, parentSetName = null) => {
  if (!node) return;
  if (node.type === 'COMPONENT') {
    icons.push({ id: node.id, name: claim(componentName(node, parentSetName)) });
    return;
  }
  const nextParent = node.type === 'COMPONENT_SET' ? node.name : parentSetName;
  (node.children || []).forEach((c) => walk(c, nextParent));
};
walk(root);

if (icons.length === 0) throw new Error('No COMPONENT nodes found. Check FIGMA_NODE / file structure.');
console.log(`Found ${icons.length} icon components. Exporting SVGs…`);

// Export SVG URLs in batches.
const BATCH = 200;
const urlById = {};
for (let i = 0; i < icons.length; i += BATCH) {
  const ids = icons.slice(i, i + BATCH).map((x) => x.id);
  const { images, err } = await figma(`/images/${FILE_KEY}?ids=${encodeURIComponent(ids.join(','))}&format=svg`);
  if (err) throw new Error(`images API error: ${err}`);
  Object.assign(urlById, images);
  console.log(`  exported ${Math.min(i + BATCH, icons.length)}/${icons.length}`);
}

// Reset the generated dir.
if (existsSync(ICONS_DIR)) {
  for (const f of readdirSync(ICONS_DIR)) unlinkSync(resolve(ICONS_DIR, f));
} else {
  mkdirSync(ICONS_DIR, { recursive: true });
}

const svgrConfig = {
  typescript: true,
  ref: true,
  icon: true,
  titleProp: true,
  expandProps: 'end',
  jsxRuntime: 'automatic',
  exportType: 'default',
  replaceAttrValues: { '#000': 'currentColor', '#000000': 'currentColor', black: 'currentColor' },
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  svgoConfig: {
    plugins: [
      { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
      'removeDimensions',
      { name: 'convertColors', params: { currentColor: true } },
    ],
  },
};

const exported = [];
let done = 0;
for (const { id, name } of icons) {
  const url = urlById[id];
  if (!url) {
    console.warn(`  ! no SVG url for ${name} (${id})`);
    continue;
  }
  const svg = await (await fetch(url)).text();
  const code = await transform(svg, svgrConfig, { componentName: name });
  writeFileSync(resolve(ICONS_DIR, `${name}.tsx`), `// AUTO-GENERATED — do not edit by hand.\n${code}`);
  exported.push(name);
  if (++done % 100 === 0) console.log(`  generated ${done}/${icons.length}`);
}

exported.sort();
const barrel =
  `export type { IconProps } from './types';\n\n` +
  `// === AUTO-GENERATED EXPORTS (scripts/generate-icons.mjs) — do not edit below ===\n` +
  exported.map((n) => `export { default as ${n} } from './icons/${n}';`).join('\n') +
  '\n';
writeFileSync(INDEX, barrel);

console.log(`\n✓ Generated ${exported.length} icons + barrel.\n  Next: npm run typecheck && npm run build`);
