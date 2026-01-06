import fs from 'node:fs';
import path from 'node:path';
import StyleDictionary from 'style-dictionary';
import { type Plugin } from 'vite';

export const styleVariablesPlugin = (appDir: string): Plugin => {
  const cssVirtualModuleId = 'virtual:style-variables.css';
  const jsVirtualModuleId = 'virtual:style-variables.js';
  const resolvedCssPath = `\0${path.join(appDir, 'virtual-style-variables.css')}`;
  const resolvedJsPath = `\0${path.join(appDir, 'virtual-style-variables.js')}`;

  return {
    name: 'style-variables-plugin',
    enforce: 'pre',
    resolveId(id: string) {
      if (id === cssVirtualModuleId) {
        return '\0' + resolvedCssPath;
      }
      if (id === jsVirtualModuleId) {
        return '\0' + resolvedJsPath;
      }
    },
    async load(id: string) {
      if (id === '\0' + resolvedCssPath || id === '\0' + resolvedJsPath) {
        const configPath = path.join(appDir, 'styles/config.json');
        const configContent = fs.readFileSync(configPath, 'utf-8');
        const config = JSON.parse(configContent);
        // Rewrite source to be absolute based on appDir to avoid CWD issues
        config.source = [path.join(appDir, 'styles/style-tokens/**/*.json')];

        const sd = new StyleDictionary(config);
        if (id === '\0' + resolvedCssPath) {
          const files = await sd.formatPlatform('css');
          return files[0]?.output as string;
        }
        if (id === '\0' + resolvedJsPath) {
          const files = await sd.formatPlatform('js');
          return files[0]?.output as string;
        }
      }
    },
    handleHotUpdate({ file, server }) {
      if (!file.includes('/style-tokens/')) return;
      const ids = ['\0' + resolvedCssPath, '\0' + resolvedJsPath];
      ids.forEach((id) => {
        const mod = server.moduleGraph.getModuleById(id);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
        }
      });
      return [];
    },
  };
};
