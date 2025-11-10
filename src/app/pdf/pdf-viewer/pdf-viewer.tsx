import React, { useState } from 'react';
import { useGeneratePdf } from '../pdf-generator/user-generate.pdf.tsx';
import { PdfDisplay } from './pdf-display.tsx';

export const PdfViewer = () => {
  const pdfBlob = useGeneratePdf();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  if (!pdfBlob) {
    return <div>Generating PDF...</div>;
  }

  const onPdfLoadSuccess = ({ numPages }) => setNumPages(numPages);
  const goToPrevPage = () => setPageNumber(p => Math.max(p - 1, 1));
  const goToNextPage = () => setPageNumber(p => Math.min(p + 1, numPages));

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>Prev</button>
        <span>Page {pageNumber} of {numPages}</span>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>Next</button>
      </div>
      <PdfDisplay
        pdfBlob={pdfBlob}
        pageNumber={pageNumber}
        onPdfLoadSuccess={onPdfLoadSuccess}
      />
    </div>
  );
};
