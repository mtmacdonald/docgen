import React from 'react';
import { Main } from './pages/main/main';
import '../../include/require/styles/framework.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

declare const __DOCGEN_PARAMETERS__: unknown;
declare const __DOCGEN_PAGES__: unknown;

export const App = () => {

  return (
    <Main
      parameters={__DOCGEN_PARAMETERS__}
      sortedPages={__DOCGEN_PAGES__}
      pdfEnabled
    >
      <div>
        <RouterProvider router={router} />
      </div>
    </Main>
  );
};
