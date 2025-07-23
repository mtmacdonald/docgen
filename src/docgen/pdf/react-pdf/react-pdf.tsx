import React, { Fragment } from 'react';
import { Document } from '@react-pdf/renderer';
import { PdfPage } from './pdf-page/pdf-page.tsx';

export const Pdf = ({
  parameters,
  options,
  pages,
  sortedPages
}) => {
  let allPages = [];
  for (let key in sortedPages) {
    if (sortedPages.hasOwnProperty(key)) {
      sortedPages[key].forEach((section) => {
        section.pages.forEach((page) => {
          let key = page.source;
          allPages.push(key);
        });
      });
    }
  }
  return (
    <Document>
      {Object.values(pages).map((page, i) => (
        <Fragment key={i}>
          <PdfPage
            page={page}
            parameters={parameters}
            options={options}
          />
        </Fragment>
      ))}
    </Document>
  );
}
