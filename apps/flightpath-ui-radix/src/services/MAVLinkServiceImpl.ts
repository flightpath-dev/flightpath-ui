import { create } from '@bufbuild/protobuf';
import { createClient } from '@connectrpc/connect';
import {
  MainMode,
  SubMode,
} from '@flightpath/flightpath/gen/ts/flightpath/heartbeat_pb.js';
import {
  MavCmd,
  MavModeFlag,
} from '@flightpath/flightpath/gen/ts/flightpath/mavlink_commands_pb.js';
import {
  MAVLinkService as MAVLinkServiceClient,
  MavlinkMessageType,
  SendCommandRequestSchema,
} from '@flightpath/flightpath/gen/ts/flightpath/mavlink_service_pb.js';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';

import { connectTransport } from '../utils/connectTransport';
import { mapCustomModeToFlightMode } from '../utils/mapCustomModeToFlightMode';

import type { MAVLinkService } from './MAVLinkService';
import type { FlightMode } from '../types/FlightMode';
import type { ExtendedSysState } from '@flightpath/flightpath/gen/ts/flightpath/extended_sys_state_pb.js';
import type { GlobalPositionInt } from '@flightpath/flightpath/gen/ts/flightpath/global_position_int_pb.js';
import type { GpsRawInt } from '@flightpath/flightpath/gen/ts/flightpath/gps_raw_int_pb.js';
import type { Heartbeat } from '@flightpath/flightpath/gen/ts/flightpath/heartbeat_pb.js';
import type {
  SendCommandRequest,
  SendCommandResponse,
} from '@flightpath/flightpath/gen/ts/flightpath/mavlink_service_pb.js';
import type { RadioStatus } from '@flightpath/flightpath/gen/ts/flightpath/radio_status_pb.js';
import type { StatusText } from '@flightpath/flightpath/gen/ts/flightpath/statustext_pb.js';
import type { SysStatus } from '@flightpath/flightpath/gen/ts/flightpath/sys_status_pb.js';
import type { VfrHud } from '@flightpath/flightpath/gen/ts/flightpath/vfr_hud_pb.js';
import type { Observable } from 'rxjs';

/**
 * MAVLink Service Implementation
 *
 * Manages all MAVLink message streams from the Flightpath server.
 * Subscribes to a single stream that contains all message types,
 * routing messages to appropriate observables based on messageType.
 * Implements the Service interface for lifecycle management.
 */
export class MAVLinkServiceImpl implements MAVLinkService {
  // Connect-RPC client using shared transport
  private readonly client = createClient(
    MAVLinkServiceClient,
    connectTransport,
  );

  // Internal state management - 8 BehaviorSubjects for each message type
  private readonly heartbeatSubject = new BehaviorSubject<Heartbeat | null>(
    null,
  );
  private readonly sysStatusSubject = new BehaviorSubject<SysStatus | null>(
    null,
  );
  private readonly extendedSysStateSubject =
    new BehaviorSubject<ExtendedSysState | null>(null);
  private readonly statusTextSubject = new BehaviorSubject<StatusText | null>(
    null,
  );
  private readonly globalPositionIntSubject =
    new BehaviorSubject<GlobalPositionInt | null>(null);
  private readonly gpsRawIntSubject = new BehaviorSubject<GpsRawInt | null>(
    null,
  );
  private readonly radioStatusSubject = new BehaviorSubject<RadioStatus | null>(
    null,
  );
  private readonly vfrHudSubject = new BehaviorSubject<VfrHud | null>(null);
  private readonly systemIdSubject = new BehaviorSubject<number | null>(null);
  private readonly componentIdSubject = new BehaviorSubject<number | null>(
    null,
  );

  // Public observables - emit message updates
  public heartbeat$: Observable<Heartbeat | null>;
  public sysStatus$: Observable<SysStatus | null>;
  public extendedSysState$: Observable<ExtendedSysState | null>;
  public statusText$: Observable<StatusText | null>;
  public globalPositionInt$: Observable<GlobalPositionInt | null>;
  public gpsRawInt$: Observable<GpsRawInt | null>;
  public radioStatus$: Observable<RadioStatus | null>;
  public vfrHud$: Observable<VfrHud | null>;

  // Transformed observables - only emit when value changes
  public flightMode$: Observable<FlightMode>;
  public batteryRemaining$: Observable<number>;
  public satellites$: Observable<number>;
  public remoteRssi$: Observable<number>;
  public systemId$: Observable<number | null>;
  public componentId$: Observable<number | null>;

  // Stream cancellation flag
  private streamCancelled = false;

  // Promise to track stream lifecycle
  private streamPromise: Promise<void> | null = null;

  // Timeout configuration for heartbeat
  private readonly timeoutThresholdMs: number;

  // Timeout tracking state for heartbeat
  private timeoutTimer: ReturnType<typeof setTimeout> | null = null;

