/**
 * Generate React icon components from a LOCAL folder of .svg files (no Figma token needed).
 *
 *   SVG_DIR=./svg npm run generate:svg
 *
 * Default SVG_DIR is `icons/svg/`. Reads .svg files recursively; the file name becomes the
 * component name (e.g. `arrow_forward.svg` -> `IconArrowForward`). Same SVGO + SVGR transform
 * as the Figma pipeline: 1em, currentColor, forwardRef, title/titleId.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, unlinkSync, statSync } from 'node:fs';
import { resolve, dirname, join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from '@svgr/core';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const ICONS_DIR = resolve(ROOT, 'src/icons');
const INDEX = resolve(ROOT, 'src/index.ts');
const SVG_DIR = process.env.SVG_DIR ? resolve(process.cwd(), process.env.SVG_DIR) : resolve(ROOT, 'svg');

if (!existsSync(SVG_DIR)) {
  console.error(
    `SVG folder not found: ${SVG_DIR}\n` +
      `Put your exported .svg files in icons/svg/ (or set SVG_DIR), then run:\n  SVG_DIR=./path npm run generate:svg`,
  );
  process.exit(1);
}

const pascal = (s) => {
  const c = s
    .replace(/\.svg$/i, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
  return /^[a-zA-Z]/.test(c) ? c : `I${c}`;
};

const listSvgs = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...listSvgs(p));
    else if (extname(entry).toLowerCase() === '.svg') out.push(p);
  }
  return out;
};

const files = listSvgs(SVG_DIR);
if (files.length === 0) {
  console.error(`No .svg files found under ${SVG_DIR}.`);
  process.exit(1);
}
console.log(`Found ${files.length} SVG files in ${SVG_DIR}.`);

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

// reset generated dir
if (existsSync(ICONS_DIR)) {
  for (const f of readdirSync(ICONS_DIR)) unlinkSync(resolve(ICONS_DIR, f));
} else {
  mkdirSync(ICONS_DIR, { recursive: true });
}

const used = new Set();
const claim = (base) => {
  let name = base;
  let i = 2;
  while (used.has(name)) name = `${base}${i++}`;
  used.add(name);
  return name;
};

const exported = [];
let done = 0;
for (const file of files) {
  const name = claim(`Icon${pascal(basename(file))}`);
  const svg = readFileSync(file, 'utf8');
  try {
    const code = await transform(svg, svgrConfig, { componentName: name });
    writeFileSync(resolve(ICONS_DIR, `${name}.tsx`), `// AUTO-GENERATED from ${basename(file)} — do not edit by hand.\n${code}`);
    exported.push(name);
  } catch (err) {
    console.warn(`  ! skipped ${basename(file)}: ${err.message}`);
  }
  if (++done % 100 === 0) console.log(`  generated ${done}/${files.length}`);
}

exported.sort();
const barrel =
  `export type { IconProps } from './types';\n\n` +
  `// === AUTO-GENERATED EXPORTS (scripts/generate-from-svg.mjs) — do not edit below ===\n` +
  exported.map((n) => `export { default as ${n} } from './icons/${n}';`).join('\n') +
  '\n';
writeFileSync(INDEX, barrel);

console.log(`\n✓ Generated ${exported.length} icons + barrel.\n  Next: npm run typecheck && npm run build`);
