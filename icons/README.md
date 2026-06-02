# @liga360/icons

Tree-shakeable React components for the **IconPack Liga360** (Material-based) Figma library.
Generated from Figma — never hand-edited. Each icon defaults to **1em** (inherits font-size)
and **`currentColor`**, so it drops cleanly into Liga DS components and text.

## Install

```bash
npm install @liga360/icons
```

Peer dependency: `react >=18`.

## Usage

```tsx
import { IconSearch, IconClose } from '@liga360/icons';

<IconSearch />                         {/* 1em, currentColor */}
<IconSearch width={20} height={20} />  {/* explicit size */}
<IconSearch style={{ fontSize: 24, color: 'var(--text-accent)' }} />
<IconSearch title="Search" />          {/* accessible name (role=img) */}
```

### With Liga DS

Liga DS components accept any icon as a `ReactNode`; the component's icon slot sizes it:

```tsx
import { Button, Input } from 'liga-ds';
import { IconSearch, IconPlus } from '@liga360/icons';

<Button leftIcon={<IconPlus />}>Add</Button>
<Input leftIcon={<IconSearch />} placeholder="Search" />
```

## Regenerating from Figma

Both generators run the same SVGO + SVGR transform (1em · `currentColor` · `forwardRef` ·
`title`/`titleId`), write `src/icons/*.tsx`, and rewrite the export barrel. The file name
becomes the component name (`arrow_forward.svg` → `IconArrowForward`).

### A) From a local SVG pack (no token)

Export the icons from Figma as SVG, drop them into `icons/svg/` (subfolders are fine), then:

```bash
npm run generate:svg          # or: SVG_DIR=/path/to/svgs npm run generate:svg
npm run typecheck && npm run build
```

### B) Straight from Figma (needs a token)

1. Create a Figma **personal access token**: figma.com → Settings → Security → Personal access tokens.
2. Run:

   ```bash
   FIGMA_TOKEN=figd_xxx npm run generate
   npm run typecheck && npm run build
   ```

   Override targets with `FIGMA_FILE_KEY`, `FIGMA_NODE` (default `0:1`).

## Build

| Script | What it does |
| --- | --- |
| `npm run generate` | Pull + generate icon components from Figma (needs `FIGMA_TOKEN`) |
| `npm run build` | ESM + CJS + `.d.ts` → `dist/` |
| `npm run typecheck` | `tsc --noEmit` |

## License

MIT
