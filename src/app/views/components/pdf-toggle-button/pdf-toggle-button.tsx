import React from 'react';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { TbFile, TbFileOff } from 'react-icons/tb';
import { pdfRoute } from '../../router';

type PdfToggleButtonProps = {
  onClick?: () => void; // optional callback
};

export const PdfToggleButton = ({ onClick }: PdfToggleButtonProps) => {
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
