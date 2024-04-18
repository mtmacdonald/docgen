import React from 'react';
import MarkdownIt from 'markdown-it';
import Html from 'react-pdf-html';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';

const markdown = new MarkdownIt('commonmark').enable('table');

const styles = StyleSheet.create({
  page: {
    padding: '1cm',
    fontSize: 12,
    margin:0,
  },
});

export const Pdf = ({
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
        <Page key={i} size="A4" style={styles.page} >
          <
            // @ts-ignore
            Html
          >{p}</Html>
        </Page>
      ))}
    </Document>
  );
}
