import React from 'react';
import { Loader } from '../../../views/components/loader/loader.tsx';
import { Spinner } from '../../../views/components/loader/spinner.tsx';

export const PdfLoader = () => {
  return (
    <Loader cover text="Loading PDF...">
      <Spinner />
    </Loader>
  );
};