  public constructor(timeoutThresholdMs: number = 10000) {
    this.timeoutThresholdMs = timeoutThresholdMs;

    // Expose subjects as observables (hide the .next() method)
    this.heartbeat$ = this.heartbeatSubject.asObservable();
    this.sysStatus$ = this.sysStatusSubject.asObservable();
    this.extendedSysState$ = this.extendedSysStateSubject.asObservable();
    this.statusText$ = this.statusTextSubject.asObservable();
    this.globalPositionInt$ = this.globalPositionIntSubject.asObservable();
    this.gpsRawInt$ = this.gpsRawIntSubject.asObservable();
    this.radioStatus$ = this.radioStatusSubject.asObservable();
    this.vfrHud$ = this.vfrHudSubject.asObservable();

    // Transform and deduplicate FlightMode - only emit when value changes
    this.flightMode$ = this.heartbeat$.pipe(
      map((heartbeat) =>
        heartbeat?.customMode
          ? mapCustomModeToFlightMode(heartbeat.customMode)
          : 'unknown',
      ),
      distinctUntilChanged(), // Only emit when FlightMode actually changes
    );

    // Transform and deduplicate battery - only emit when value changes
    this.batteryRemaining$ = this.sysStatus$.pipe(
      map((sysStatus) => sysStatus?.batteryRemaining ?? 0),
      distinctUntilChanged(), // Only emit when battery level actually changes
    );

    // Transform and deduplicate satellites - only emit when value changes
    this.satellites$ = this.gpsRawInt$.pipe(
      map((gpsRawInt) => gpsRawInt?.satellitesVisible ?? 0),
      distinctUntilChanged(), // Only emit when satellites count actually changes
    );

    // Transform and deduplicate remote RSSI - only emit when value changes
    this.remoteRssi$ = this.radioStatus$.pipe(
      map((radioStatus) => radioStatus?.remrssi ?? 0),
      distinctUntilChanged(), // Only emit when remote RSSI actually changes
    );

    // Transform and deduplicate system ID - only emit when value changes
    this.systemId$ = this.systemIdSubject.asObservable().pipe(
      distinctUntilChanged(), // Only emit when system ID actually changes
    );

    // Transform and deduplicate component ID - only emit when value changes
    this.componentId$ = this.componentIdSubject.asObservable().pipe(
      distinctUntilChanged(), // Only emit when component ID actually changes
    );
  }

  /**
   * Initialize the service
   * Called by ServiceProvider on mount
   */
  public onInit(): void {
    console.log('[MAVLinkService] Initializing...');
    this.startAllStreams();
  }

  /**
   * Cleanup resources
   * Called by ServiceProvider on unmount
   */
  public onDestroy(): void {
    console.log('[MAVLinkService] Destroying...');
    this.stopAllStreams();
  }

  /**
   * Start MAVLink stream
   * @private
   */
  private startAllStreams(): void {
    this.startMAVLinkStream();
  }

  /**
   * Stop MAVLink stream
   * @private
   */
  private stopAllStreams(): void {
    this.stopMAVLinkStream();
  }

  // ========== MAVLink Stream ==========

  private startMAVLinkStream(): void {
    console.log('[MAVLinkService] Starting MAVLink stream...');
    this.streamCancelled = false;
    this.streamPromise = this.processMAVLinkStream();
  }

  private async processMAVLinkStream(): Promise<void> {
    try {
      const stream = this.client.subscribeMessages({});

      for await (const response of stream) {
        if (this.streamCancelled) {
          console.log('[MAVLinkService] MAVLink stream cancelled');
          break;
        }

        // Route based on messageType discriminator
        switch (response.messageType) {
          case MavlinkMessageType.HEARTBEAT:
            if (response.message.case === 'heartbeat') {
              this.resetTimeout();
              this.heartbeatSubject.next(response.message.value);

              // In addition, track system and component IDs from the response
              this.systemIdSubject.next(response.systemId);
              this.componentIdSubject.next(response.componentId);
            }
            break;

          case MavlinkMessageType.SYS_STATUS:
            if (response.message.case === 'sysStatus') {
              this.sysStatusSubject.next(response.message.value);
            }
            break;

          case MavlinkMessageType.EXTENDED_SYS_STATE:
            if (response.message.case === 'extendedSysState') {
              this.extendedSysStateSubject.next(response.message.value);
            }
            break;

          case MavlinkMessageType.STATUSTEXT:
            if (response.message.case === 'statusText') {
              this.statusTextSubject.next(response.message.value);
            }
            break;

          case MavlinkMessageType.GLOBAL_POSITION_INT:
            if (response.message.case === 'globalPositionInt') {
              this.globalPositionIntSubject.next(response.message.value);
            }
            break;

          case MavlinkMessageType.GPS_RAW_INT:
            if (response.message.case === 'gpsRawInt') {
              this.gpsRawIntSubject.next(response.message.value);
            }
            break;

          case MavlinkMessageType.RADIO_STATUS:
            if (response.message.case === 'radioStatus') {
              this.radioStatusSubject.next(response.message.value);
            }
            break;

          case MavlinkMessageType.VFR_HUD:
            if (response.message.case === 'vfrHud') {
              this.vfrHudSubject.next(response.message.value);
            }
            break;
          case MavlinkMessageType.UNSPECIFIED:
          default:
            console.warn(
              `[MAVLinkService] Unhandled message type: ${response.messageType}`,
            );
            break;
        }
      }

      console.log('[MAVLinkService] MAVLink stream completed');
    } catch (error) {
      console.error('[MAVLinkService] MAVLink stream error:', error);
      this.clearTimeout();
      // Emit null to all subjects on error
      this.heartbeatSubject.next(null);
      this.sysStatusSubject.next(null);
      this.extendedSysStateSubject.next(null);
      this.statusTextSubject.next(null);
      this.globalPositionIntSubject.next(null);
      this.gpsRawIntSubject.next(null);
      this.radioStatusSubject.next(null);
      this.vfrHudSubject.next(null);
    }
  }

