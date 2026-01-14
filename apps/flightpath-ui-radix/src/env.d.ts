// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRPC_SERVER_URL: string;
  readonly VITE_ENVIRONMENT: 'development' | 'production' | 'staging';
  readonly VITE_LOG_LEVEL: 'debug' | 'error' | 'info' | 'warn';
  readonly VITE_MAPTILER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
