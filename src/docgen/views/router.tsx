import React from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { Page } from './content/page.tsx';
import { loadPages } from './load-pages.ts';

const rootRoute = createRootRoute();

const pageRoutes = Object.entries(loadPages()).map(([fullPath, content]) => {
  let routePath = fullPath
    .replace('../../docs/', '')
    .replace(/\.md$/, '');

  if (routePath === 'index') {
    routePath = '/';
  }

  return createRoute({
    getParentRoute: () => rootRoute,
    path: routePath,
    component: () => <Page content={content} />,
  });
});

const router = createRouter({
  routeTree: rootRoute.addChildren(pageRoutes),
});

export { router };
