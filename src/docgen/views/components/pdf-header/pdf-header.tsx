import React from 'react';
import { Logo } from "../logo/logo.tsx";

export const PdfHeader = ({
  parameters
}) => {
  return (
    <div id="dg-pdf-header">
      <Logo parameters={parameters} />
    </div>
  );
};
