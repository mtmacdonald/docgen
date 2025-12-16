import { generatePdf } from './generate-pdf.tsx';
import type { TSection, TSortedPages } from '../../../docgen/types.ts';

declare const __BASE_PATH__: string;
declare const __DOCGEN_PAGES__: TSortedPages;

const loadPdfPages = async (
  sortedPages: any,
): Promise<Record<string, string>> => {
  const pages: Record<string, string> = {};

  const sources = Object.values(sortedPages).flatMap((columns: TSection) =>
    columns.flatMap((section) => section.pages.map((p: any) => p.source)),
  );

  await Promise.all(
    sources.map(async (filename) => {
      const url = `${__BASE_PATH__}${filename}`;
      try {
        const res = await fetch(url);
        pages[filename] = res.ok
          ? await res.text()
          : `Error loading ${filename}: ${res.status}`;
      } catch (err) {
        pages[filename] = `Error loading ${filename}: ${err}`;
      }
    }),
  );

  return pages;
};

const slowTask = async (styleVariables) => {
  let data;
  try {
    const loadedPages = await loadPdfPages(__DOCGEN_PAGES__);
    data = await generatePdf(loadedPages, styleVariables);
  } catch (error) {
    console.error(error);
  }
  self.postMessage({
    type: 'complete',
    payload: {
      data,
    },
  });
};

self.onmessage = ({ data: message }) => {
  switch (message.type) {
    case 'start':
      slowTask(message.styleVariables);
      break;
    default:
  }
};
