import React, { useState } from 'react';
import { useGeneratePdf } from '../pdf-generator/user-generate.pdf.tsx';
import { PdfDisplay } from './pdf-display/pdf-display.tsx';
import { PdfControls } from './pdf-controls/pdf-controls.tsx';
import styles from './pdf-viewer.module.css';
import { PdfLoader } from './pdf-loader/pdf-loader.tsx';
import { Card } from '../../views/components/card/card.tsx';

export const PdfViewer = () => {
  const pdfBlob = useGeneratePdf();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const loading = !pdfBlob;

  const onPdfLoadSuccess = ({ numPages }: { numPages: number }) =>
    setNumPages(numPages);
  const goToPrevPage = () => setPageNumber((p) => Math.max(p - 1, 1));
  const goToNextPage = () => setPageNumber((p) => Math.min(p + 1, numPages));

  return (
    <div className={styles.pdfViewerOuterWrapper}>
      <div className={styles.pdfViewerInnerWrapper}>
        <Card
          padding={false}
          heading={
            <PdfControls
              pageNumber={pageNumber}
              numPages={numPages}
              goToPrevPage={goToPrevPage}
              goToNextPage={goToNextPage}
            />
          }
        >
          <div className={styles.loaderWrapper}>
            {loading && <PdfLoader />}
            <PdfDisplay
              pdfBlob={pdfBlob}
              pageNumber={pageNumber}
              onPdfLoadSuccess={onPdfLoadSuccess}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
