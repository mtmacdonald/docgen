import React, { useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { TParameters, TSortedPages } from '../../../docgen/types.ts';
import { Pdf } from './react-pdf.tsx';
import { useGeneratePdf } from './hooks/use-generate-pdf.tsx';
import { PDFDocument, StandardFonts } from 'pdf-lib';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

declare const __DOCGEN_PARAMETERS__: TParameters;
declare const __DOCGEN_PAGES__: TSortedPages;

const enableWorkaround = false;

// const PDF = (
//   <Pdf
//     parameters={__DOCGEN_PARAMETERS__}
//     options={{}}
//     sortedPages={__DOCGEN_PAGES__}
//   />
// );

export const PDFViewer = () => {
  const [numPages, setNumPages] = useState(2);
  const [fileData, setFileData] = useState<Uint8Array | null>(null);

  // Generate a simple 2-page PDF on mount
  useMemo(() => {
    const generatePdf = async () => {
      const pdfDoc = await PDFDocument.create();
      const page1 = pdfDoc.addPage([600, 800]);
      const page2 = pdfDoc.addPage([600, 800]);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      page1.drawText('Hello World - Page 1', { x: 50, y: 700, size: 30, font });
      page2.drawText('Hello World - Page 2', { x: 50, y: 700, size: 30, font });

      const pdfBytes = await pdfDoc.save();
      setFileData(new Uint8Array(pdfBytes));
    };

    generatePdf();
  }, []);

  const render = useMemo(
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

  // if (instance.loading || !fileData) return <div>Loading...</div>;
  // if (instance.error) return <div>Something went wrong: {instance.error}</div>;

  //if (enableWorkaround) return render;

  // return (
  //   <ReactPDFViewer width="100%" height={800}>
  //     <Pdf
  //       parameters={__DOCGEN_PARAMETERS__}
  //       options={{}}
  //       sortedPages={__DOCGEN_PAGES__}
  //     />
  //   </ReactPDFViewer>
  // );

  return render;
};
