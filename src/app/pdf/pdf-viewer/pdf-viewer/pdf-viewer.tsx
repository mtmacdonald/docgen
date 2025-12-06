import React, { useState } from 'react';
import { useGeneratePdf } from '../../pdf-generator/use-generate.pdf.tsx';
import { PdfDisplay } from '../pdf-display/pdf-display.tsx';
import { PdfControls } from '../pdf-controls/pdf-controls.tsx';
import styles from './pdf-viewer.module.css';
import { PdfLoader } from '../pdf-loader/pdf-loader.tsx';
import { Card } from '../../../views/components/card/card.tsx';

export const PdfViewer = () => {
  const { pdfUrl } = useGeneratePdf();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const loading = !pdfUrl;

  const onPdfLoadSuccess = ({ numPages }: { numPages: number }) =>
    setNumPages(numPages);
  const goToPrevPage = () => setPageNumber((p) => Math.max(p - 1, 1));
  const goToNextPage = () => setPageNumber((p) => Math.min(p + 1, numPages));

  const onDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onOpenNewTab = () => {
    if (!pdfUrl) return;
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className={styles.pdfViewerOuterWrapper}>
      <div className={styles.pdfViewerInnerWrapper}>
        <Card
          padding={false}
          headerClassName={styles.pdfHeader}
          className={styles.card}
          contentClassName={styles.cardContent}
          heading={
            <PdfControls
              pageNumber={pageNumber}
              numPages={numPages}
              goToPrevPage={goToPrevPage}
              goToNextPage={goToNextPage}
              onDownload={onDownload}
              onOpenNewTab={onOpenNewTab}
            />
          }
        >
          <div className={styles.loaderWrapper}>
            {loading && <PdfLoader />}
            <PdfDisplay
              pdfUrl={pdfUrl}
              pageNumber={pageNumber}
              onPdfLoadSuccess={onPdfLoadSuccess}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
