import React, { useState } from 'react';
import { useGeneratePdf } from '../pdf-generator/user-generate.pdf.tsx';
import { PdfDisplay } from './pdf-display/pdf-display.tsx';
import { PdfControls } from './pdf-controls/pdf-controls.tsx';
import styles from './pdf-viewer.module.css';

export const PdfViewer = () => {
  const pdfBlob = useGeneratePdf();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  if (!pdfBlob) {
    return <div>Generating PDF...</div>;
  }

  const onPdfLoadSuccess = ({ numPages }) => setNumPages(numPages);
  const goToPrevPage = () => setPageNumber((p) => Math.max(p - 1, 1));
  const goToNextPage = () => setPageNumber((p) => Math.min(p + 1, numPages));

  return (
    <div>
      <PdfControls
        pageNumber={pageNumber}
        numPages={numPages}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
      />
      <PdfDisplay
        pdfBlob={pdfBlob}
        pageNumber={pageNumber}
        onPdfLoadSuccess={onPdfLoadSuccess}
      />
    </div>
  );
};
