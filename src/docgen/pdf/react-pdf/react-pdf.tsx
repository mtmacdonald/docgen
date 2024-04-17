import React from 'react';
import MarkdownIt from 'markdown-it';
import Html from 'react-pdf-html';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';

const markdown = new MarkdownIt('commonmark').enable('table');

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
//markdown.render('### Example')

const example = `
# Placeholder heading

Example content
`;

const getHtml = () => {
  const html = markdown.render(example);
  return html;
}

export const Pdf = ({
  options,
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
      {allPages.map((_p, i) => (
        <Page key={i} size="A4" style={styles.page}>
          <Html>{getHtml()}</Html>
        </Page>
      ))}
    </Document>
  );
}
