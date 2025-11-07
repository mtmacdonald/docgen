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
  const file = useGeneratePdf();

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

  return useMemo(
    () =>
      file && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '20px',
            paddingBottom: '20px',
            background: '#fff',
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '500px',
              maxWidth: '100%',
              marginBottom: '8px',
            }}
          >
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              style={{
                border: '1px solid #ccc',
                background: '#f9f9f9',
                color: '#333',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '14px',
                cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer',
                opacity: pageNumber <= 1 ? 0.4 : 1,
                transition: 'background 0.2s',
              }}
            >
              ←
            </button>

            <span style={{ fontSize: '13px', color: '#555', minWidth: '100px', textAlign: 'center' }}>
              Page {pageNumber} of {numPages || '?'}
            </span>

            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              style={{
                border: '1px solid #ccc',
                background: '#f9f9f9',
                color: '#333',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '14px',
                cursor: pageNumber >= numPages ? 'not-allowed' : 'pointer',
                opacity: pageNumber >= numPages ? 0.4 : 1,
                transition: 'background 0.2s',
              }}
            >
              →
            </button>
          </div>

          {/* PDF container */}
          <div
            style={{
              border: '1px solid #ddd',
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#fff',
            }}
          >
            <Document
              file={file}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              renderMode="canvas"
            >
              <Page
                pageNumber={pageNumber}
                width={500}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </div>
      ),
    [
      file,
      numPages,
      pageNumber,
      goToPrevPage,
      goToNextPage,
      onDocumentLoadSuccess,
    ],
  );
};
