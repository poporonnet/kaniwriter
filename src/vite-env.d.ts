/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COMPILER_URL: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_WRITER_REPOSITORY_PATH: string;
  readonly VITE_REFERENCE_URL: string;
  readonly VITE_COMPILER_VERSION_FALLBACK: string;
  readonly VITE_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
