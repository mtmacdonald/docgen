import { ObjectInspector } from 'react-inspector';
import Html from 'react-pdf-html';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import { renderHtml } from 'react-pdf-html';
import html from '../playground.html?raw';
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
              <Html>{html}</Html>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
};
