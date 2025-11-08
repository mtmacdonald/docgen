import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { Pdf } from './react-pdf/react-pdf.tsx';
import type { TParameters, TSortedPages } from '../../docgen/types.ts';

declare const __DOCGEN_PARAMETERS__: TParameters;
declare const __DOCGEN_PAGES__: TSortedPages;

export const PdfViewer = () => {
  return (
    <PDFViewer width="100%" height={800}>
      <Pdf
        parameters={__DOCGEN_PARAMETERS__}
        options={{}}
        sortedPages={__DOCGEN_PAGES__}
      />
    </PDFViewer>
  );
}
