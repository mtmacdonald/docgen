import React from 'react';
import { Page, View, StyleSheet } from '@react-pdf/renderer';
import { PdfHtmlBlock } from "./pdf-html-block/pdf-html-block";
import { PdfFooter } from './pdf-footer/pdf-footer';
import { pdfStyleSheet } from '../pdf-styles/pdf-styles';

export const reactPdfStyles = StyleSheet.create(pdfStyleSheet);

export const PdfPage = ({
  page,
  parameters
}) => {
  return (
    <Page size="A4" style={reactPdfStyles.page}>
      <View>
        <PdfHtmlBlock page={page} />
      </View>
      <PdfFooter parameters={parameters}/>s
    </Page>
  )
}
