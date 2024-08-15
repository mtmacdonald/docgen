import React from 'react';
import Html from 'react-pdf-html';
import { fontSize, htmlStyleSheet } from '../pdf-styles/pdf-styles';

export const PdfHtmlBlock = ({
  page,
}) => {
  return (
    <Html
      resetStyles
      style={{ fontSize }}
      stylesheet={htmlStyleSheet}
    >
      {page}
    </Html>
  )
}
