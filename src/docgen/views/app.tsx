import React from 'react';
import { Main } from './pages/main/main';
import '../../include/require/styles/framework.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { deriveParameters } from '../meta/derive-parameters.ts';
import parameters from '../../docs/parameters.json';

export const App = () => {
  const derivedParameters = deriveParameters({
    rawParameters: parameters,
    setVersion: '', //options.setVersion,
    setReleaseDate: '', //options.setReleaseDate,
    homeLink: '', //contents[0].pages[0],
  });
  return (
    <Main
      parameters={derivedParameters}
      sortedPages={[]}
      pdfEnabled
    >
      <div>
        <RouterProvider router={router} />
      </div>
    </Main>
  );
}
