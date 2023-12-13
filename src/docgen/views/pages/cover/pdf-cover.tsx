import React from 'react';
import { Cover } from './cover';
import { Logo } from '../../components/logo/logo';
import { Footer } from '../../components/footer/footer';

export const PdfCover = ({
  parameters,
}) => {
  return (
    <>
      <div className="w-clear-after">
        <div id="dg-pdfLogo">
          <Logo parameters={parameters} />
        </div>
      </div>
      <Cover parameters={parameters} />
      <div id="dg-pdf-cover-footer">
        <Footer parameters={parameters} />
      </div>
    </>
  );
};
