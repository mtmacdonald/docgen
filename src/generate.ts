import path from 'node:path';
import { build, createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { deriveParameters } from './docgen/meta/derive-parameters.ts';
import { loadMeta } from './docgen/fs/meta.ts';
import { sortPages } from './docgen/meta/sort-pages.ts';

export const runVite = async (command, mode) => {
  const inputDir = path.resolve(process.cwd(), command.input);
  const publicDir = path.join(inputDir, 'files');
  const outputDir = path.resolve(process.cwd(), command.output);

  const { contents, rawParameters } = await loadMeta({
    inputPath: inputDir,
    verbose: false,
  });
  const sortedPages = sortPages({ contents });
  const parameters = deriveParameters({
    rawParameters,
    setVersion: '', // options.setVersion,
    setReleaseDate: '', // options.setReleaseDate,
    homeLink: contents?.[0]?.pages[0],
  });

  const baseConfig = {
    root: process.cwd(),
    publicDir,
    plugins: [react()],
    define: {
      __DOCGEN_PARAMETERS__: JSON.stringify(parameters),
      __DOCGEN_PAGES__: JSON.stringify(sortedPages),
    },
  };

  if (mode === 'build') {
    await build({
      ...baseConfig,
      build: { outDir: outputDir, emptyOutDir: true },
    });
  } else {
    const server = await createServer(baseConfig);
    await server.listen();
    server.printUrls();
  }
};
