# Ship icons as `@neodisa/liga-ds/icons` subpath

**Date:** 2026-06-03
**Status:** Approved

## Problem

Designers install `@neodisa/liga-ds` from GitHub Packages and have **no access to icons**.
Root cause: the 459 icon components live in a separate, unpublished package
(`@liga360/icons`, under `icons/`) that is:

- a different npm scope (`@liga360`, not `@neodisa`);
- never published (the `publish.yml` workflow ships only `@neodisa/liga-ds` on `v*` tags;
  the icons package has no `publishConfig` / publish step);
- not a dependency of the main package and not a workspace;
- resolvable only via a **dev-only** Vite alias in `vite.config.ts`
  (`'@liga360/icons' -> icons/src/index.ts`), which consumers never receive.

The main barrel `src/index.ts` exports zero icons, so the built `dist/` contains none.

## Goal

Designers get icons from the package they already install, with the scope/token/install
they already have set up — by adding `/icons` to the import:

```tsx
import { IconAdd, IconSearch, type IconProps } from '@neodisa/liga-ds/icons';
<IconAdd width={20} aria-hidden />
```

Tree-shakeable (only imported icons land in the consumer bundle).

## Approach

Bundle the icons **in place** from `icons/src` as a second build entry of the main package.
The `icons/` folder stays untouched as the icon authoring / generation workspace
(SVGs + SVGR scripts + svgo/svgr devDeps).

### Changes (all in the root package)

1. **`vite.config.ts`** — library build: replace the single `lib.entry` with two named
   entries and a per-entry filename; extend the dts plugin to cover both source roots.

   ```ts
   lib: {
     entry: {
       'liga-ds': resolve(root, 'src/index.ts'),
       'icons':   resolve(root, 'icons/src/index.ts'),
     },
     formats: ['es', 'cjs'],
     fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'cjs'}`,
   }
   // dts({ include: ['src', 'icons/src'], ... })
   ```

   Output adds `dist/icons.js`, `dist/icons.cjs`, and types under `dist/icons/src/`.
   React stays externalized; icons carry no CSS and produce no shared chunks. The exact
   emitted `.d.ts` path is confirmed against a real build and the `exports` map is set to
   match it.

2. **`package.json`** — add the subpath to `exports`; bump `version` 0.1.0 → 0.2.0.

   ```jsonc
   "./icons": {
     "types": "./dist/icons/src/index.d.ts",
     "import": "./dist/icons.js",
     "require": "./dist/icons.cjs"
   }
   ```

   `files: ["dist"]` already covers the new outputs. `sideEffects: ["**/*.css"]` already
   keeps the icons (plain JS) tree-shakeable.

3. **`tsconfig.build.json`** — add `icons/src` to `include` so `prepublishOnly`'s typecheck
   gate also covers the icons (currently they are typechecked only by `icons/tsconfig.json`).

4. **Docs** — add the icons import + `IconProps` note to `README.md` and `AGENTS.md` so the
   AI-assistant instruction also surfaces `@neodisa/liga-ds/icons`.

### Out of scope

- Moving the 459 icon sources into `src/` (rejected — bigger diff, touches the generator).
- Publishing `@liga360/icons` as its own package.
- Rotating the shared `ghp_…` registry token (flagged separately; security follow-up).

## Verification

- `npm run build` → `dist/` contains `icons.js`, `icons.cjs`, and the icons `.d.ts`;
  main outputs (`liga-ds.js/.cjs/.css`, `dist/src/index.d.ts`) unchanged.
- `npm pack --dry-run` → the icon outputs are in the tarball.
- Smoke: a throwaway import of `@neodisa/liga-ds/icons` resolves an icon + the `IconProps` type.
- `npm run typecheck` and `npm test` stay green.

## Release (manual, post-merge)

`git tag v0.2.0 && git push origin v0.2.0` → `publish.yml` runs typecheck+test+build and
publishes. Designers then `npm update @neodisa/liga-ds` and import from `/icons`.
