/**
 * Application configuration
 * Reads from Vite environment variables
 */
interface AppConfig {
  grpcServerUrl: string;
  environment: 'development' | 'production' | 'staging';
  logLevel: 'debug' | 'error' | 'info' | 'warn';
  maptilerKey: string;
}

/**
 * Load configuration from environment variables
 */
function loadConfig(): AppConfig {
  const grpcServerUrl = import.meta.env.VITE_GRPC_SERVER_URL;
  const environment = import.meta.env.VITE_ENVIRONMENT || 'development';
  const logLevel = import.meta.env.VITE_LOG_LEVEL || 'info';
  const maptilerKey = import.meta.env.VITE_MAPTILER_KEY;

  // Validation
  if (!grpcServerUrl) {
    throw new Error(
      'VITE_GRPC_SERVER_URL is not set. ' +
        'Create a .env.local file with VITE_GRPC_SERVER_URL=http://localhost:8080',
    );
  }

  if (!maptilerKey) {
    throw new Error(
      'VITE_MAPTILER_KEY is not set. ' +
        'Create a .env.local file with VITE_MAPTILER_KEY from https://www.maptiler.com/',
    );
  }

  return {
    grpcServerUrl,
    environment,
    logLevel,
    maptilerKey,
  };
}

/**
 * Singleton config instance
 */
export const config = loadConfig();

// Log config on startup
if (config.environment === 'development') {
  console.log('[Config] Loaded configuration:', config);
}
