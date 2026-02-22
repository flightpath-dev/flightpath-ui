import { create } from '@bufbuild/protobuf';
import { createClient } from '@connectrpc/connect';
import { MavLandedState } from '@flightpath/flightpath/gen/ts/flightpath/extended_sys_state_pb.js';
import { MavState } from '@flightpath/flightpath/gen/ts/flightpath/heartbeat_pb.js';
import {
  MavCmd,
  MavFrame,
} from '@flightpath/flightpath/gen/ts/flightpath/mavlink_commands_pb.js';
import {
  MAVLinkService as MAVLinkServiceClient,
  MavlinkMessageType,
  SendCommandIntRequestSchema,
  SendCommandLongRequestSchema,
} from '@flightpath/flightpath/gen/ts/flightpath/mavlink_service_pb.js';
import { MavSeverity } from '@flightpath/flightpath/gen/ts/flightpath/statustext_pb.js';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  interval,
  map,
  startWith,
} from 'rxjs';

import { connectTransport } from '../utils/connectTransport';
import { mapCustomModeToFlightMode } from '../utils/mapCustomModeToFlightMode';
import { MM_TO_FEET, MS_TO_MPH } from '../utils/unitConversions';

import type { MAVLinkService } from './MAVLinkService';
import type { FlightMode } from '../types/FlightMode';
import type { FlightStatus } from '../types/FlightStatus';
import type { MissionProgress } from '../types/MissionProgress';
import type { Position2D } from '../types/Position2D';
import type { StatusMessage } from '../types/StatusMessage';
import type { Telemetry } from '../types/Telemetry';
import type { Severity } from '@flightpath/autopilot/types/Severity';
import type { ExtendedSysState } from '@flightpath/flightpath/gen/ts/flightpath/extended_sys_state_pb.js';
import type { GlobalPositionInt } from '@flightpath/flightpath/gen/ts/flightpath/global_position_int_pb.js';
import type { GpsRawInt } from '@flightpath/flightpath/gen/ts/flightpath/gps_raw_int_pb.js';
import type { Heartbeat } from '@flightpath/flightpath/gen/ts/flightpath/heartbeat_pb.js';
import type {
  SendCommandIntRequest,
  SendCommandIntResponse,
  SendCommandLongRequest,
  SendCommandLongResponse,
} from '@flightpath/flightpath/gen/ts/flightpath/mavlink_service_pb.js';
import type { MissionCurrent } from '@flightpath/flightpath/gen/ts/flightpath/mission_current_pb.js';
import type { MissionItemReached } from '@flightpath/flightpath/gen/ts/flightpath/mission_item_reached_pb.js';
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
  private readonly missionCurrentSubject =
    new BehaviorSubject<MissionCurrent | null>(null);
  private readonly missionItemReachedSubject =
    new BehaviorSubject<MissionItemReached | null>(null);
  private readonly systemIdSubject = new BehaviorSubject<number | null>(null);
  private readonly componentIdSubject = new BehaviorSubject<number | null>(
    null,
  );

  // Private observables - raw message streams (used internally for derivation)
  private heartbeat$: Observable<Heartbeat | null>;
  private sysStatus$: Observable<SysStatus | null>;
  private extendedSysState$: Observable<ExtendedSysState | null>;
  private statusText$: Observable<StatusText | null>;
  private globalPositionInt$: Observable<GlobalPositionInt | null>;
  private gpsRawInt$: Observable<GpsRawInt | null>;
  private radioStatus$: Observable<RadioStatus | null>;
  private vfrHud$: Observable<VfrHud | null>;
  private missionCurrent$: Observable<MissionCurrent | null>;
  // Commented out: Not currently used by any components or derived observables.
  // Messages are still received from gRPC and stored in missionItemReachedSubject
  // for potential future use. Uncomment when a derived observable or component needs it.
  // private missionItemReached$: Observable<MissionItemReached | null>;

  // Derived observables - only emit when value changes
  public flightMode$: Observable<FlightMode>;
  public batteryRemaining$: Observable<number>;
  public satellites$: Observable<number>;
  public remoteRssi$: Observable<number>;
  public systemId$: Observable<number | null>;
  public componentId$: Observable<number | null>;
  public missionProgress$: Observable<MissionProgress>;
  public flightTime$: Observable<number>;
  public position2D$: Observable<Position2D>;
  public telemetry$: Observable<Telemetry>;
  public flightStatus$: Observable<FlightStatus>;
  public statusMessage$: Observable<StatusMessage | null>;

  // Flight time tracking state (for telemetry$)
  private armedStartTime: number | null = null;
  private lastFlightTime: number = 0;

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
    this.missionCurrent$ = this.missionCurrentSubject.asObservable();
    // Commented out: See comment on property declaration above
    // this.missionItemReached$ = this.missionItemReachedSubject.asObservable();

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

    // Transform and deduplicate mission progress - only emit when value changes
    this.missionProgress$ = this.missionCurrent$.pipe(
      map((missionCurrent) => ({
        missionId: missionCurrent?.missionId ?? 0,
        seq: missionCurrent?.seq ?? 0,
        total: missionCurrent?.total ?? 0,
      })),
      distinctUntilChanged(
        (a, b) =>
          a.missionId === b.missionId && a.seq === b.seq && a.total === b.total,
      ),
    );

    // Transform and deduplicate flight time - only emit when value changes
    const timer$ = interval(1000).pipe(startWith(0));
    this.flightTime$ = combineLatest([this.heartbeat$, timer$]).pipe(
      map(([heartbeat]) => {
        const isArmed = heartbeat?.baseMode?.safetyArmed ?? false;

        // Track when armed state becomes true
        if (isArmed && this.armedStartTime === null) {
          // Starting a new flight - reset timer
          this.armedStartTime = Date.now();
          this.lastFlightTime = 0;
        } else if (!isArmed && this.armedStartTime !== null) {
          // Disarming - save the current flight time
          const currentFlightTime = (Date.now() - this.armedStartTime) / 1000;
          this.lastFlightTime = currentFlightTime;
          this.armedStartTime = null;
        }

        // Calculate current flight time
        const flightTime =
          isArmed && this.armedStartTime !== null
            ? (Date.now() - this.armedStartTime) / 1000
            : this.lastFlightTime;

        // Round to nearest second for distinctUntilChanged comparison
        return Math.round(flightTime);
      }),
      distinctUntilChanged(), // Only emit when flight time actually changes
    );

    // ========== Derived Observables (continued) ==========

    // Position2D observable - derived from GlobalPositionInt
    this.position2D$ = this.globalPositionInt$.pipe(
      map((globalPositionInt) => this.derivePosition2D(globalPositionInt)),
      distinctUntilChanged(
        (prev, curr) =>
          // Only emit when position or heading actually changes
          prev.lat === curr.lat &&
          prev.lon === curr.lon &&
          prev.heading === curr.heading,
      ),
    );

    // Telemetry observable - combines GlobalPositionInt and VfrHud
    this.telemetry$ = combineLatest([
      this.globalPositionInt$,
      this.vfrHud$,
    ]).pipe(
      map(([globalPositionInt, vfrHud]) =>
        this.deriveTelemetry(globalPositionInt, vfrHud),
      ),
      distinctUntilChanged(
        (a, b) =>
          // Only emit when any telemetry value actually changes
          a.mslAltitude === b.mslAltitude &&
          a.relativeAltitude === b.relativeAltitude &&
          a.groundSpeed === b.groundSpeed &&
          a.climb === b.climb &&
          a.heading === b.heading &&
          a.throttle === b.throttle,
      ),
    );

    // FlightStatus observable - combines Heartbeat, SysStatus, and ExtendedSysState
    this.flightStatus$ = combineLatest([
      this.heartbeat$,
      this.sysStatus$,
      this.extendedSysState$,
    ]).pipe(
      map(([heartbeat, sysStatus, extendedSysState]) =>
        this.deriveFlightStatus(heartbeat, sysStatus, extendedSysState),
      ),
      distinctUntilChanged(
        (a, b) => a.state === b.state && a.severity === b.severity,
      ),
    );

    // StatusMessage observable - transforms StatusText to StatusMessage
    // No distinctUntilChanged - status messages are event-driven and should all be displayed
    this.statusMessage$ = this.statusText$.pipe(
      map((statusText) =>
        statusText ? this.deriveStatusMessage(statusText) : null,
      ),
    );
  }

  /**
   * Initialize the service
   * Called by ServiceProvider on mount
   */
  public onInit(): void {
    console.log('[MAVLinkService] Initializing...');
    this.startMAVLinkStream();
  }

  /**
   * Cleanup resources
   * Called by ServiceProvider on unmount
   */
  public onDestroy(): void {
    console.log('[MAVLinkService] Destroying...');
    this.stopMAVLinkStream();
    // Reset flight time tracking state
    this.armedStartTime = null;
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

          case MavlinkMessageType.MISSION_CURRENT:
            if (response.message.case === 'missionCurrent') {
              this.missionCurrentSubject.next(response.message.value);
            }
            break;

          case MavlinkMessageType.MISSION_ITEM_REACHED:
            if (response.message.case === 'missionItemReached') {
              this.missionItemReachedSubject.next(response.message.value);
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
      this.missionCurrentSubject.next(null);
      this.missionItemReachedSubject.next(null);
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
    this.missionCurrentSubject.next(null);
    this.missionItemReachedSubject.next(null);
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

  // ========== Derivation Helpers ==========

  /**
   * Derive Position2D object from GlobalPositionInt
   * @private
   */
  private derivePosition2D(
    globalPositionInt: GlobalPositionInt | null,
  ): Position2D {
    /*
     * Convert latitude from degrees * 1E7 to degrees
     * lat is in degrees * 1E7, divide by 1E7 to get degrees
     * Round to 6 decimal places (~11 cm precision) for distinctUntilChanged optimization
     */
    const latDegrees =
      globalPositionInt?.lat !== null && globalPositionInt?.lat !== undefined
        ? globalPositionInt.lat / 10_000_000
        : 0;
    const lat = Math.round(latDegrees * 1_000_000) / 1_000_000;

    /*
     * Convert longitude from degrees * 1E7 to degrees
     * lon is in degrees * 1E7, divide by 1E7 to get degrees
     * Round to 6 decimal places (~11 cm precision) for distinctUntilChanged optimization
     */
    const lonDegrees =
      globalPositionInt?.lon !== null && globalPositionInt?.lon !== undefined
        ? globalPositionInt.lon / 10_000_000
        : 0;
    const lon = Math.round(lonDegrees * 1_000_000) / 1_000_000;

    /*
     * Convert heading from hundredths of degrees to degrees
     * hdg is in degrees * 100, divide by 100 to get degrees
     * Round to 1 decimal place (0.1 degrees) for distinctUntilChanged optimization
     */
    const headingDegrees =
      globalPositionInt?.hdg !== null && globalPositionInt?.hdg !== undefined
        ? globalPositionInt.hdg / 100
        : 0;
    const heading = Math.round(headingDegrees * 10) / 10;

    return {
      lat,
      lon,
      heading,
    };
  }

  /**
   * Derive Telemetry object from Heartbeat, GlobalPositionInt, and VfrHud
   * @private
   */
  private deriveTelemetry(
    globalPositionInt: GlobalPositionInt | null,
    vfrHud: VfrHud | null,
  ): Telemetry {
    /*
     * Convert MSL altitude from mm to feet
     * alt is in mm, 1 mm = 0.00328084 feet
     * Round to 1 decimal place for distinctUntilChanged optimization
     */
    const mslAltitudeMm = globalPositionInt?.alt ?? 0;
    const mslAltitude = Math.round(mslAltitudeMm * MM_TO_FEET * 10) / 10;

    /*
     * Convert relative altitude from mm to feet
     * relative_alt is in mm, 1 mm = 0.00328084 feet
     * Round to 1 decimal place for distinctUntilChanged optimization
     */
    const relativeAltitudeMm = globalPositionInt?.relativeAlt ?? 0;
    const relativeAltitude =
      Math.round(relativeAltitudeMm * MM_TO_FEET * 10) / 10;

    /*
     * Convert ground speed from m/s to mph
     * groundspeed is in m/s, 1 m/s = 2.23694 mph
     * Round to 1 decimal place for distinctUntilChanged optimization
     */
    const groundSpeedMs = vfrHud?.groundspeed ?? 0;
    const groundSpeed = Math.round(groundSpeedMs * MS_TO_MPH * 10) / 10;

    /*
     * Convert climb rate from m/s to mph
     * climb is in m/s, 1 m/s = 2.23694 mph
     * Round to 1 decimal place for distinctUntilChanged optimization
     */
    const climbMs = vfrHud?.climb ?? 0;
    const climb = Math.round(climbMs * MS_TO_MPH * 10) / 10;

    // Heading is already in degrees
    // Round to 1 decimal place for distinctUntilChanged optimization
    const heading = Math.round((vfrHud?.heading ?? 0) * 10) / 10;

    // Throttle is already in percent
    // Round to 1 decimal place for distinctUntilChanged optimization
    const throttle = Math.round((vfrHud?.throttle ?? 0) * 10) / 10;

    return {
      mslAltitude,
      relativeAltitude,
      groundSpeed,
      climb,
      heading,
      throttle,
    };
  }

  /**
   * Derive FlightStatus from Heartbeat, SysStatus, and ExtendedSysState
   * @private
   */
  private deriveFlightStatus(
    heartbeat: Heartbeat | null,
    sysStatus: SysStatus | null,
    extendedSysState: ExtendedSysState | null,
  ): FlightStatus {
    // Communication lost
    if (!heartbeat) {
      return { state: 'communicationLost', severity: 'error' };
    }

    const { systemStatus } = heartbeat;
    const isArmed = heartbeat.baseMode?.safetyArmed ?? false;
    const landedState =
      extendedSysState?.landedState ?? MavLandedState.UNSPECIFIED;
    const hasHealthIssues = sysStatus
      ? this.checkSensorHealth(sysStatus)
      : false;

    // Not ready states
    if (
      systemStatus === MavState.UNSPECIFIED ||
      systemStatus === MavState.BOOT ||
      systemStatus === MavState.CALIBRATING ||
      hasHealthIssues
    ) {
      return { state: 'notReady', severity: 'error' };
    }

    // Emergency
    if (systemStatus === MavState.EMERGENCY) {
      return { state: 'notReady', severity: 'error' };
    }

    // Critical (warnings present)
    if (systemStatus === MavState.CRITICAL) {
      const state = isArmed
        ? landedState === MavLandedState.IN_AIR
          ? 'flying'
          : 'armed'
        : 'readyToFly';
      return { state, severity: 'warning' };
    }

    // Standby (ready but disarmed)
    if (systemStatus === MavState.STANDBY) {
      return { state: 'readyToFly', severity: 'success' };
    }

    // Active (armed/flying)
    if (systemStatus === MavState.ACTIVE && isArmed) {
      switch (landedState) {
        case MavLandedState.ON_GROUND:
          return { state: 'armed', severity: 'warning' };
        case MavLandedState.IN_AIR:
        case MavLandedState.TAKEOFF:
          return { state: 'flying', severity: 'info' };
        case MavLandedState.LANDING:
          return { state: 'landing', severity: 'warning' };
        default:
          return { state: 'armed', severity: 'warning' };
      }
    }

    // Default fallback
    return { state: 'readyToFly', severity: 'success' };
  }

  /**
   * Derive StatusMessage from StatusText
   * Maps MAVLink severity to application Severity type
   * @private
   */
  private deriveStatusMessage(statusText: StatusText): StatusMessage {
    return {
      severity: this.mavSeverityToSeverity(statusText.severity),
      text: statusText.text ?? '',
      timestamp: new Date(),
    };
  }

  /**
   * Map MAVLink severity enum to application Severity type
   * @private
   */
  private mavSeverityToSeverity(mavSeverity: MavSeverity): Severity {
    switch (mavSeverity) {
      case MavSeverity.EMERGENCY:
      case MavSeverity.ALERT:
      case MavSeverity.CRITICAL:
      case MavSeverity.ERROR:
        return 'error';
      case MavSeverity.WARNING:
        return 'warning';
      case MavSeverity.NOTICE:
      case MavSeverity.INFO:
      case MavSeverity.DEBUG:
      default:
        return 'info';
    }
  }

  /**
   * Check if sensors have health issues
   * @private
   */
  private checkSensorHealth(sysStatus: SysStatus): boolean {
    const health = sysStatus.onboardControlSensorsHealth;
    const enabled = sysStatus.onboardControlSensorsEnabled;

    if (!health || !enabled) {
      return false;
    }

    /* --- Check critical sensors: if enabled but not healthy, return true --- */

    // 3D gyro (bit 0)
    if (enabled.sensor3dGyro && !health.sensor3dGyro) {
      return true;
    }
    // 3D accel (bit 1)
    if (enabled.sensor3dAccel && !health.sensor3dAccel) {
      return true;
    }
    // 3D mag (bit 2)
    if (enabled.sensor3dMag && !health.sensor3dMag) {
      return true;
    }
    // absolute pressure (bit 3)
    if (enabled.sensorAbsolutePressure && !health.sensorAbsolutePressure) {
      return true;
    }
    // GPS (bit 5)
    if (enabled.sensorGps && !health.sensorGps) {
      return true;
    }
    // battery/angular rate control (bit 10)
    if (enabled.sensorAngularRateControl && !health.sensorAngularRateControl) {
      return true;
    }

    return false;
  }

  // ========== Command Methods ==========

  /**
   * Send a MAVLink COMMAND_LONG to the drone
   * @param request - The command request
   * @returns The command response
   */
  public async sendCommandLong(
    request: SendCommandLongRequest,
  ): Promise<SendCommandLongResponse> {
    try {
      const response = await this.client.sendCommandLong(request);

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
   * Send a MAVLink COMMAND_INT to the drone
   * @param request - The command request
   * @returns The command response
   */
  public async sendCommandInt(
    request: SendCommandIntRequest,
  ): Promise<SendCommandIntResponse> {
    try {
      const response = await this.client.sendCommandInt(request);

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
    const request = create(SendCommandLongRequestSchema, {
      targetSystemId,
      targetComponentId,
      command: MavCmd.COMPONENT_ARM_DISARM,
      param1: 1.0, // 1 to arm, 0 to disarm
      param2: 0.0, // 0 = normal arming (not force)
      param3: 0.0, // Unused
      param4: 0.0, // Unused
      param5: 0.0, // Unused
      param6: 0.0, // Unused
      param7: 0.0, // Unused
    });

    await this.sendCommandLong(request);
  }

  /**
   * Send takeoff command with specified altitude relative to current position
   * @param targetSystemId - Target system ID
   * @param targetComponentId - Target component ID
   * @param relativeAltitudeMeters - Target altitude in meters above current position
   */
  public async sendTakeoffCommand(
    targetSystemId: number,
    targetComponentId: number,
    relativeAltitudeMeters: number,
  ): Promise<void> {
    // Get current MSL altitude from latest position data
    const globalPosition = this.globalPositionIntSubject.getValue();
    if (!globalPosition) {
      throw new Error('Cannot takeoff: no GPS position available');
    }

    // Convert current MSL altitude from mm to meters and add relative altitude
    const currentMslMeters = globalPosition.alt / 1000;
    const targetMslMeters = currentMslMeters + relativeAltitudeMeters;

    const request = create(SendCommandIntRequestSchema, {
      targetSystemId,
      targetComponentId,
      frame: MavFrame.GLOBAL_INT,
      command: MavCmd.NAV_TAKEOFF,
      param1: 0.0, // Minimum pitch (fixed-wing only)
      param2: 0.0, // Empty
      param3: 0.0, // Empty
      param4: NaN, // Yaw angle (NaN = use current heading)
      x: globalPosition.lat, // Latitude (degrees * 1E7)
      y: globalPosition.lon, // Longitude (degrees * 1E7)
      z: targetMslMeters, // Target altitude in meters (MSL)
    });

    await this.sendCommandInt(request);
  }

  /**
   * Send return to launch command
   * @param targetSystemId - Target system ID
   * @param targetComponentId - Target component ID
   */
  public async sendReturnToLaunchCommand(
    targetSystemId: number,
    targetComponentId: number,
  ): Promise<void> {
    const request = create(SendCommandLongRequestSchema, {
      targetSystemId,
      targetComponentId,
      command: MavCmd.NAV_RETURN_TO_LAUNCH,
      param1: 0.0, // Unused
      param2: 0.0, // Unused
      param3: 0.0, // Unused
      param4: 0.0, // Unused
      param5: 0.0, // Unused
      param6: 0.0, // Unused
      param7: 0.0, // Unused
    });

    await this.sendCommandLong(request);
  }

  /**
   * Send mission start command
   * @param targetSystemId - Target system ID
   * @param targetComponentId - Target component ID
   */
  public async sendMissionStartCommand(
    targetSystemId: number,
    targetComponentId: number,
  ): Promise<void> {
    const request = create(SendCommandLongRequestSchema, {
      targetSystemId,
      targetComponentId,
      command: MavCmd.MISSION_START,
      param1: 0.0, // Unused
      param2: 0.0, // Unused
      param3: 0.0, // Unused
      param4: 0.0, // Unused
      param5: 0.0, // Unused
      param6: 0.0, // Unused
      param7: 0.0, // Unused
    });

    await this.sendCommandLong(request);
  }
}
