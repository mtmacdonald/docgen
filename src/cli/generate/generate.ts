import path from 'node:path';
import { build, createServer } from 'vite';
import StyleDictionary from 'style-dictionary';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { deriveParameters } from '../../docgen/meta/derive-parameters.ts';
import { loadInputs } from '../../docgen/fs/load-inputs.ts';
import { sortPages } from '../../docgen/meta/sort-pages.ts';
import { findAppDir } from '../../paths.ts';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const basePath = process.env.BASE_PATH || '/';

const styleVariablesPlugin = () => {
  const cssVirtualModuleId = 'virtual:style-variables.css';
  const resolvedCssVirtualModuleId = '\0' + cssVirtualModuleId;
  const jsVirtualModuleId = 'virtual:style-variables.js';
  const resolvedJsVirtualModuleId = '\0' + jsVirtualModuleId;

  return {
    name: 'style-variables-plugin',
    resolveId(id: string) {
      if (id === cssVirtualModuleId) {
        return resolvedCssVirtualModuleId;
      }
      if (id === jsVirtualModuleId) {
        return resolvedJsVirtualModuleId;
      }
    },
    async load(id: string) {
      if (
        id === resolvedCssVirtualModuleId ||
        id === resolvedJsVirtualModuleId
      ) {
        const sd = new StyleDictionary('config.json');
        // await sd.buildAllPlatforms(); // Don't build to disk
        const dictionary = await sd.exportPlatform('css');

        const flattenTokens = (obj: any, result: any[] = []) => {
          for (const key in obj) {
            if (obj[key].hasOwnProperty('value')) {
              result.push(obj[key]);
            } else if (typeof obj[key] === 'object') {
              flattenTokens(obj[key], result);
            }
          }
          return result;
        };

        const tokens = flattenTokens(dictionary);

        if (id === resolvedCssVirtualModuleId) {
          return `:root {\n${tokens.map((t) => `  --${t.name}: ${t.value};`).join('\n')}\n}`;
        }

        if (id === resolvedJsVirtualModuleId) {
          const toPascalCase = (str: string) =>
            str.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
          return tokens
            .map((t) => `export const ${toPascalCase(t.name)} = "${t.value}";`)
            .join('\n');
        }
      }
    },
    handleHotUpdate({ file, server }: any) {
      if (file.includes('style-tokens')) {
        console.log('Style tokens changed, reloading...');
        const cssModule = server.moduleGraph.getModuleById(
          resolvedCssVirtualModuleId,
        );
        const jsModule = server.moduleGraph.getModuleById(
          resolvedJsVirtualModuleId,
        );
        if (cssModule) {
          server.moduleGraph.invalidateModule(cssModule);
        }
        if (jsModule) {
          server.moduleGraph.invalidateModule(jsModule);
        }
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
};

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
    plugins: [
      styleVariablesPlugin(),
      react({
        // Exclude PRF worker from HMR (ReferenceError: window is not defined @react-refresh error caused by HMR)
        // https://www.reddit.com/r/react/comments/1i808v1/comment/mxdh5xv/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
        exclude: /\/src\/app\/pdf\//,
      }),
      {
        name: 'html-transform',
        transformIndexHtml(html: string) {
          return html.replace(/%APP_TITLE%/g, parameters.title ?? 'DocGen');
        },
      },
      ...(mode !== 'build'
        ? [
            {
              name: 'watch-input-dir',
              configureServer(server) {
                const watchPattern = path.join(inputDir, '**/*.{md,json,png}');
                server.watcher.add(watchPattern);
                const handleFileChange = (changedPath: string) => {
                  console.log(
                    `Input file changed, reloading: ${path.relative(inputDir, changedPath)}`,
                  );
                  server.ws.send({ type: 'full-reload' });
                };
                server.watcher.on('add', handleFileChange);
                server.watcher.on('change', handleFileChange);
                server.watcher.on('unlink', handleFileChange);
              },
            },
          ]
        : []),
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
      },
    });
  } else {
    const server = await createServer(baseConfig);
    await server.listen();
    server.printUrls();
  }
};
