import React from 'react';
import Html from 'react-pdf-html-simple';
import { fontSize, htmlStyleSheet } from '../../pdf-styles/pdf-styles.ts';
import { customRenderers } from './custom-renderers/custom-renderers.tsx';

export const PdfHtmlBlock = ({ page, options }) => {
  return (
    <Html
      style={{ fontSize }}
      stylesheet={htmlStyleSheet}
      renderers={customRenderers({ options })}
    >
      {page}
    </Html>
  );
};
