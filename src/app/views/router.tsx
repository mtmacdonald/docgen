import React, { useEffect, useState } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { PDFViewer } from '@react-pdf/renderer';
import { Pdf } from '../pdf/react-pdf/react-pdf.tsx';
import { Page } from './content/page.tsx';
import { Main } from './pages/main/main.tsx';
import { Cover } from './pages/cover/cover.tsx';
import type { TParameters, TSortedPages } from '../../docgen/types.ts';

declare const __DOCGEN_PARAMETERS__: TParameters;
declare const __DOCGEN_PAGES__: TSortedPages;

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
  component: () => (
    <Cover
      parameters={__DOCGEN_PARAMETERS__}
    />
  ),
});

const pdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'pdf',
  component: () => (
    <PDFViewer width="100%" height={800}>
      <Pdf
        parameters={__DOCGEN_PARAMETERS__}
        options={{}}
        sortedPages={__DOCGEN_PAGES__}
      />
    </PDFViewer>
  ),
});

const router = createRouter({
  routeTree: rootRoute.addChildren([
    ...pageRoutes,
    ownershipRoute,
    pdfRoute
  ]),
  basepath: '/docgen' // only for published git-hub pages docs
});

export { router };
