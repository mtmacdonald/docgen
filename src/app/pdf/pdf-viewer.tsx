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
  const blob = useGeneratePdf();

  if (!blob) {
    return <div>Generating PDF...</div>;
  }

  return (
    <div>
      <Document file={URL.createObjectURL(blob)}>
        {/* Render all pages */}
        {Array.from({ length: 21 }, (_, i) => (
          <Page key={i} pageNumber={i + 1} width={500} renderAnnotationLayer={false} renderTextLayer={true} />
        ))}
      </Document>
    </div>
  );
};
