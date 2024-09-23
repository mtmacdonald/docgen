import React from 'react';
import Html from 'react-pdf-html';
import { fontSize, htmlStyleSheet } from '../../pdf-styles/pdf-styles';
import { customRenderers } from "./custom-renderers/custom-renderers";

export const PdfHtmlBlock = ({
  page,
}) => {
  return (
    <Html
      style={{ fontSize }}
      stylesheet={htmlStyleSheet}
      renderers={customRenderers}
    >
      {page}
    </Html>
  );
}
