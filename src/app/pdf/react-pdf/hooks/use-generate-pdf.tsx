import { useState, useEffect, useLayoutEffect } from 'react';
import { usePDF as renderPDF } from '@react-pdf/renderer';

export const useGeneratePdf = (document: React.ReactElement) => {
  console.log(document);
  const [instance, _update] = renderPDF({ document });
  const [fileData, setFileData] = useState<Uint8Array | null>(null);

  // useLayoutEffect(() => {
  //   setPdfKey((prev) => prev + 1);
  // }, [instance.blob]);

  useEffect(() => {
    if (instance.blob) {
      instance.blob.arrayBuffer().then((buffer) => {
        setFileData(new Uint8Array(buffer));
      });
    }
  }, []); // Todo: detect and trigger PDF changes
  //console.log(fileData);
  console.log(instance.blob);

  return {
    fileData,
    loading: instance?.loading,
    error: instance?.error,
  };
};
