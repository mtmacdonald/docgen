import React from 'react';
import { Page, View, StyleSheet } from '@react-pdf/renderer';
import { PdfHtmlBlock } from './pdf-html-block/pdf-html-block.tsx';
import { PdfFooter } from './pdf-footer/pdf-footer.tsx';
import {
  getPdfStyleSheet,
  getHtmlStyleSheet,
} from '../pdf-styles/pdf-styles.ts';

export const PdfPage = ({ page, parameters, options, styleVariables }) => {
  const reactPdfStyles = StyleSheet.create(getPdfStyleSheet());
  const htmlStylesheet = getHtmlStyleSheet(styleVariables);

  return (
    <Page size="A4" style={reactPdfStyles.page}>
      <View>
        <PdfHtmlBlock
          page={page}
          options={options}
          stylesheet={htmlStylesheet}
        />
      </View>
      <PdfFooter parameters={parameters} />
    </Page>
  );
};
