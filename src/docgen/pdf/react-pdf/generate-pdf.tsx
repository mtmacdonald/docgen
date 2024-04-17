import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import {MyDocument} from './react-pdf';
import path from "path";

export const generatePdf = ({
  options,
  parameters,
  sortedPages,
  mainProcess
}) => {
  const pdfName = parameters.name.toLowerCase() + '.pdf';
  const pdfPath = path.normalize(`${options.output}/${pdfName}`);
  console.log(pdfPath);
  ReactPDF.render(
    <MyDocument />,
    pdfPath
  );
}
