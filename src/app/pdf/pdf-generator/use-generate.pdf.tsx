import { useState, useEffect } from 'react';
import WorkerURL from './generate-pdf.worker.tsx?worker';

export type TGeneratedPdf = {
  pdfBlob: Blob | null;
  pdfUrl: string | null;
};

let cachedPdf: TGeneratedPdf | null = null;

export const useGeneratePdf = () => {
  const [result, setResult] = useState<TGeneratedPdf>({
    pdfBlob: null,
    pdfUrl: null,
  });

  useEffect(() => {
    if (cachedPdf) {
      setResult(cachedPdf);
      return;
    }

    const worker = new WorkerURL();

    worker.onmessage = (e) => {
      if (e.data.type === 'complete') {
        const blob: Blob | null = e.data.payload.data ?? null;
        const url = blob ? URL.createObjectURL(blob) : null;

        cachedPdf = {
          pdfBlob: blob,
          pdfUrl: url,
        };

        setResult(cachedPdf);
        worker.terminate();
      }
    };

    worker.postMessage({ type: 'start' });

    return () => worker.terminate();
  }, []);

  return result;
};
