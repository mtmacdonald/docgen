import * as styles from '../../../../styles/variables/js/style-variables.js';

const admonitionBaseStyle = {
  padding: '10pt',
  marginVertical: '12pt',
};

export const pdfAdmonitionsStyles = {
  blockquote: {
    ...admonitionBaseStyle,
    backgroundColor: styles.ColorBackgroundNeutral,
    borderLeft: `${styles.SizeAdmonitionBorderLeftPdf} solid ${styles.ColorBorderNeutral}`,
  },
  ['.admonition']: admonitionBaseStyle,
  ['.admonition-title']: {
    fontWeight: 'bold',
    marginBottom: '6pt',
  },
  ['.admonition.information']: {
    backgroundColor: styles.ColorBackgroundInfo,
    borderLeft: `${styles.SizeAdmonitionBorderLeftPdf} solid ${styles.ColorBorderInfo}`,
  },
  ['.admonition.success']: {
    backgroundColor: styles.ColorBackgroundSuccess,
    borderLeft: `${styles.SizeAdmonitionBorderLeftPdf} solid ${styles.ColorBorderSuccess}`,
  },
  ['.admonition.warning']: {
    backgroundColor: styles.ColorBackgroundWarning,
    borderLeft: `${styles.SizeAdmonitionBorderLeftPdf} solid ${styles.ColorBorderWarning}`,
  },
  ['.admonition.error']: {
    backgroundColor: styles.ColorBackgroundError,
    borderLeft: `${styles.SizeAdmonitionBorderLeftPdf} solid ${styles.ColorBorderError}`,
  },
};
