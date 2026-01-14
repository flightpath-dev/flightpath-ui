import { MavLandedState } from '@flightpath/flightpath/gen/ts/flightpath/extended_sys_state_pb.js';
import { MavState } from '@flightpath/flightpath/gen/ts/flightpath/heartbeat_pb.js';
import { combineLatest, map, distinctUntilChanged } from 'rxjs';

import type { FlightStatusService } from './FlightStatusService';
import type { MAVLinkService } from './MAVLinkService';
import type { FlightStatus } from '../types/FlightStatus';
import type { ExtendedSysState } from '@flightpath/flightpath/gen/ts/flightpath/extended_sys_state_pb.js';
import type { Heartbeat } from '@flightpath/flightpath/gen/ts/flightpath/heartbeat_pb.js';
import type { SysStatus } from '@flightpath/flightpath/gen/ts/flightpath/sys_status_pb.js';
import type { Observable } from 'rxjs';

export class FlightStatusServiceImpl implements FlightStatusService {
  public readonly flightStatus$: Observable<FlightStatus>;

  public constructor(private readonly mavlinkService: MAVLinkService) {
    this.flightStatus$ = combineLatest([
      this.mavlinkService.heartbeat$,
      this.mavlinkService.sysStatus$,
      this.mavlinkService.extendedSysState$,
    ]).pipe(
      map(([heartbeat, sysStatus, extendedSysState]) =>
        this.deriveStatus(heartbeat, sysStatus, extendedSysState),
      ),
      distinctUntilChanged(
        (a, b) => a.state === b.state && a.severity === b.severity,
      ),
    );
  }

  /**
   * Initialize the service
   */
  public onInit(): void {
    // This service doesn't need initialization as it only combines other services
  }

  /**
   * Cleanup resources
   */
  public onDestroy(): void {
    // This service doesn't need cleanup as it only combines other services
  }

  private deriveStatus(
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
      return { state: 'readyToFly', severity: 'info' };
    }

    // Active (armed/flying)
    if (systemStatus === MavState.ACTIVE && isArmed) {
      switch (landedState) {
        case MavLandedState.ON_GROUND:
          return { state: 'armed', severity: 'info' };
        case MavLandedState.IN_AIR:
        case MavLandedState.TAKEOFF:
          return { state: 'flying', severity: 'info' };
        case MavLandedState.LANDING:
          return { state: 'landing', severity: 'info' };
        default:
          return { state: 'armed', severity: 'info' };
      }
    }

    // Default fallback
    return { state: 'readyToFly', severity: 'info' };
  }

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
}
