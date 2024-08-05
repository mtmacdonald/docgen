import React from 'react';
import { Page, View, StyleSheet } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { PdfFooter } from './pdf-footer/pdf-footer';
import * as styles from '../../../../styles/variables/js/style-variables';

const fontSize = 10;

const pdfStyleSheet = StyleSheet.create({
  page: {
    padding: '1cm',
    fontSize,
    margin: 0,
  },
});

const styleInfo = {
  color: styles.ColorTextInfo,
  backgroundColor: styles.ColorBackgroundInfo,
  borderLeft: `5px solid ${styles.ColorBorderInfo}`,
  padding: styles.SizeMessagePadding,
  //borderRadius: styles.SizeMessageBorderRadius,
}

const em = (em: number, relativeSize: number = fontSize) => em * relativeSize;

const htmlStyleSheet = {
  p: {
    color: styles.ColorText
  },
  h1: {
    fontSize: em(1.4),
    marginVertical: em(0.2, em(2)),
    fontWeight: 'bold',
  },
  blockquote: styleInfo,
  ['.w-information']: styleInfo,
  pre: {
    //padding: 12px,
    //background-color: #f3f3f3,
    borderLeft: `1px solid ${styles.ColorBorder}`,
    //line-height: 14px;
    //border-radius: 6px;
  }
};

export const PdfPage = ({
  page,
  parameters
}) => {
  return (
    <Page size="A4" style={pdfStyleSheet.page}>
      <View>
        <
          Html
          resetStyles
          style={{ fontSize }}
          stylesheet={htmlStyleSheet}
        >
          {page}
        </Html>
      </View>
      <PdfFooter parameters={parameters}/>s
    </Page>
  )
}
