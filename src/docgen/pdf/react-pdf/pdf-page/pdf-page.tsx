import React from 'react';
import { Page, View, StyleSheet } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { PdfFooter } from './pdf-footer/pdf-footer';

const styles = StyleSheet.create({
  page: {
    padding: '1cm',
    fontSize: 10,
    margin:0,
  },
});

export const PdfPage = ({
  page,
  parameters
}) => {
  return (
    <Page size="A4" style={styles.page}>
      <View>
        <
          // @ts-ignore
          Html
        >
          {page}
        </Html>
      </View>
      <PdfFooter parameters={parameters}/>s
    </Page>
  )
}
