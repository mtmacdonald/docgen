import React, { useMemo } from 'react';
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

  // Memoize Blob URL so it doesn’t regenerate every render
  const pdfUrl = useMemo(() => {
    if (!data) return null;
    const blob = new Blob([data], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }, [data]);

  const handleOpenPdf = () => {
    if (!pdfUrl) return;
    window.open(pdfUrl, '_blank');
  };

  if (!data) return <div>Generating PDF...</div>;

  return (
    <div>
      <button onClick={handleOpenPdf}>Open PDF in New Tab</button>

      <Document file={pdfUrl}>
        {/* Render all pages */}
        {Array.from({ length: 1 }, (_, i) => (
          <Page key={i} pageNumber={i + 1} width={500} />
        ))}
      </Document>
    </div>
  );
};
