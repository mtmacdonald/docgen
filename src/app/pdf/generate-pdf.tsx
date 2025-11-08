import React from 'react';

export const generatePdf = async () => {
  const { pdf } = await import('@react-pdf/renderer');
  const { SimplePdf } = await import('./simple-pdf');
  const blob = await pdf(<SimplePdf />).toBlob();
  const arrayBuffer = await blob.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};
