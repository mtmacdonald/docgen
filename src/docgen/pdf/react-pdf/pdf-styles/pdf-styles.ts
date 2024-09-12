import * as styles from '../../../../styles/variables/js/style-variables';

export const fontSize = 10;

export const pdfStyleSheet = {
  page: {
    padding: '1cm',
    fontSize,
    margin: 0,
  },
};

const styleInfo = {
  color: styles.ColorTextInfo,
  backgroundColor: styles.ColorBackgroundInfo,
  borderLeft: `5px solid ${styles.ColorBorderInfo}`,
  padding: styles.SizeMessagePadding,
  //borderRadius: styles.SizeMessageBorderRadius,
};

export const em = (em: number, relativeSize: number = fontSize) =>
  em * relativeSize;

export const htmlStyleSheet = {
  p: {
    color: styles.ColorText,
  },
  'h1, h2, h3, h4, h5, h6': {
    marginVertical: '20pt',
    fontWeight: 'bold',
  },
  h1: {
    fontSize: styles.SizeFontH1Pdf,
  },
  h2: {
    fontSize: styles.SizeFontH2Pdf,
  },
  h3: {
    fontSize: styles.SizeFontH3Pdf,
  },
  h4: {
    fontSize: styles.SizeFontH4Pdf,
  },
  h5: {
    fontSize: styles.SizeFontH5Pdf,
  },
  h6: {
    fontSize: styles.SizeFontH6Pdf,
  },
  blockquote: styleInfo,
  ['.w-information']: styleInfo,
  pre: {
    fontSize: '10pt',
    fontFamily: 'Courier',
    backgroundColor: '#f5f5f5',
    color: '#333333',
    borderRadius: '4pt',
    padding: '8pt',
    borderLeft: '4pt solid #cccccc',
    marginVertical: '8pt',
  },
  code: {
    fontSize: '10pt',
    fontFamily: 'Courier',
    backgroundColor: '#f5f5f5',
    color: '#d63384',
    padding: '2pt 4pt',
    borderRadius: '3pt',
  },
};
