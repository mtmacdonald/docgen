import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import '../../../src/styles/normalize.css';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <App />
);
