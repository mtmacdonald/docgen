import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 5,
    left: 30,
    right: 30,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingTop: 10,
  },
  column: {
    width: '33%',
    textAlign: 'center',
    fontSize: 10,
  }
});

export const PdfFooter = ({parameters}) => (
  <View style={styles.footer} fixed>
    <Text style={styles.column}>{parameters.title}</Text>
    <Text style={styles.column}>{`© ${parameters.year} ${parameters.name}`}</Text>
    <Text
      style={styles.column}
      render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )}
    />
  </View>
);
