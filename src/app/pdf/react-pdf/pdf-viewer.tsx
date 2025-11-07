// pdf-viewer.tsx
import React, { useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useGeneratePdf } from './hooks/use-generate-pdf.tsx';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const PDFViewer = () => {
  const [numPages, setNumPages] = useState(2);
  const { fileData } = useGeneratePdf(<div />); // placeholder document

  // Todo - generating, display loading

  return useMemo(
    () =>
      fileData && (
        <div>
          <Document
            file={{ data: fileData }}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            renderMode="canvas"
          >
            {Array.from({ length: numPages }, (_, i) => (
              <Page key={i} pageNumber={i + 1} width={700} />
            ))}
          </Document>
        </div>
      ),
    [fileData, numPages],
  );
};
