import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './pdf-display.module.css';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { PdfLoader } from '../pdf-loader/pdf-loader.tsx';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const WIDTH = 500;

export const PdfDisplay = ({ pdfBlob, pageNumber, onPdfLoadSuccess }) => {
  if (!pdfBlob) {
    return null;
  }
  return (
    <div className={styles.pdfDisplayWrapper}>
      <Document
        file={URL.createObjectURL(pdfBlob)}
        loading={<PdfLoader />}
        onLoadSuccess={onPdfLoadSuccess}
      >
        <Page
          pageNumber={pageNumber}
          width={WIDTH}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};
