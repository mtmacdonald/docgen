import React from 'react';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { TbFile, TbFileOff, TbDownload } from 'react-icons/tb';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Pdf } from '../../../pdf/react-pdf/react-pdf.tsx';
import { pdfRoute } from '../../router';
import type { TParameters, TSortedPages } from '../../../../docgen/types.ts';

declare const __DOCGEN_PARAMETERS__: TParameters;
declare const __DOCGEN_PAGES__: TSortedPages;
type PdfToggleButtonProps = {
  onClick?: () => void; // optional callback
  downloadNotViewer?: boolean; // new flag
};

export const PdfToggleButton = ({ onClick, downloadNotViewer }: PdfToggleButtonProps) => {
  const router = useRouter();
  const pdfVisible = useRouterState({
    select: (state) => state.location.pathname.endsWith(pdfRoute.path),
  });

  const onPdfToggle = () => {
    if (pdfVisible) {
      /*
        Would be nice to navigate to the last non-PDF page user was on, but
        browser history makes that hard to find reliably (last page may not
        exist or could be the PDF page itself). #152
       */
      router.navigate({ to: '/' });
    } else {
      router.navigate({ to: '/pdf' });
    }

    if (onClick) onClick(); // call sidebar close
  };

  if (downloadNotViewer) {
    return (
      <PDFDownloadLink
        document={
          <Pdf
            parameters={__DOCGEN_PARAMETERS__}
            options={{}}
            sortedPages={__DOCGEN_PAGES__}
          />
        }
        fileName="documentation.pdf"
      >
        {({ loading }) => (
          <button
            className="button inverted"
            title="Download PDF"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <TbDownload size={18} />
            <span>{loading ? 'Preparing PDF...' : 'Download PDF'}</span>
          </button>
        )}
      </PDFDownloadLink>
    );
  }

  return (
    <button
      className={`button ${pdfVisible ? '' : 'inverted'}`}
      onClick={onPdfToggle}
      title="Toggle PDF"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
    >
      {pdfVisible ? <TbFile size={18} /> : <TbFileOff size={18} />}
      <span>PDF</span>
    </button>
  );
};
