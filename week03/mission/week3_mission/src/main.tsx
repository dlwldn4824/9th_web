import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';               // ✅ tailwind 로드
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
