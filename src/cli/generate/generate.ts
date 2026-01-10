import path from 'node:path';
import { createRequire } from 'node:module';
import { build, createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import dotenv from 'dotenv';
import { deriveParameters } from '../../docgen/meta/derive-parameters.ts';
import { loadInputs } from '../../docgen/fs/load-inputs.ts';
import { sortPages } from '../../docgen/meta/sort-pages.ts';
import { findAppDir } from '../../paths.ts';
import { styleVariablesPlugin } from './plugins/style-variables-plugin.ts';
import { htmlTransformPlugin } from './plugins/html-transform-plugin.ts';
import { watchInputDirPlugin } from './plugins/watch-input-dir-plugin.ts';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const require = createRequire(import.meta.url);
const basePath = process.env.BASE_PATH || '/';

export const generate = async (command, mode: string) => {
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
    base: basePath,
    resolve: {
      // Remove once github.com/davidmyersdev/vite-plugin-node-polyfills/issues/140 is fixed
      alias: {
        'vite-plugin-node-polyfills/shims/process':
          require.resolve('vite-plugin-node-polyfills/shims/process'),
        'vite-plugin-node-polyfills/shims/buffer':
          require.resolve('vite-plugin-node-polyfills/shims/buffer'),
        'vite-plugin-node-polyfills/shims/global':
          require.resolve('vite-plugin-node-polyfills/shims/global'),
      },
    },
    plugins: [
      nodePolyfills({
        include: ['buffer'],
      }),
      styleVariablesPlugin(appPath, inputDir),
      react({
        // Exclude PRF worker from HMR (ReferenceError: window is not defined @react-refresh error caused by HMR)
        // https://www.reddit.com/r/react/comments/1i808v1/comment/mxdh5xv/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
        exclude: /\/src\/app\/pdf\//,
      }),
      htmlTransformPlugin(parameters.title ?? 'DocGen'),
      ...(mode !== 'build' ? [watchInputDirPlugin(inputDir)] : []),
    ],
    define: {
      __DOCGEN_PARAMETERS__: JSON.stringify(parameters),
      __DOCGEN_PAGES__: JSON.stringify(sortedPages),
      __APP_TITLE__: JSON.stringify(parameters.title ?? 'DocGen'),
      __BASE_PATH__: JSON.stringify(basePath),
    },
  };

  if (mode === 'build') {
    await build({
      ...baseConfig,
      build: {
        outDir: outputDir,
        emptyOutDir: true,
        // See #187 - esbuild minification works, oxc minification currently conflicts with marked parsing...
        minify: false,
      },
    });
  } else {
    const server = await createServer(baseConfig);
    await server.listen();
    server.printUrls();
  }
};
