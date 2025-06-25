import * as styles from '../../../../styles/variables/js/style-variables.js';
import { docsStyleSheet } from './pdf-docs-styles.ts';
import { pdfAdmonitionsStyles } from './pdf-admonitions-styles.ts';

export const fontSize = 10;

export const pdfStyleSheet = {
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontSize,
  },
};

export const em = (em: number, relativeSize: number = fontSize) =>
  em * relativeSize;

const styleInfo = {
  color: styles.ColorTextInfo,
  backgroundColor: styles.ColorBackgroundInfo,
  borderLeft: `5px solid ${styles.ColorBorderInfo}`,
  padding: styles.SizeMessagePadding,
  marginLeft: 0,
  marginRight: 0,
};

/*
  See also the base styles set by react-pdf-html, which are being overridden here
  https://github.com/danomatic/react-pdf-html/blob/main/src/styles.ts
 */
export const htmlStyleSheet = {
  'h1, h2, h3, h4, h5, h6': {
    fontWeight: 'bold',
  },
  h1: {
    fontSize: styles.SizeFontH1Pdf,
    marginVertical: em(0.67, em(2)),
  },
  h2: {
    fontSize: styles.SizeFontH2Pdf,
    marginVertical: em(0.83, em(1.5)),
  },
  h3: {
    fontSize: styles.SizeFontH3Pdf,
    marginVertical: em(1, em(1.17)),
  },
  h4: {
    fontSize: styles.SizeFontH4Pdf,
    marginVertical: em(1.33, em(1)),
  },
  h5: {
    fontSize: styles.SizeFontH5Pdf,
    marginVertical: em(1.67, em(0.83)),
  },
  h6: {
    fontSize: styles.SizeFontH6Pdf,
    marginVertical: em(2.33, em(0.67)),
  },
  p: {
    color: styles.ColorText,
    fontSize: em(1),
    marginVertical: em(1),
  },
  hr: {
    marginVertical: em(0.5),
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  address: {
    fontStyle: 'italic',
  },
  pre: {
    fontSize: '10pt',
    fontFamily: 'Courier',
    backgroundColor: '#f5f5f5',
    color: '#333333',
    borderRadius: '4pt',
    padding: '8pt',
    borderLeft: '4pt solid #cccccc',
    marginVertical: em(1),
    whiteSpace: 'pre-wrap',
  },
  b: {
    fontWeight: 'bold',
  },
  strong: {
    fontWeight: 'bold',
  },
  i: {
    fontStyle: 'italic',
  },
  em: {
    fontStyle: 'italic',
  },
  s: {
    textDecoration: 'line-through',
  },
  u: {
    textDecoration: 'underline',
  },
  cite: {
    fontStyle: 'italic',
  },
  code: {
    // fontFamily: 'monospace',
  },
  a: {
    textDecoration: 'underline',
  },
  ul: {
    marginVertical: em(1),
  },
  ol: {
    marginVertical: em(1),
  },
  li: {
    display: 'flex',
    flexDirection: 'row',
  },
  li_bullet: {
    width: 30,
    textAlign: 'right',
    flexShrink: 0,
    flexGrow: 0,
    paddingRight: 5,
  },
  li_content: {
    textAlign: 'left',
    flexGrow: 1,
    flexBasis: 1,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    borderCollapse: 'collapse',
  },
  thead: {
    display: 'flex',
    flexDirection: 'column',
  },
  tbody: {
    display: 'flex',
    flexDirection: 'column',
  },
  tr: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
  },
  td: {
    flexGrow: 1,
    flexShrink: 1,
  },
  th: {
    flexGrow: 1,
    flexShrink: 1,
    fontWeight: 'bold',
  },
  ['.button']: {
    textAlign: 'center',
  },
  ...pdfAdmonitionsStyles,
  ...docsStyleSheet,
};
