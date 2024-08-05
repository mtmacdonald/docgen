import path from 'path';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { Pdf } from './react-pdf';

export const generatePdf = ({
  pages,
  options,
  parameters,
  sortedPages,
  mainProcess,
}) => {
  const pdfName = parameters.name.toLowerCase() + '.pdf';
  const pdfPath = path.normalize(`${options.output}/${pdfName}`);
  ReactPDF.render(
    <Pdf
      options={options}
      pages={pages}
      sortedPages={sortedPages}
      parameters={parameters}
    />,
    pdfPath
  );
}
