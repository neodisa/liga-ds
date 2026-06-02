import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

const root = import.meta.dirname;

export default defineConfig(({ command }) => {
  // Library build
  if (command === 'build') {
    return {
      plugins: [
        react(),
        dts({
          include: ['src'],
          exclude: ['**/*.test.*', '**/*.spec.*', '**/*.stories.*'],
          tsconfigPath: './tsconfig.json',
        }),
      ],
      build: {
        lib: {
          entry: resolve(root, 'src/index.ts'),
          name: 'LigaDS',
          formats: ['es', 'cjs'],
          fileName: (format) => `liga-ds.${format === 'es' ? 'js' : 'cjs'}`,
        },
        rollupOptions: {
          // Externalize React and all runtime deps — the consumer installs them.
          external: [/^react($|\/)/, /^react-dom($|\/)/, /^@floating-ui\//],
          output: {
            globals: { react: 'React', 'react-dom': 'ReactDOM' },
            assetFileNames: 'liga-ds.[ext]',
          },
        },
        cssCodeSplit: false,
        sourcemap: true,
      },
    };
  }

  // Dev / playground
  return {
    plugins: [react()],
    resolve: {
      alias: {
        'liga-ds/styles.css': resolve(root, 'src/styles.css'),
        'liga-ds': resolve(root, 'src/index.ts'),
      },
    },
  };
});
