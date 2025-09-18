import React, { useEffect, useState } from 'react';
import { Document, Font } from '@react-pdf/renderer';
import { PdfPage } from './pdf-page/pdf-page.tsx';
import { marked } from 'marked';

Font.register({
  family: 'archivo',
  fonts: [
    { src: '/assets/archivo-regular.ttf', fontStyle: 'normal', fontWeight: 400 },
    { src: '/assets/archivo-italic.ttf', fontStyle: 'italic', fontWeight: 400 },
    { src: '/assets/archivo-600.ttf', fontStyle: 'normal', fontWeight: 600 },
    { src: '/assets/archivo-600-italic.ttf', fontStyle: 'italic', fontWeight: 600 },
  ],
});

Font.register({
  family: 'space-grotesk',
  fonts: [
    { src: '/assets/space-grotesk-regular.ttf', fontStyle: 'normal', fontWeight: 400 },
    { src: '/assets/space-grotesk-600.ttf', fontStyle: 'normal', fontWeight: 600 },
  ],
});

Font.register({
  family: 'space-mono',
  fonts: [
    { src: '/assets/space-mono-regular.ttf', fontStyle: 'normal', fontWeight: 400 },
    { src: '/assets/space-mono-italic.ttf', fontStyle: 'italic', fontWeight: 400 },
    { src: '/assets/space-mono-700.ttf', fontStyle: 'normal', fontWeight: 700 },
    { src: '/assets/space-mono-700-italic.ttf', fontStyle: 'italic', fontWeight: 700 },
  ],
});

type PdfProps = {
  parameters: any;
  options: any;
  sortedPages: any;
};

// Async loader for PDF pages
const loadPdfPages = async (sortedPages: any): Promise<Record<string, string>> => {
  const pages: Record<string, string> = {};

  const sources = Object.values(sortedPages)
    .flatMap((columns) =>
      // @ts-ignore
      columns.flatMap((section) => section.pages.map((p: any) => p.source)),
    );

  await Promise.all(
    sources.map(async (filename) => {
      try {
        const res = await fetch(`/${filename}`);
        pages[filename] = res.ok ? await res.text() : `Error loading ${filename}`;
      } catch (err) {
        pages[filename] = `Error loading ${filename}: ${err}`;
      }
    }),
  );

  return pages;
};

export const Pdf = ({ parameters, options, sortedPages }: PdfProps) => {
  const [pages, setPages] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPages = async () => {
      const loaded = await loadPdfPages(sortedPages);
      setPages(loaded);
    };
    fetchPages();
  }, [sortedPages]);

  const allSources = Object.values(sortedPages)
    .flatMap((columns) =>
      // @ts-ignore
      columns.flatMap((section) => section.pages.map((p: any) => p.source)),
    );

  return (
    <Document>
      {allSources.map((source, i) => {
        const html = marked(pages[source] || '');
        return (
          <PdfPage key={i} page={html} parameters={parameters} options={options} />
        );
      })}
    </Document>
  );
};
