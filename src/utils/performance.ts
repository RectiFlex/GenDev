import { useEffect, useCallback } from 'react';

export function usePerformanceMonitor() {
  const logPerformanceMetrics = useCallback(() => {
    if (window.performance && window.performance.getEntriesByType) {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintTiming = performance.getEntriesByType('paint');

      console.info('Performance Metrics:', {
        loadTime: navigationTiming.loadEventEnd - navigationTiming.startTime,
        firstPaint: paintTiming.find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: paintTiming.find(entry => entry.name === 'first-contentful-paint')?.startTime
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('load', logPerformanceMetrics);
    return () => window.removeEventListener('load', logPerformanceMetrics);
  }, [logPerformanceMetrics]);
}