import React, { useEffect, useState } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { Page } from './content/page.tsx';
import { Main } from './pages/main/main.tsx';
import { Cover } from './pages/cover/cover.tsx';

declare const __DOCGEN_PARAMETERS__: unknown;
declare const __DOCGEN_PAGES__: Record<string, any[]>;

// Async loader to fetch Markdown files from public dir
const loadPages = async () => {
  const pages: Record<string, string> = {};

  const sources = Object.values(__DOCGEN_PAGES__)
    .flatMap((columns) =>
      columns.flatMap((section) => section.pages.map((p: any) => p.source)),
    );

  await Promise.all(
    sources.map(async (filename) => {
      try {
        const res = await fetch(`/${filename}`);
        pages[filename] = res.ok ? await res.text() : `Error loading ${filename}`;
      } catch (err) {
        pages[filename] = `Error loading ${filename}: ${err}`;
      }
    }),
  );

  return pages;
};

// AsyncPage component loads content dynamically
const AsyncPage = ({ source }: { source: string }) => {
  const [content, setContent] = useState<string>('Loading...');

  useEffect(() => {
    const fetchPage = async () => {
      const pages = await loadPages();
      setContent(pages[source] || 'Page not found');
    };
    fetchPage();
  }, [source]);

  return <Page content={content} />;
};

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Main
      parameters={__DOCGEN_PARAMETERS__ as any}
      sortedPages={__DOCGEN_PAGES__ as any}
      pdfEnabled
    />
  ),
});

// Dynamically generate routes from DOCGEN_PAGES
const pageRoutes = Object.values(__DOCGEN_PAGES__)
  .flatMap((columns) =>
    columns.flatMap((section) =>
      section.pages.map((p: any) => {
        let routePath = p.source.replace(/\.md$/, '');
        if (routePath === 'index') routePath = '/';

        return createRoute({
          getParentRoute: () => rootRoute,
          path: routePath,
          component: () => <AsyncPage source={p.source} />,
        });
      }),
    ),
  );

// Add static /ownership route
const ownershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'ownership',
  component: () => (
    <Cover
      parameters={__DOCGEN_PARAMETERS__ as any}
    />
  ),
});

const router = createRouter({
  routeTree: rootRoute.addChildren([...pageRoutes, ownershipRoute]),
});

export { router };
