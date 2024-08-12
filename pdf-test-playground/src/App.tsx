import { PDFViewer } from '@react-pdf/renderer';
import { Pdf } from './document.tsx';

const App = () => (
<>
  <div>
    <PDFViewer>
      <Pdf />
    </PDFViewer>
  </div>
  <div>
    Placeholder
  </div>
</>
);

export default App
