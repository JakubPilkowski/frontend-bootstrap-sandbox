import * as Sentry from '@sentry/react';

export function initSentry() {
  if (import.meta.env.VITE_ENVIRONMENT !== 'Production') {
    return;
  }
  console.log('Sentry initialized');
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [],
  });
}
