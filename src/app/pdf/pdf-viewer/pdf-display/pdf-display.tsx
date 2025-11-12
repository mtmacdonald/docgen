import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './pdf-display.module.css';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const PdfDisplay = ({ pdfBlob, pageNumber, onPdfLoadSuccess }) => {
  return (
    <div className={styles.pdfDisplayWrapper}>
      <Document
        file={URL.createObjectURL(pdfBlob)}
        onLoadSuccess={onPdfLoadSuccess}
      >
        <Page
          pageNumber={pageNumber}
          width={500}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};
