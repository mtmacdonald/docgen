import { ObjectInspector } from 'react-inspector';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import { renderHtml } from 'react-pdf-html';
import html from '../playground.html?raw';
import styles from './app.module.css';
import { PdfHtmlBlock } from "../../../src/docgen/pdf/react-pdf/pdf-page/pdf-html-block.tsx";

export const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ObjectInspector data={renderHtml(html)} />
      </div>
      <div className={styles.right}>
        <PDFViewer>
          <Document>
            <Page>
              <PdfHtmlBlock page={html} />
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
};
