import React from 'react';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { TbFile, TbFileOff } from 'react-icons/tb';

type PdfToggleButtonProps = {
  onClick?: () => void; // optional callback
};

export const PdfToggleButton = ({ onClick }: PdfToggleButtonProps) => {
  const router = useRouter();
  const pdfVisible = useRouterState({
    select: (s) => s.location.pathname === '/pdf',
  });

  const onPdfToggle = () => {
    if (pdfVisible) {
      router.history.back();
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
      {pdfVisible ? (
        <TbFile size={18} />
      ) : (
        <TbFileOff size={18} />
      )}
      <span>PDF</span>
    </button>
  );
};
