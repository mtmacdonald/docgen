import { useState, useEffect } from 'react';
import WorkerURL from './generate-pdf.worker.tsx?worker';

export const useGeneratePdf = () => {
  const [result, setResult] = useState<Blob | null>(null);

  useEffect(() => {
    const worker = new WorkerURL();

    worker.onmessage = (e) => {
      if (e.data.type === 'complete') {
        setResult(e.data.payload.data);
        worker.terminate();
      }
    };

    worker.postMessage({ type: 'start', payload: {} });

    return () => worker.terminate();
    // TODO: cleanup of blob URL to avoid memory leaks
  }, []);

  return result;
};
