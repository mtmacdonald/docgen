import React from 'react';
import Html from 'react-pdf-html-simple';
import { fontSize } from '../../pdf-styles/pdf-styles.ts';
import { customRenderers } from './custom-renderers/custom-renderers.tsx';

export const PdfHtmlBlock = ({ page, options, stylesheet }) => {
  return (
    <Html
      style={{ fontSize }}
      stylesheet={stylesheet}
      renderers={customRenderers({ options })}
    >
      {page}
    </Html>
  );
};
