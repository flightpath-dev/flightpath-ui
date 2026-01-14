import { map, distinctUntilChanged } from 'rxjs';

import type { MAVLinkService } from './MAVLinkService';
import type { Position2DService } from './Position2DService';
import type { Position2D } from '../types/Position2D';
import type { GlobalPositionInt } from '@flightpath/flightpath/gen/ts/flightpath/global_position_int_pb.js';
import type { Observable } from 'rxjs';

/**
 * Position2D Service Implementation
 *
 * Derives Position2D data from MAVLinkService GlobalPositionInt messages.
 * Converts coordinates and heading to degrees.
 * Implements the Service interface for lifecycle management.
 */
export class Position2DServiceImpl implements Position2DService {
  public readonly position2D$: Observable<Position2D>;

  public constructor(private readonly mavlinkService: MAVLinkService) {
    // Transform GlobalPositionInt to Position2D
    this.position2D$ = this.mavlinkService.globalPositionInt$.pipe(
      map((globalPositionInt) => this.derivePosition2D(globalPositionInt)),
      distinctUntilChanged(
        (prev, curr) =>
          // Only emit when position or heading actually changes
          prev.lat === curr.lat &&
          prev.lon === curr.lon &&
          prev.heading === curr.heading,
      ),
    );
  }

  /**
   * Initialize the service
   */
  public onInit(): void {
    // This service doesn't need initialization as it only transforms other services
  }

  /**
   * Cleanup resources
   */
  public onDestroy(): void {
    // This service doesn't need cleanup as it only transforms other services
  }

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
     */
    const latDegrees =
      globalPositionInt?.lat !== null && globalPositionInt?.lat !== undefined
        ? globalPositionInt.lat / 10_000_000
        : 0;

    /*
     * Convert longitude from degrees * 1E7 to degrees
     * lon is in degrees * 1E7, divide by 1E7 to get degrees
     */
    const lonDegrees =
      globalPositionInt?.lon !== null && globalPositionInt?.lon !== undefined
        ? globalPositionInt.lon / 10_000_000
        : 0;

    /*
     * Convert heading from hundredths of degrees to degrees
     * hdg is in degrees * 100, divide by 100 to get degrees
     */
    const headingDegrees =
      globalPositionInt?.hdg !== null && globalPositionInt?.hdg !== undefined
        ? globalPositionInt.hdg / 100
        : 0;

    return {
      lat: latDegrees,
      lon: lonDegrees,
      heading: headingDegrees,
    };
  }
}
