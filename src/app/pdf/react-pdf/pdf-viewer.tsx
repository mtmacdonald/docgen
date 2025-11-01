import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { usePDF, PDFViewer as ReactPDFViewer } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import type { TParameters, TSortedPages } from '../../../docgen/types.ts';
import { Pdf } from './react-pdf.tsx';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

declare const __DOCGEN_PARAMETERS__: TParameters;
declare const __DOCGEN_PAGES__: TSortedPages;

const enableWorkaround = true;

const PDF = <Pdf parameters={__DOCGEN_PARAMETERS__} options={{}} sortedPages={__DOCGEN_PAGES__} />;

export const PDFViewer = () => {
  const [instance] = usePDF({ document: PDF });
  const [fileData, setFileData] = useState<Uint8Array | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pdfKey, setPdfKey] = useState(0);

  useLayoutEffect(() => {
    setPdfKey((prevKey) => prevKey + 1);
  }, [instance.blob]);

  useEffect(() => {
    if (instance.blob) {
      instance.blob.arrayBuffer().then(buffer => {
        setFileData(new Uint8Array(buffer)); // keep as Uint8Array
      });
    }
  }, [instance.blob]);
  console.log(fileData);

  const render = useMemo(() => (
    fileData &&
    <div style={{ width: '100%' }}>
      <Document
        key={pdfKey}
        file={{ data: fileData }}
        onLoadSuccess={({ numPages }) => {
          console.log(numPages);
          setNumPages(numPages)
        }}
        renderMode="canvas"
      >
        <Page
          pageNumber={1}
          width={window.innerWidth}
        />
      </Document>
    </div>
  ), [fileData]);

  if (instance.loading || !fileData) return <div>Loading ...</div>;
  if (instance.error) return <div>Something went wrong: {instance.error}</div>;

  if (enableWorkaround) {
    return render;
  }

  return (
    <ReactPDFViewer width="100%" height={800}>
      <Pdf
        parameters={__DOCGEN_PARAMETERS__}
        options={{}}
        sortedPages={__DOCGEN_PAGES__}
      />
    </ReactPDFViewer>
  );
};
