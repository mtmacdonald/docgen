import { defineConfig } from 'vite'
import { resolve } from 'path'
import path from 'node:path';

export default defineConfig({
  build: {
    emptyOutDir: true,
    ssr: true, // ensure Node, not browser
    lib: {
      entry: resolve(__dirname, 'src/cli/cli.ts'),
      formats: ['es'],
      fileName: () => 'cli/cli.js',
    },
    outDir: path.resolve(process.cwd(), 'dist/cli'),
    minify: false,
    target: 'node22',
    rollupOptions: {
      external: [
        'vite',
        '@vitejs/plugin-react',
        'commander',
        'fs',
        'path',
        'url',
        'child_process',
        'events',
        'constants',
      ],
      output: {
        banner: '#!/usr/bin/env node',
      },
    },
  },
})
