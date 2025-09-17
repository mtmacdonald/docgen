import React from 'react';
import { Page, View, StyleSheet } from '@react-pdf/renderer';
import { PdfHtmlBlock } from "./pdf-html-block/pdf-html-block.tsx";
import { PdfFooter } from './pdf-footer/pdf-footer.tsx';
import { pdfStyleSheet } from '../pdf-styles/pdf-styles.ts';

export const reactPdfStyles = StyleSheet.create(pdfStyleSheet);

export const PdfPage = ({
  page,
  parameters,
  options
}) => {
  return (
    // @ts-ignore
    <Page size="A4" style={reactPdfStyles.page}>
      <View>
        <PdfHtmlBlock page={page} options={options} />
      </View>
      <PdfFooter parameters={parameters}/>
    </Page>
  )
};
