import React from 'react';
import {
  TbChevronLeft,
  TbChevronRight,
  TbDownload,
  TbExternalLink,
} from 'react-icons/tb';
import styles from './pdf-controls.module.css';

export const PdfControls = ({
  pageNumber,
  numPages,
  goToPrevPage,
  goToNextPage,
}) => {
  return (
    <div className={styles.pdfControlsContainer}>
      <div className={styles.paginationControls}>
        <button
          className={styles.controlButton}
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          title="Previous page"
        >
          <TbChevronLeft />
        </button>
        <span className={styles.pageText}>
          {pageNumber} of {numPages}
        </span>
        <button
          className={styles.controlButton}
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          title="Next page"
        >
          <TbChevronRight />
        </button>
      </div>
      <div className={styles.actionButtons}>
        <button
          className={styles.controlButton}
          onClick={() => console.log('Download functionality coming soon')}
          title="Download PDF"
        >
          <TbDownload />
        </button>
        <button
          className={styles.controlButton}
          onClick={() => console.log('Open functionality coming soon')}
          title="Open in new tab"
        >
          <TbExternalLink />
        </button>
      </div>
    </div>
  );
};
