import path from 'node:path';
import { build, createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { deriveParameters } from '../../docgen/meta/derive-parameters.ts';
import { loadMeta } from '../../docgen/fs/meta.ts';
import { sortPages } from '../../docgen/meta/sort-pages.ts';
import { findAppDir } from '../../paths.ts';

export const generate = async (command, mode) => {
  const inputDir = path.resolve(process.cwd(), command.input);
  const outputDir = path.resolve(process.cwd(), command.output);

  const { contents, rawParameters } = await loadMeta({
    inputPath: inputDir,
    verbose: false,
  });

  const sortedPages = sortPages({ contents });
  const parameters = deriveParameters({
    rawParameters,
    setVersion: '',
    setReleaseDate: '',
    homeLink: contents?.[0]?.pages[0],
  });

  const appPath = findAppDir(import.meta.dirname);
  const baseConfig = {
    root: appPath,
    publicDir: appPath,
    plugins: [react()],
    define: {
      __DOCGEN_PARAMETERS__: JSON.stringify(parameters),
      __DOCGEN_PAGES__: JSON.stringify(sortedPages),
    },
  };

  if (mode === 'build') {
    await build({
      ...baseConfig,
      build: {
        outDir: outputDir,
        emptyOutDir: true,
      },
    });
  } else {
    const server = await createServer(baseConfig);
    await server.listen();
    server.printUrls();
  }
};
