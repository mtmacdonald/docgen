import React, { useMemo } from 'react';
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
  const pdfUrl = useMemo(() => {
    if (!pdfBlob) return null;
    return URL.createObjectURL(pdfBlob);
  }, [pdfBlob]);
  if (!pdfBlob) {
    return null;
  }
  const key = `${pdfUrl}-${pageNumber}`;
  //console.log('key', key);
  return (
    <div className={styles.pdfDisplayWrapper}>
      <Document
        file={pdfUrl}
        loading={<PdfLoader />}
        onLoadSuccess={onPdfLoadSuccess}
      >
        <Page
          key={key}
          pageNumber={pageNumber}
          width={WIDTH}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};
