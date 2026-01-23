/**
 * Connect-RPC Client Initialization
 *
 * Creates a reusable Connect transport and provides utilities for creating
 * service clients. All services share the same HTTP/2 connection via the transport.
 */

import { createConnectTransport } from '@connectrpc/connect-web';
import { BehaviorSubject } from 'rxjs';

import { config } from '../config/AppConfig';

import type {
  Transport,
  Interceptor,
  UnaryRequest,
  StreamRequest,
  UnaryResponse,
  StreamResponse,
} from '@connectrpc/connect';
import type { Observable } from 'rxjs';

/**
 * Connection states for monitoring
 */
export type ConnectionState = 'connecting' | 'error' | 'idle' | 'ready';

/**
 * Connect transport options
 */
interface TransportOptions {
  baseUrl: string;

  /** Custom headers to include in all requests */
  headers?: Record<string, string>;

  /** Enable verbose logging for debugging */
  verbose?: boolean;
}

/**
 * Default transport options
 */
const DEFAULT_OPTIONS: Omit<TransportOptions, 'baseUrl'> = {
  verbose: config.environment === 'development',
};

/**
 * Connect Transport Manager
 * Manages the Connect transport and connection state
 */
class ConnectTransportManager {
  private transport: Transport | null = null;
  private readonly options: TransportOptions;

  private readonly connectionStateSubject =
    new BehaviorSubject<ConnectionState>('idle');
  public readonly connectionState$: Observable<ConnectionState> =
    this.connectionStateSubject.asObservable();

  public constructor(options: TransportOptions) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
  }

  /**
   * Get the Connect transport
   * Initializes on first access
   */
  public getTransport(): Transport {
    if (!this.transport) {
      this.initializeTransport();
    }
    if (!this.transport) {
      throw new Error('Failed to initialize transport');
    }
    return this.transport;
  }

  /**
   * Get current connection state
   */
  public getConnectionState(): ConnectionState {
    return this.connectionStateSubject.value;
  }

  /**
   * Initialize the Connect transport
   * @private
   */
  private initializeTransport(): void {
    console.log('[Connect] Initializing transport...', {
      baseUrl: this.options.baseUrl,
      environment: config.environment,
    });

    try {
      this.connectionStateSubject.next('connecting');

      this.transport = createConnectTransport({
        baseUrl: this.options.baseUrl,

        // Custom interceptors for logging, auth, etc.
        interceptors:
          this.options.verbose === true ? [this.loggingInterceptor()] : [],

        // Custom headers if needed
        ...(this.options.headers &&
          {
            // Add custom headers here if needed
          }),
      });

      this.connectionStateSubject.next('ready');
      console.log('[Connect] Transport initialized successfully');
    } catch (error) {
      console.error('[Connect] Failed to initialize transport:', error);
      this.connectionStateSubject.next('error');
      throw error;
    }
  }

  /**
   * Logging interceptor for debugging
   * @private
   */
  private loggingInterceptor(): Interceptor {
    return (next) =>
      async (
        req: StreamRequest | UnaryRequest,
      ): Promise<StreamResponse | UnaryResponse> => {
        console.log('[Connect] Request:', {
          service: req.service.typeName,
          method: req.method.name,
          url: req.url,
        });

        try {
          const res = await next(req);
          console.log('[Connect] Response:', {
            service: req.service.typeName,
            method: req.method.name,
            status: 'success',
          });
          return res;
        } catch (error) {
          console.error('[Connect] Error:', {
            service: req.service.typeName,
            method: req.method.name,
            error,
          });
          throw error;
        }
      };
  }

  /**
   * Recreate transport (for reconnection)
   */
  public reconnect(): void {
    console.log('[Connect] Reconnecting transport...');
    this.transport = null;
    this.initializeTransport();
  }
}

/**
 * Singleton transport manager
 */
const transportManager = new ConnectTransportManager({
  baseUrl: config.grpcServerUrl,
  verbose: config.environment === 'development',
});

/**
 * Shared Connect transport
 * Use it to create clients for remote gRPC services.
 *
 * ```typescript
 * import { connectTransport } from '@/utils/connectTransport';
 * import { createClient } from '@connectrpc/connect';
 * import { MAVLinkService as RemoteMAVLinkService } from '@flightpath/flightpath/gen/ts/flightpath/mavlink_service_pb';
 *
 * const client = createClient(RemoteMAVLinkService, connectTransport);
 * ```
 */
export const connectTransport = transportManager.getTransport();

/**
 * Observable connection state
 *
 * Subscribe to monitor connection status:
 * ```typescript
 * const state = useObservableState(() => connectionState$, 'idle');
 * ```
 */
export const { connectionState$ } = transportManager;

/**
 * Utility functions
 */
export const connectUtils = {
  /**
   * Get current connection state
   */
  getConnectionState: () => transportManager.getConnectionState(),

  /**
   * Reconnect the transport
   */
  reconnect: () => {
    transportManager.reconnect();
  },

  /**
   * Get the transport instance
   */
  getTransport: () => transportManager.getTransport(),
};

/**
 * Development utilities
 * Exposes Connect transport internals to window.__connect for browser console debugging
 */
if (config.environment === 'development') {
  // Extend Window interface to type-check the __connect property
  interface WindowWithConnect {
    __connect?: {
      connectTransport: Transport;
      connectionState$: Observable<ConnectionState>;
      utils: typeof connectUtils;
      config: typeof config;
    };
  }

  // Attach utilities to window for console access (e.g., window.__connect.utils.reconnect())
  (window as WindowWithConnect).__connect = {
    connectTransport,
    connectionState$,
    utils: connectUtils,
    config,
  };

  console.log('[Connect] Development mode: Access via window.__connect');
}
