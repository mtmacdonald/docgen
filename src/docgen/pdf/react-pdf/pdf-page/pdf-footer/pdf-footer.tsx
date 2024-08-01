import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  // footer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   textAlign: 'center',
  //   fontSize: 12,
  //   color: 'grey',
  // },
  // footer: {
  //   position: 'absolute',
  //   bottom: 0, // Adjust as needed
  //   left: 0,
  //   right: 0,
  //   textAlign: 'center',
  //   fontSize: 10,
  //   color: 'grey',
  // },
  footer: {
    position: 'absolute',
    fontSize: 8,
    bottom: 30,
    left: 0,
    right: 0,
    display: 'flex'
  },
  footerLeft: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footerMiddle: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

export const PdfFooter = ({parameters}) => (
  <View style={styles.footer} fixed>
    <Text style={styles.footerLeft}>{parameters.title}</Text>
    <Text style={styles.footerMiddle}>
      {`© ${parameters.year} ${parameters.name}`}
    </Text>
    <Text
      style={styles.footerRight}
      render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )}
    />
  </View>
);
