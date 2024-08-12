import { PDFViewer } from '@react-pdf/renderer';
import { Pdf } from '../document.tsx';
import styles from './app.module.css';

const App = () => (
<div className={styles.container}>
  <div className={styles.left}>
    Placeholder
  </div>
  <div className={styles.right}>
    <PDFViewer>
      <Pdf />
    </PDFViewer>
  </div>
</div>
);

export default App
