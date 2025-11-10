import { useState, useEffect } from 'react';
import WorkerURL from './generate-pdf.worker.tsx?worker';

let cachedPdf: Blob | null;

export const useGeneratePdf = () => {
  const [result, setResult] = useState<Blob | null>(cachedPdf);

  useEffect(() => {
    if (cachedPdf) return; // use cache immediately
    const worker = new WorkerURL();
    worker.onmessage = (e) => {
      if (e.data.type === 'complete') {
        cachedPdf = e.data.payload.data;
        setResult(cachedPdf);
        worker.terminate();
      }
    };

    worker.postMessage({ type: 'start' });

    return () => worker.terminate();
  }, []);

  return result;
};
