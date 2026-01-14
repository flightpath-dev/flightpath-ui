import { combineLatest, map, interval, startWith } from 'rxjs';

import type { MAVLinkService } from './MAVLinkService';
import type { TelemetryService } from './TelemetryService';
import type { Telemetry } from '../types/Telemetry';
import type { GlobalPositionInt } from '@flightpath/flightpath/gen/ts/flightpath/global_position_int_pb.js';
import type { Heartbeat } from '@flightpath/flightpath/gen/ts/flightpath/heartbeat_pb.js';
import type { VfrHud } from '@flightpath/flightpath/gen/ts/flightpath/vfr_hud_pb.js';
import type { Observable } from 'rxjs';

/**
 * Telemetry Service Implementation
 *
 * Combines data from MAVLinkService (Heartbeat, GlobalPositionInt, and VfrHud)
 * to provide a unified Telemetry object.
 * Implements the Service interface for lifecycle management.
 */
export class TelemetryServiceImpl implements TelemetryService {
  // Flight time tracking
  private armedStartTime: number | null = null;
  private lastFlightTime: number = 0;

  public readonly telemetry$: Observable<Telemetry>;

  public constructor(private readonly mavlinkService: MAVLinkService) {
    // Combine all three observables from MAVLinkService
    const data$ = combineLatest([
      this.mavlinkService.heartbeat$,
      this.mavlinkService.globalPositionInt$,
      this.mavlinkService.vfrHud$,
    ]);

    // Create an interval that emits every second for flight time updates
    const timer$ = interval(1000).pipe(startWith(0));

    // Combine data with timer to update telemetry every second
    this.telemetry$ = combineLatest([data$, timer$]).pipe(
      map(([[heartbeat, globalPositionInt, vfrHud]]) => {
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

        return this.deriveTelemetry(heartbeat, globalPositionInt, vfrHud);
      }),
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
    // Reset armed start time and preserve last flight time
    this.armedStartTime = null;
  }

  /**
   * Derive Telemetry object from the three services
   * @private
   */
  private deriveTelemetry(
    heartbeat: Heartbeat | null,
    globalPositionInt: GlobalPositionInt | null,
    vfrHud: VfrHud | null,
  ): Telemetry {
    // Calculate flight time (will be updated by interval)
    const isArmed = heartbeat?.baseMode?.safetyArmed ?? false;
    const flightTime =
      isArmed && this.armedStartTime !== null
        ? (Date.now() - this.armedStartTime) / 1000
        : this.lastFlightTime;

    /*
     * Convert MSL altitude from mm to feet
     * alt is in mm, 1 mm = 0.00328084 feet
     */
    const mslAltitudeMm = globalPositionInt?.alt ?? 0;
    const mslAltitude = mslAltitudeMm * 0.00328084;

    /*
     * Convert relative altitude from mm to feet
     * relative_alt is in mm, 1 mm = 0.00328084 feet
     */
    const relativeAltitudeMm = globalPositionInt?.relativeAlt ?? 0;
    const relativeAltitude = relativeAltitudeMm * 0.00328084;

    /*
     * Convert ground speed from m/s to mph
     * groundspeed is in m/s, 1 m/s = 2.23694 mph
     */
    const groundSpeedMs = vfrHud?.groundspeed ?? 0;
    const groundSpeed = groundSpeedMs * 2.23694;

    /*
     * Convert climb rate from m/s to mph
     * climb is in m/s, 1 m/s = 2.23694 mph
     */
    const climbMs = vfrHud?.climb ?? 0;
    const climb = climbMs * 2.23694;

    // Heading is already in degrees
    const heading = vfrHud?.heading ?? 0;

    // Throttle is already in percent
    const throttle = vfrHud?.throttle ?? 0;

    return {
      flightTime,
      mslAltitude,
      relativeAltitude,
      groundSpeed,
      climb,
      heading,
      throttle,
    };
  }
}
