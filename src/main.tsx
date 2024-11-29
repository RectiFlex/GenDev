// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeSentry } from './utils/sentry';
import App from './App';
import './index.css';

// Initialize error tracking
initializeSentry();

// Register service worker
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('SW registered:', registration);
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  });
}

// Performance monitoring
if (import.meta.env.PROD) {
  const reportWebVitals = async () => {
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  };

  reportWebVitals();
}

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
