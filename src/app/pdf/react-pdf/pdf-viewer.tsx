import React from 'react';
import { BlobProvider, PDFViewer as ReactPDFViewer } from '@react-pdf/renderer';
import { Pdf } from './react-pdf.tsx';
import { Document, Page, pdfjs } from 'react-pdf';
import type { TParameters, TSortedPages } from '../../../docgen/types.ts';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

declare const __DOCGEN_PARAMETERS__: TParameters;
declare const __DOCGEN_PAGES__: TSortedPages;

const enableWorkaround = false;

export const PDFViewer = () => {
  if (enableWorkaround) {
    console.log('got here');
    return (
      <BlobProvider
        document={<Pdf parameters={__DOCGEN_PARAMETERS__} options={{}} sortedPages={__DOCGEN_PAGES__} />}
      >
        {({ blob, url, loading }) => {
          if (loading) {
            return (
              <div>Loading...</div>
            );
          }
          return (
            <div style={{ width: '100%' }}>
              <Document
                file={url}
                onLoadSuccess={(pdf) => console.log('Loaded PDF:', pdf.numPages)}
                renderMode="canvas"
              >
                {Array.from(new Array(1), (_, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} width={window.innerWidth} />
                ))}
              </Document>
            </div>
          );
        }}
      </BlobProvider>
    );
  }
  return (
    <ReactPDFViewer width="100%" height={800} >
      <Pdf
        parameters={__DOCGEN_PARAMETERS__}
        options={{}}
        sortedPages={__DOCGEN_PAGES__}
      />
    </ReactPDFViewer>
  )
};