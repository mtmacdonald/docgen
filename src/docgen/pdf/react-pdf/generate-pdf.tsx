import path from 'path';
import pico from 'picocolors';
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
  // temporary filter of advanced pages until PDF refactor is ready
  const excludedPages = ['index.md', 'release-notes.md', undefined];
  const filteredPages = Object.fromEntries(
    Object.entries(pages).filter(([key]) => key !== 'undefined' && !excludedPages.includes(key))
  );
  const pdfName = parameters.name.toLowerCase() + '.pdf';
  const pdfPath = path.normalize(`${options.output}/${pdfName}`);
  console.log(pico.green('Generating the PDF'));
  ReactPDF.render(
    <Pdf
      options={options}
      pages={filteredPages}
      sortedPages={sortedPages}
      parameters={parameters}
    />,
    pdfPath
  );
}
