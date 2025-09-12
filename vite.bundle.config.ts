import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    ssr: true, // ensure Node, not browser
    lib: {
      entry: resolve(__dirname, 'src/cli/cli.ts'),
      formats: ['es'],
      fileName: () => 'cli/cli.js',
    },
    outDir: 'dist',
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
