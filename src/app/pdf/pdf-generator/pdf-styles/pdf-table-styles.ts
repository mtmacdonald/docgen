export const getPdfTableStyles = (styles: any) => {
  const tableCellStyle = {
    padding: styles.SizeTableCellPaddingPdf,
    border: `${styles.SizeBorderWidthPdf} solid ${styles.ColorBorder}`,
  };

  const tableHeaderFooterStyle = {
    ...tableCellStyle,
    backgroundColor: styles.ColorTableBackgroundHeaderFooterPdf,
    fontWeight: 'bold',
  };

  return {
    table: {
      border: '1px solid #ccc',
    },
    td: tableCellStyle,
    th: tableHeaderFooterStyle,
    ['tfoot td']: tableHeaderFooterStyle,
  };
};
