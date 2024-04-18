import React from 'react';
import Html from 'react-pdf-html';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: '1cm',
    fontSize: 10,
    margin:0,
  },
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

const Footer = ({parameters}) => (
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

export const Pdf = ({
  parameters,
  options,
  pages,
  sortedPages
}) => {
  let allPages = [];
  for (let key in sortedPages) {
    if (sortedPages.hasOwnProperty(key)) {
      sortedPages[key].forEach((section) => {
        section.pages.forEach((page) => {
          let key = page.source;
          allPages.push(key);
        });
      });
    }
  }
  return (
    <Document>
      {Object.values(pages).map((p, i) => (
        <Page key={i} size="A4" style={styles.page}>
          <View>
            <
              // @ts-ignore
              Html
            >
              {p}
            </Html>
          </View>
          <Footer parameters={parameters}/>s
        </Page>
      ))}
    </Document>
  );
}
