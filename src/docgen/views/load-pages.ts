const pages = import.meta.glob('../../docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const loadPages = () => {
  return Object.entries(pages).reduce(
    (acc, [fullPath, content]) => {
      let routePath = fullPath.replace('../../docs/', '').replace(/\.md$/, '');

      if (routePath === 'index') {
        routePath = '/';
      }

      acc[routePath] = content;
      return acc;
    },
    {} as Record<string, any>,
  );
};
