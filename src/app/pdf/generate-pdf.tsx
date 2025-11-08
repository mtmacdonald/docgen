import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { Pdf } from './react-pdf/react-pdf.tsx';

export const generatePdf = async (loadedPages) => {
  const blob = await pdf(<Pdf loadedPages={loadedPages} />).toBlob();
  const buffer = await blob.arrayBuffer();
  return new Uint8Array(buffer);
};
