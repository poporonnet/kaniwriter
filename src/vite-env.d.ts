/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly NPM_PACKAGE_VERSION: string;
  readonly VITE_COMPILER_URL: string;
  readonly VITE_WRITER_REPOSITORY_PATH: string;
  readonly VITE_REFERENCE_URL: string;
  readonly VITE_COMPILER_VERSION_FALLBACK: string;
  readonly VITE_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
