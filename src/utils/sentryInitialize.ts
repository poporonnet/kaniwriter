import * as Sentry from "@sentry/react";

// Error messages to filter out from Sentry notifications
const FILTERED_ERROR_MESSAGES = [
  "Already write mode.",
  "No port.",
  "The device has been lost.",
  "Cannot write serial port.",
];

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  beforeSend(event) {
    // Filter out specific error messages
    if (event.exception && event.exception.values) {
      for (const exception of event.exception.values) {
        if (
          exception.value &&
          FILTERED_ERROR_MESSAGES.includes(exception.value)
        ) {
          return null; // Don't send this error to Sentry
        }
      }
    }

    // Also check message field for breadcrumbs or other error formats
    if (event.message && FILTERED_ERROR_MESSAGES.includes(event.message)) {
      return null; // Don't send this error to Sentry
    }

    return event;
  },
});
