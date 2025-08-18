import React, { Fragment } from 'react';
import { Document, Font } from '@react-pdf/renderer';
import { PdfPage } from './pdf-page/pdf-page.tsx';
import { marked } from 'marked';
import { loadPages } from '../../views/load-pages.ts';

// // Register fonts from public/assets
// Font.register({
//   family: 'archivo',
//   fonts: [
//     { src: '/assets/archivo-regular.ttf', fontStyle: 'normal', fontWeight: 400 },
//     { src: '/assets/archivo-italic.ttf', fontStyle: 'italic', fontWeight: 400 },
//     { src: '/assets/archivo-600.ttf', fontStyle: 'normal', fontWeight: 600 },
//     { src: '/assets/archivo-600-italic.ttf', fontStyle: 'italic', fontWeight: 600 },
//   ],
// });
//
// Font.register({
//   family: 'space-grotesk',
//   fonts: [
//     { src: '/assets/space-grotesk-regular.ttf', fontStyle: 'normal', fontWeight: 400 },
//     { src: '/assets/space-grotesk-600.ttf', fontStyle: 'normal', fontWeight: 600 },
//   ],
// });
//
// Font.register({
//   family: 'space-mono',
//   fonts: [
//     { src: '/assets/space-mono-regular.ttf', fontStyle: 'normal', fontWeight: 400 },
//     { src: '/assets/space-mono-italic.ttf', fontStyle: 'italic', fontWeight: 400 },
//     { src: '/assets/space-mono-700.ttf', fontStyle: 'normal', fontWeight: 700 },
//     { src: '/assets/space-mono-700-italic.ttf', fontStyle: 'italic', fontWeight: 700 },
//   ],
// });

type PdfProps = {
  parameters: any;
  options: any;
  sortedPages: any;
};

export const Pdf = ({ parameters, options, sortedPages }: PdfProps) => {
  const pages = loadPages();

  // Flatten pages if needed
  const allPages: string[] = [];
  for (let key in sortedPages) {
    if (sortedPages.hasOwnProperty(key)) {
      sortedPages[key].forEach((section: any) => {
        section.pages.forEach((page: any) => {
          allPages.push(page.source);
        });
      });
    }
  }

  return (
    <Document>
      {Object.values(pages).map((page, i) => {
        const html = marked(page); // convert Markdown string to HTML
        return (
          <PdfPage key={i} page={html} parameters={parameters} options={options} />
        );
      })}
    </Document>
  );
};
