import React, { useState } from 'react';
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
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  if (!blob) return <div>Generating PDF...</div>;

  const handleDocumentLoad = ({ numPages }) => setNumPages(numPages);
  const goToPrevPage = () => setPageNumber(p => Math.max(p - 1, 1));
  const goToNextPage = () => setPageNumber(p => Math.min(p + 1, numPages));

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>Prev</button>
        <span>Page {pageNumber} of {numPages}</span>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>Next</button>
      </div>

      <Document file={URL.createObjectURL(blob)} onLoadSuccess={handleDocumentLoad}>
        <Page
          pageNumber={pageNumber}
          width={500}
          renderAnnotationLayer={false}
          renderTextLayer
        />
      </Document>
    </div>
  );
};
