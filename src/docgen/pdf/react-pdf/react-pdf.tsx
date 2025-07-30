import React, { Fragment } from 'react';
import { Document, Font } from '@react-pdf/renderer';
import { PdfPage } from './pdf-page/pdf-page.tsx';
import { packageAbsolutePath } from '../../../paths.ts';
import { join } from 'path';

Font.register({
  family: "archivo",
  fonts: [
    {
      src: join(packageAbsolutePath, 'include/require/styles/fonts/archivo-regular.ttf'),
      fontStyle: 'normal',
      fontWeight: 400,
    },
    {
      src: join(packageAbsolutePath, 'include/require/styles/fonts/archivo-italic.ttf'),
      fontStyle: 'italic',
      fontWeight: 400,
    },
    {
      src: join(packageAbsolutePath, 'include/require/styles/fonts/archivo-600.ttf'),
      fontStyle: 'normal',
      fontWeight: 600,
    },
    {
      src: join(packageAbsolutePath, 'include/require/styles/fonts/archivo-600-italic.ttf'),
      fontStyle: 'italic',
      fontWeight: 600,
    },
  ]
});

Font.register({
  family: "space-grotesk",
  fonts: [
    {
      src: join(packageAbsolutePath, 'include/require/styles/fonts/space-grotesk-regular.ttf'),
      fontStyle: 'normal',
      fontWeight: 400,
    },
    {
      src: join(packageAbsolutePath, 'include/require/styles/fonts/space-grotesk-600.ttf'),
      fontStyle: 'normal',
      fontWeight: 600,
    },
  ]
});

Font.register({
  family: "space-mono",
  fonts: [
    {
      src: join(packageAbsolutePath, 'include/require/styles/fonts/space-mono-regular.ttf'),
      fontStyle: 'normal',
      fontWeight: 400,
    },
    {
      src: join(packageAbsolutePath, 'include/require/styles/fonts/space-mono-italic.ttf'),
      fontStyle: 'italic',
      fontWeight: 400,
    },
    {
      src: join(packageAbsolutePath, 'include/require/styles/fonts/space-mono-600.ttf'),
      fontStyle: 'normal',
      fontWeight: 600,
    },
    {
      src: join(packageAbsolutePath, 'include/require/styles/fonts/space-mono-600-italic.ttf'),
      fontStyle: 'italic',
      fontWeight: 600,
    },
  ]
});

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
