import * as Sentry from '@sentry/react';

export function initializeSentry() {
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing({
          tracePropagationTargets: ['localhost', 'gendev.dev'],
        }),
        new Sentry.Replay(),
      ],
      environment: import.meta.env.MODE,
      release: `gendev@${import.meta.env.VITE_APP_VERSION || '1.0.0'}`,
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
}

export function captureException(error: Error, context?: Record<string, any>) {
  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      extra: context,
    });
  } else {
    console.error('Error:', error, context);
  }
}

export function setUserContext(userId: string, email?: string) {
  if (import.meta.env.PROD) {
    Sentry.setUser({
      id: userId,
      email,
    });
  }
}