import React, { useEffect, useState } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router';
import { Page } from './content/page.tsx';
import { Main } from './pages/main/main.tsx';
import { Cover } from './pages/cover/cover.tsx';
import type { TParameters, TSortedPages } from '../../docgen/types.ts';

declare const __DOCGEN_PARAMETERS__: TParameters;
declare const __DOCGEN_PAGES__: TSortedPages;
declare const __BASE_PATH__: string;

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
        const res = await fetch(`${__BASE_PATH__}${filename}`);
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
      parameters={__DOCGEN_PARAMETERS__}
      sortedPages={__DOCGEN_PAGES__}
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

const ownershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'ownership',
  component: () => <Cover parameters={__DOCGEN_PARAMETERS__} />,
});

export const pdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'pdf',
  component: () => null, // handled by main.tsx (pdfVisible)
});

/*
  Redirects for legacy routes in the gh-pages version
 */
const redirectLegacyRoutes = createRoute({
  getParentRoute: () => rootRoute,
  path: 'docs/$path+',
  beforeLoad: ({ params }) => {
    const { ['path+']: rawPath } = params;
    const path = Array.isArray(rawPath) ? rawPath.join('/') : rawPath;

    // Remove .html or .pdf extension
    const cleanPath = path.replace(/\.(html|pdf)$/i, '');

    if (cleanPath === 'index') {
      throw redirect({ to: '/' });
    } else if (cleanPath === 'docgen') {
      throw redirect({ to: '/pdf' });
    } else {
      throw redirect({ to: `/${cleanPath}` });
    }
  },
});

const router = createRouter({
  routeTree: rootRoute.addChildren([
    ...pageRoutes,
    ownershipRoute,
    pdfRoute,
    ...(__BASE_PATH__ === '/docgen/' ? [redirectLegacyRoutes] : []),
  ]),
  basepath: __BASE_PATH__,
});

export { router };
