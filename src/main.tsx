import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from './utils/errorBoundary';
import { reportWebVitals, logAnalytics } from './utils/analytics';
import App from './App';
import './styles/globals.css';

// Initialize performance monitoring
if (import.meta.env.PROD) {
  reportWebVitals(logAnalytics);
}

// Register service worker
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.error('SW registration failed:', error);
      });
  });
}

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);