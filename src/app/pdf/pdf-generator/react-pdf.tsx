import React from 'react';
import { Document, Font } from '@react-pdf/renderer';
import { PdfPage } from './pdf-page/pdf-page.tsx';
import { marked } from 'marked';

import archivoRegular from '../../views/assets/styles/fonts/archivo-regular.ttf';
import archivoItalic from '../../views/assets/styles/fonts/archivo-italic.ttf';
import archivo600 from '../../views/assets/styles/fonts/archivo-600.ttf';
import archivo600Italic from '../../views/assets/styles/fonts/archivo-600-italic.ttf';

import spaceGroteskRegular from '../../views/assets/styles/fonts/space-grotesk-regular.ttf';
import spaceGrotesk600 from '../../views/assets/styles/fonts/space-grotesk-600.ttf';

import spaceMonoRegular from '../../views/assets/styles/fonts/space-mono-regular.ttf';
import spaceMonoItalic from '../../views/assets/styles/fonts/space-mono-italic.ttf';
import spaceMono700 from '../../views/assets/styles/fonts/space-mono-700.ttf';
import spaceMono700Italic from '../../views/assets/styles/fonts/space-mono-700-italic.ttf';
import type { TParameters, TSortedPages } from '../../../docgen/types.ts';
import { preprocessAdmonitions } from '../../common/markdown/markdown.ts';

declare const __DOCGEN_PARAMETERS__: TParameters;
declare const __DOCGEN_PAGES__: TSortedPages;

Font.register({
  family: 'archivo',
  fonts: [
    { src: archivoRegular, fontStyle: 'normal', fontWeight: 400 },
    { src: archivoItalic, fontStyle: 'italic', fontWeight: 400 },
    { src: archivo600, fontStyle: 'normal', fontWeight: 600 },
    { src: archivo600Italic, fontStyle: 'italic', fontWeight: 600 },
  ],
});

Font.register({
  family: 'space-grotesk',
  fonts: [
    { src: spaceGroteskRegular, fontStyle: 'normal', fontWeight: 400 },
    { src: spaceGrotesk600, fontStyle: 'normal', fontWeight: 600 },
  ],
});

Font.register({
  family: 'space-mono',
  fonts: [
    { src: spaceMonoRegular, fontStyle: 'normal', fontWeight: 400 },
    { src: spaceMonoItalic, fontStyle: 'italic', fontWeight: 400 },
    { src: spaceMono700, fontStyle: 'normal', fontWeight: 700 },
    { src: spaceMono700Italic, fontStyle: 'italic', fontWeight: 700 },
  ],
});

// Async loader for PDF pages

export const Pdf = ({ loadedPages, styleVariables }) => {
  const parameters = __DOCGEN_PARAMETERS__;
  const options = {};
  const allSources = Object.values(__DOCGEN_PAGES__).flatMap((columns) =>
    columns.flatMap((section) => section.pages.map((p: any) => p.source)),
  );

  return (
    <Document>
      {allSources.map((source, i) => {
        const html = marked(preprocessAdmonitions(loadedPages[source] || ''));
        return (
          <PdfPage
            key={i}
            page={html}
            parameters={parameters}
            options={options}
            styleVariables={styleVariables}
          />
        );
      })}
    </Document>
  );
};
