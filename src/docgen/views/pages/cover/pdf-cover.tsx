import React from 'react';
import { Cover } from './cover';
import { Footer } from '../../components/footer/footer';

const Logo = ({
  parameters,
}) => {
  return (
    parameters?.logoPath && (
      <img
        src={`../${parameters?.logoPath}`}
      />
    )
  )
};

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
