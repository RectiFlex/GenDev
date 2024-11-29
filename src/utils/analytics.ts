import { type Metric } from 'web-vitals';

export function reportWebVitals(onPerfEntry?: (metric: Metric) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
}

export function logAnalytics(metric: Metric) {
  // In development, log to console
  if (import.meta.env.DEV) {
    console.log(metric);
    return;
  }

  // In production, you could send to your analytics service
  // Example: sending to Google Analytics
  const analyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
  if (analyticsId) {
    // Initialize analytics if needed
    window.gtag?.('event', metric.name, {
      value: Math.round(metric.value * 1000) / 1000,
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }
}