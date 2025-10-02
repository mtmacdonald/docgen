import path from 'node:path';
import { build, createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { deriveParameters } from '../../docgen/meta/derive-parameters.ts';
import { loadInputs } from '../../docgen/fs/load-inputs.ts';
import { sortPages } from '../../docgen/meta/sort-pages.ts';
import { findAppDir } from '../../paths.ts';

export const generate = async (command, mode: string) => {
  /*
    Need dynamic basepath that works here, parameters links, router fix
   */

  const inputDir = path.resolve(process.cwd(), command.input);
  const outputDir = path.resolve(process.cwd(), command.output);

  const inputs = await loadInputs({
    inputPath: inputDir,
    verbose: false,
  });
  if (!inputs) {
    throw new Error('Invalid DocGen input files, aborting...');
  }
  const { contents, rawParameters } = inputs;

  const sortedPages = sortPages({ contents });
  const parameters = deriveParameters({
    rawParameters,
    setVersion: command?.setVersion,
    setReleaseDate: command?.setReleaseDate,
  });

  const appPath = findAppDir(import.meta.dirname);
  const baseConfig = {
    root: appPath,
    publicDir: inputDir,
    base: '/docgen',
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html: string) {
          return html.replace(/%APP_TITLE%/g, parameters.title ?? 'DocGen');
        },
      },
    ],
    define: {
      __DOCGEN_PARAMETERS__: JSON.stringify(parameters),
      __DOCGEN_PAGES__: JSON.stringify(sortedPages),
      __APP_TITLE__: JSON.stringify(parameters.title ?? 'DocGen'),
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
