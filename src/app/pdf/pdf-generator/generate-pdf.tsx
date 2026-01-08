import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { Pdf } from './react-pdf.tsx';

export const generatePdf = async (loadedPages, styleVariables) => {
  const instance = await pdf(
    <Pdf loadedPages={loadedPages} styleVariables={styleVariables} />,
  );
  const blob = await instance.toBlob();
  return blob;
};
