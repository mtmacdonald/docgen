import path from 'node:path';
import { build, createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { deriveParameters } from '../../docgen/meta/derive-parameters.ts';
import { loadMeta } from '../../docgen/fs/meta.ts';
import { sortPages } from '../../docgen/meta/sort-pages.ts';
import { findAppDir } from '../../paths.ts';
import { mkdirSync, copyFileSync } from 'node:fs';

const FONT_FILES = [
  'archivo-regular.ttf',
  'archivo-italic.ttf',
  'archivo-600.ttf',
  'archivo-600-italic.ttf',
  'space-grotesk-regular.ttf',
  'space-grotesk-600.ttf',
  'space-mono-regular.ttf',
  'space-mono-italic.ttf',
  'space-mono-700.ttf',
  'space-mono-700-italic.ttf',
];

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
  });

  const appPath = findAppDir(import.meta.dirname);
  const baseConfig = {
    root: appPath,
    publicDir: inputDir,
    base: '/',
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

    // Copy TTF fonts into outputDir/assets/fonts
    const fontDest = path.join(outputDir, 'assets');
    mkdirSync(fontDest, { recursive: true });
    FONT_FILES.forEach((file) => {
      const src = path.join(appPath, 'views/assets/styles/fonts', file);
      console.log(src);
      copyFileSync(src, path.join(fontDest, file));
    });
  } else {
    const server = await createServer(baseConfig);
    await server.listen();
    server.printUrls();
  }
};
