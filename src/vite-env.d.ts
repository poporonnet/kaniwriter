/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COMPILER_URL: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_WRITER_REPOSITORY_PATH: string;
}

interface ImpoerMeta {
  readonly env: ImportMetaEnv;
}
