import StyleDictionary from 'style-dictionary';
import { type Plugin } from 'vite';

export const styleVariablesPlugin = (): Plugin => {
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
