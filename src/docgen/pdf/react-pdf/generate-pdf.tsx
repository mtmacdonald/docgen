import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { Pdf } from './react-pdf';
import path from "path";

export const generatePdf = ({
  options,
  parameters,
  sortedPages,
  mainProcess
}) => {
  const pdfName = parameters.name.toLowerCase() + '.pdf';
  const pdfPath = path.normalize(`${options.output}/${pdfName}`);
  ReactPDF.render(
    <Pdf
      options={options}
      sortedPages={sortedPages}
    />,
    pdfPath
  );
}
