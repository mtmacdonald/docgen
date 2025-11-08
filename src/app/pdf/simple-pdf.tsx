import React from 'react';
import { Page, Document, Text } from '@react-pdf/renderer';

export type PdfProps = {};

export const SimplePdf = (props: PdfProps) => (
  <Document>
    <Page>
      <Text>Hello, World!</Text>
    </Page>
  </Document>
);
