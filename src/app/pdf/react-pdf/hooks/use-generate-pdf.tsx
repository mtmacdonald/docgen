// hooks/use-generate-pdf.tsx
import { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { usePDF as renderPDF } from '@react-pdf/renderer';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import type { TParameters, TSortedPages } from '../../../../docgen/types.ts';

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

const generatePdf = async () => {
  const pdfDoc = await PDFDocument.create();
  const page1 = pdfDoc.addPage([600, 800]);
  const page2 = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page1.drawText('Hello World - Page 1', { x: 50, y: 700, size: 30, font });
  page2.drawText('Hello World - Page 2', { x: 50, y: 700, size: 30, font });

  const pdfBytes = await pdfDoc.save();
  return { data: new Uint8Array(pdfBytes) };
};

export const useGeneratePdf = () => {
  // console.log(document);
  // const [instance, _update] = renderPDF({ document });
  // const [fileData, setFileData] = useState<Uint8Array | null>(null);
  //
  // // useLayoutEffect(() => {
  // //   setPdfKey((prev) => prev + 1);
  // // }, [instance.blob]);
  //
  // useEffect(() => {
  //   if (instance.blob) {
  //     instance.blob.arrayBuffer().then((buffer) => {
  //       setFileData(new Uint8Array(buffer));
  //     });
  //   }
  // }, []); // Todo: detect and trigger PDF changes
  // //console.log(fileData);
  // console.log(instance.blob);
  //
  // return {
  //   fileData,
  //   loading: instance?.loading,
  //   error: instance?.error,
  // };

  const [file, setFile] = useState<{ data: Uint8Array<ArrayBuffer> } | null>(null);

  useMemo(async () => {
    const data = await generatePdf();
    if (data) {
      setFile(data);
    }
  }, []);

  return file;
};
