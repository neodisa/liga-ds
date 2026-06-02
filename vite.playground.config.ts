import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const root = import.meta.dirname;

/**
 * Static build of the playground (the component gallery) for hosting on Vercel.
 *
 * The main `vite.config.ts` is reserved for the LIBRARY build (`command === 'build'`
 * emits `dist/liga-ds.*`), which has no `index.html` and therefore cannot be served
 * as a website. This config builds the playground as a normal SPA — `index.html` +
 * hashed assets — into `dist-playground/`, reusing the same source aliases as dev.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'liga-ds/styles.css': resolve(root, 'src/styles.css'),
      'liga-ds': resolve(root, 'src/index.ts'),
      '@liga360/icons': resolve(root, 'icons/src/index.ts'),
    },
  },
  build: {
    outDir: 'dist-playground',
    emptyOutDir: true,
    sourcemap: false,
  },
});
