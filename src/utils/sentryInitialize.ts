import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  ignoreErrors: [
    "Already write mode.",
    "No port.",
  ],
  sendDefaultPii: true,
});
