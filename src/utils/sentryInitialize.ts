import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  ignoreErrors: [
    "Already write mode.",
    "No port.",
    "The device has been lost.",
    "Cannot write serial port.",
    "Error excepted while writing.",
  ],
  sendDefaultPii: true,
});
