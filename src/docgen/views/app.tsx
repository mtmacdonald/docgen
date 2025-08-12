import React from 'react';
import { Main } from './pages/main/main';
import '../../include/require/styles/framework.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { deriveParameters } from '../meta/derive-parameters.ts';

declare const __DOCGEN_PARAMETERS__: unknown;

export const App = () => {
  const derivedParameters = deriveParameters({
    rawParameters: __DOCGEN_PARAMETERS__,
    setVersion: '',
    setReleaseDate: '',
    homeLink: '',
  });

  return (
    <Main parameters={derivedParameters} sortedPages={[]} pdfEnabled>
      <div>
        <RouterProvider router={router} />
      </div>
    </Main>
  );
};
