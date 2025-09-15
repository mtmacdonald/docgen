import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { deriveParameters } from './src/docgen/meta/derive-parameters';
import { loadMeta } from './src/docgen/fs/meta';
import { sortPages } from './src/docgen/meta/sort-pages';

// Configure input/output directories
const inputDir = path.resolve(process.cwd(), 'src/docs');
const outputDir = path.resolve(process.cwd(), 'docs');

export default defineConfig(async ({ mode }) => {
  // Load doc metadata
  const { contents, rawParameters } = await loadMeta({
    inputPath: inputDir,
    verbose: true,
  });

  const sortedPages = sortPages({ contents });
  const parameters = deriveParameters({
    rawParameters,
    setVersion: '',
    setReleaseDate: '',
    homeLink: contents?.[0]?.pages?.[0],
  });

  return {
    root: path.resolve(process.cwd(), 'src'), // React app + index.html
    publicDir: inputDir, // serve docs as static assets
    plugins: [react()],
    define: {
      __DOCGEN_PARAMETERS__: JSON.stringify(parameters),
      __DOCGEN_PAGES__: JSON.stringify(sortedPages),
    },
    build: {
      outDir: outputDir,
      emptyOutDir: true,
    },
  };
});
