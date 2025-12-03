import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './pdf-display.module.css';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { PdfLoader } from '../pdf-loader/pdf-loader.tsx';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const PdfDisplay = ({ pdfUrl, pageNumber, onPdfLoadSuccess }) => {
  const { width, ref } = useResizeDetector<HTMLDivElement>();
  if (!pdfUrl) {
    return null;
  }
  const key = `${pdfUrl}-${pageNumber}`;
  return (
    <div ref={ref} className={styles.pdfDisplayWrapper}>
      <Document
        file={pdfUrl}
        loading={<PdfLoader />}
        onLoadSuccess={onPdfLoadSuccess}
      >
        <Page
          key={key}
          pageNumber={pageNumber}
          width={width}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};
