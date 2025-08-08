import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'node:path';

export default defineConfig({
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, 'docs-new'),
  },
  plugins: [
    react(),
    createHtmlPlugin({
      entry: 'src/docgen/views/main.tsx',
      template: 'new-index.html',
    }),
  ],
});
