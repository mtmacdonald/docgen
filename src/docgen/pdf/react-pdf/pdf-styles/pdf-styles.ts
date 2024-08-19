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
  h1: {
    fontSize: styles.SizeFontH1Pdf,
    marginVertical: em(0.2, em(2)),
    fontWeight: 'bold',
  },
  blockquote: styleInfo,
  ['.w-information']: styleInfo,
  pre: {
    //padding: 12px,
    //background-color: #f3f3f3,
    borderLeft: `1px solid ${styles.ColorBorder}`,
    //line-height: 14px;
    //border-radius: 6px;
  },
};