  private stopMAVLinkStream(): void {
    console.log('[MAVLinkService] Stopping MAVLink stream...');
    this.streamCancelled = true;
    this.clearTimeout();

    if (this.streamPromise) {
      void this.streamPromise
        .then(() => {
          console.log('[MAVLinkService] MAVLink stream stopped');
          return undefined;
        })
        .catch((error) => {
          console.error(
            '[MAVLinkService] Error stopping MAVLink stream:',
            error,
          );
          return undefined;
        });
    }

    // Emit null to all subjects on stop
    this.heartbeatSubject.next(null);
    this.sysStatusSubject.next(null);
    this.extendedSysStateSubject.next(null);
    this.statusTextSubject.next(null);
    this.globalPositionIntSubject.next(null);
    this.gpsRawIntSubject.next(null);
    this.radioStatusSubject.next(null);
    this.vfrHudSubject.next(null);
  }

  /**
   * Reset the timeout timer for heartbeat
   * @private
   */
  private resetTimeout(): void {
    this.clearTimeout();

    this.timeoutTimer = setTimeout(() => {
      if (!this.streamCancelled) {
        console.log(
          `[MAVLinkService] Timeout threshold (${this.timeoutThresholdMs}ms) exceeded, emitting null`,
        );
        this.heartbeatSubject.next(null);
      }
      this.timeoutTimer = null;
    }, this.timeoutThresholdMs);
  }

  /**
   * Clear the timeout timer
   * @private
   */
  private clearTimeout(): void {
    if (this.timeoutTimer !== null) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
  }

  // ========== Command Methods ==========

  /**
   * Send a MAVLink command to the drone
   * @param request - The command request
   * @returns The command response
   */
  public async sendCommand(
    request: SendCommandRequest,
  ): Promise<SendCommandResponse> {
    try {
      const response = await this.client.sendCommand(request);

      if (!response.success) {
        throw new Error(
          `Command failed: ${response.errorMessage ?? 'Unknown error'}`,
        );
      }

      return response;
    } catch (error) {
      console.error('[MAVLinkService] Error sending command:', error);
      throw error;
    }
  }

  /**
   * Arm the drone
   * @param targetSystemId - Target system ID
   * @param targetComponentId - Target component ID
   */
  public async sendArmCommand(
    targetSystemId: number,
    targetComponentId: number,
  ): Promise<void> {
    const request = create(SendCommandRequestSchema, {
      targetSystemId,
      targetComponentId,
      command: MavCmd.COMPONENT_ARM_DISARM,
      param1: 1.0, // 1 to arm, 0 to disarm
      param2: 0.0, // 0 = normal arming (not force)
      param3: 0.0,
      param4: 0.0,
      param5: 0.0,
      param6: 0.0,
      param7: 0.0,
    });

    await this.sendCommand(request);
  }

  /**
   * Send takeoff command by setting mode to AUTO/TAKEOFF
   * @param targetSystemId - Target system ID
   * @param targetComponentId - Target component ID
   */
  public async sendTakeoffCommand(
    targetSystemId: number,
    targetComponentId: number,
  ): Promise<void> {
    const request = create(SendCommandRequestSchema, {
      targetSystemId,
      targetComponentId,
      command: MavCmd.DO_SET_MODE,
      param1: MavModeFlag.SAFETY_ARMED | MavModeFlag.CUSTOM_MODE_ENABLED, // 128 | 1 = 129
      param2: MainMode.AUTO,
      param3: SubMode.AUTO_TAKEOFF,
      param4: 0.0,
      param5: 0.0,
      param6: 0.0,
      param7: 0.0,
    });

    await this.sendCommand(request);
  }

  /**
   * Send return to launch command by setting mode to AUTO/RTL
   * @param targetSystemId - Target system ID
   * @param targetComponentId - Target component ID
   */
  public async sendReturnToLaunchCommand(
    targetSystemId: number,
    targetComponentId: number,
  ): Promise<void> {
    const request = create(SendCommandRequestSchema, {
      targetSystemId,
      targetComponentId,
      command: MavCmd.DO_SET_MODE,
      param1: MavModeFlag.SAFETY_ARMED | MavModeFlag.CUSTOM_MODE_ENABLED, // 128 | 1 = 129
      param2: MainMode.AUTO,
      param3: SubMode.AUTO_RTL,
      param4: 0.0,
      param5: 0.0,
      param6: 0.0,
      param7: 0.0,
    });

    await this.sendCommand(request);
  }
}
