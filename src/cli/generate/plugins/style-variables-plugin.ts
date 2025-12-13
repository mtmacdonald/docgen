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
        if (id === resolvedCssVirtualModuleId) {
          const files = await sd.formatPlatform('css');
          return files[0]?.output as string;
        }
        if (id === resolvedJsVirtualModuleId) {
          const files = await sd.formatPlatform('js');
          return files[0]?.output as string;
        }
      }
    },
    handleHotUpdate({ file, server }) {
      if (!file.includes('/style-tokens/')) return;
      const ids = [resolvedCssVirtualModuleId, resolvedJsVirtualModuleId];
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
