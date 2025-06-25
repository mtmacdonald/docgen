import * as styles from '../../../../styles/variables/js/style-variables.js';

export const pdfAdmonitionsStyles = {
  ['.admonition']: {
    padding: '10pt',
    marginLeft: 0,
    marginRight: 0,
    marginVertical: '12pt',
  },
  ['.admonition-title']: {
    fontWeight: 'bold',
    marginBottom: '6pt',
  },
  ['.admonition.information']: {
    backgroundColor: styles.ColorBackgroundInfo,
    borderLeft: `5px solid ${styles.ColorBorderInfo}`,
  },
  ['.admonition.success']: {
    backgroundColor: styles.ColorBackgroundSuccess,
    borderLeft: `5px solid ${styles.ColorBorderSuccess}`,
  },
  ['.admonition.warning']: {
    backgroundColor: styles.ColorBackgroundWarning,
    borderLeft: `5px solid ${styles.ColorBorderWarning}`,
  },
  ['.admonition.error']: {
    backgroundColor: styles.ColorBackgroundError,
    borderLeft: `5px solid ${styles.ColorBorderError}`,
  },
  // Optional: blockquote in matching style
  // blockquote: {
  //   marginVertical: '12pt',
  //   padding: '10pt',
  //   borderLeft: '5px solid #a0aec0',
  //   backgroundColor: '#f7fafc',
  //   color: '#2d3748',
  //   fontStyle: 'italic',
  // },
};
