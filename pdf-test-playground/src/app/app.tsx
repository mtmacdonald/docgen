import { Document, Page, PDFViewer } from '@react-pdf/renderer';
//import { renderHtml } from 'react-pdf-html';
import { Pdf /*, html */ } from '../document.tsx';
import styles from './app.module.css';

const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        Placeholder
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

export default App
