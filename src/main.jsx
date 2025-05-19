import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Smoothly remove loader after React is ready
const loader = document.getElementById('initial-loader');
if (loader) {
  loader.style.transition = 'opacity 0.5s ease';
  loader.style.opacity = '0';
  setTimeout(() => loader.remove(), 500);
}
