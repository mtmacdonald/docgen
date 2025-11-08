import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useGeneratePdf } from './user-generate.pdf.tsx';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const PdfViewer = () => {
  const data = useGeneratePdf();
  if (!data) {
    return (<div>Generating PDF...</div>);
  }
  return (
    <Document
      file={{ data }}
      onLoadSuccess={() => {}}
      //renderMode="canvas"
    >
      <Page
        pageNumber={1}
        width={500}
        //renderTextLayer={false}
        //renderAnnotationLayer={false}
      />
    </Document>
  );
}
