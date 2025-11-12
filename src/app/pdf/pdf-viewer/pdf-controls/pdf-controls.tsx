import React from 'react';
import styles from './pdf-controls.module.css';

export const PdfControls = ({
  pageNumber,
  numPages,
  goToPrevPage,
  goToNextPage,
}) => {
  return (
    <div className={styles.pdfControlsContainer}>
      <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
        Prev
      </button>
      <span>
        Page {pageNumber} of {numPages}
      </span>
      <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
        Next
      </button>
    </div>
  );
};
