import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#ffffff' },
  section: { margin: 10, padding: 10, flexGrow: 1 },
});

export const HelloWorldPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Hello World</Text>
      </View>
    </Page>
  </Document>
);
