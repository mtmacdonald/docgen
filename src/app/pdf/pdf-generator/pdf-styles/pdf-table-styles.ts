import * as styles from '../../../style-variables/js/style-variables';

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
