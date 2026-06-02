import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

const root = import.meta.dirname;

// Single-file ESM/CJS build. `sideEffects: false` + named exports => consumers
// tree-shake to only the icons they import.
export default defineConfig({
  plugins: [react(), dts({ include: ['src'], tsconfigPath: './tsconfig.json' })],
  build: {
    lib: {
      entry: resolve(root, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `liga360-icons.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [/^react($|\/)/, /^react\/jsx-runtime/],
      output: { globals: { react: 'React' } },
    },
    sourcemap: true,
  },
});
