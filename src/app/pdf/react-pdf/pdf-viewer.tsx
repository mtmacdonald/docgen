import React, { useMemo, useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useGeneratePdf } from './hooks/use-generate-pdf.tsx';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const PDFViewer = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const { fileData } = useGeneratePdf(<div />); // placeholder document

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }, []);

  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  }, [numPages]);

  const file = useMemo(() => (fileData ? { data: fileData } : null), [fileData]);

  return useMemo(
    () =>
      file && (
        <div style={{ textAlign: 'center' }}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            renderMode="canvas"
          >
            <Page pageNumber={pageNumber} width={700} />
          </Document>

          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              Previous
            </button>
            <span>
              Page {pageNumber} of {numPages || '?'}
            </span>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
              Next
            </button>
          </div>
        </div>
      ),
    [file, numPages, pageNumber, goToPrevPage, goToNextPage, onDocumentLoadSuccess],
  );
};
