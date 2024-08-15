import { ObjectInspector } from 'react-inspector';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import { renderHtml } from 'react-pdf-html';
import { Pdf, html } from '../document.tsx';
import styles from './app.module.css';

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
              <Pdf />
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
};
