import * as styles from '../../../../styles/variables/js/style-variables.js';

const tableCellStyle = {
  padding: styles.SizeTableCellPaddingPdf,
  border: `${styles.SizeBorderWidthPdf} solid ${styles.ColorBorder}`,
};

export const pdfTableStyles = {
  table: {
    border: '1px solid #ccc',
  },
  td: tableCellStyle,
  th: tableCellStyle,
};
