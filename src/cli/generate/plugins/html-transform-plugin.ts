import { Plugin } from 'vite';

export const htmlTransformPlugin = (title: string): Plugin => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      return html.replace(/%APP_TITLE%/g, title);
    },
  };
};
