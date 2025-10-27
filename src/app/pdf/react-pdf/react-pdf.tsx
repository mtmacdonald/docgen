import React, { useEffect, useState } from 'react';
import { Document, Font } from '@react-pdf/renderer';
import { PdfPage } from './pdf-page/pdf-page.tsx';
import { marked } from 'marked';

import archivoRegular from '../../views/assets/styles/fonts/archivo-regular.ttf';
import archivoItalic from '../../views/assets/styles/fonts/archivo-italic.ttf';
import archivo600 from '../../views/assets/styles/fonts/archivo-600.ttf';
import archivo600Italic from '../../views/assets/styles/fonts/archivo-600-italic.ttf';

import spaceGroteskRegular from '../../views/assets/styles/fonts/space-grotesk-regular.ttf';
import spaceGrotesk600 from '../../views/assets/styles/fonts/space-grotesk-600.ttf';

import spaceMonoRegular from '../../views/assets/styles/fonts/space-mono-regular.ttf';
import spaceMonoItalic from '../../views/assets/styles/fonts/space-mono-italic.ttf';
import spaceMono700 from '../../views/assets/styles/fonts/space-mono-700.ttf';
import spaceMono700Italic from '../../views/assets/styles/fonts/space-mono-700-italic.ttf';
import type { TParameters, TSortedPages, TSection } from '../../../docgen/types.ts';
import { preprocessAdmonitions } from '../../common/markdown/markdown.ts';

declare const __BASE_PATH__: string;

Font.register({
  family: 'archivo',
  fonts: [
    { src: archivoRegular, fontStyle: 'normal', fontWeight: 400 },
    { src: archivoItalic, fontStyle: 'italic', fontWeight: 400 },
    { src: archivo600, fontStyle: 'normal', fontWeight: 600 },
    { src: archivo600Italic, fontStyle: 'italic', fontWeight: 600 },
  ],
});

Font.register({
  family: 'space-grotesk',
  fonts: [
    { src: spaceGroteskRegular, fontStyle: 'normal', fontWeight: 400 },
    { src: spaceGrotesk600, fontStyle: 'normal', fontWeight: 600 },
  ],
});

Font.register({
  family: 'space-mono',
  fonts: [
    { src: spaceMonoRegular, fontStyle: 'normal', fontWeight: 400 },
    { src: spaceMonoItalic, fontStyle: 'italic', fontWeight: 400 },
    { src: spaceMono700, fontStyle: 'normal', fontWeight: 700 },
    { src: spaceMono700Italic, fontStyle: 'italic', fontWeight: 700 },
  ],
});

type PdfProps = {
  parameters: TParameters;
  options: any;
  sortedPages: TSortedPages;
};

// Async loader for PDF pages
const loadPdfPages = async (sortedPages: any): Promise<Record<string, string>> => {
  const pages: Record<string, string> = {};

  const sources = Object.values(sortedPages)
    .flatMap((columns: TSection) =>
      columns.flatMap((section) => section.pages.map((p: any) => p.source)),
    );

  await Promise.all(
    sources.map(async (filename) => {
      const url = `${__BASE_PATH__}${filename}`;
      try {
        const res = await fetch(url);
        pages[filename] = res.ok ? await res.text() : `Error loading ${filename}: ${res.status}`;
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
      columns.flatMap((section) => section.pages.map((p: any) => p.source)),
    );

  return (
    <Document>
      {allSources.map((source, i) => {
        const html = marked(preprocessAdmonitions(pages[source] || ''));
        return (
          <PdfPage key={i} page={html} parameters={parameters} options={options} />
        );
      })}
    </Document>
  );
};
