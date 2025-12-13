import * as styles from 'virtual:style-variables.js';

const tableCellStyle = {
  padding: styles.SizeTableCellPaddingPdf,
  border: `${styles.SizeBorderWidthPdf} solid ${styles.ColorBorder}`,
};

const tableHeaderFooterStyle = {
  ...tableCellStyle,
  backgroundColor: styles.ColorTableBackgroundHeaderFooterPdf,
  fontWeight: 'bold',
};

export const pdfTableStyles = {
  table: {
    border: '1px solid #ccc',
  },
  td: tableCellStyle,
  th: tableHeaderFooterStyle,
  ['tfoot td']: tableHeaderFooterStyle,
};
