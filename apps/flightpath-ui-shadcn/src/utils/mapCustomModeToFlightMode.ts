import {
  MainMode,
  SubMode,
} from '@flightpath/flightpath/gen/ts/flightpath/heartbeat_pb.js';

import { FlightModeEnum } from '../types/FlightMode';

import type { FlightMode } from '../types/FlightMode';
import type { CustomMode } from '@flightpath/flightpath/gen/ts/flightpath/heartbeat_pb.js';

/**
 * Maps MAVLink's CustomMode to FlightMode type
 * @param customMode - The CustomMode from MAVLink's Heartbeat
 * @returns The corresponding FlightMode, or 'unknown' if no match
 */
export function mapCustomModeToFlightMode(customMode?: CustomMode): FlightMode {
  if (!customMode) {
    return FlightModeEnum.Unknown;
  }

  const { mainMode, subMode } = customMode;

  // Handle AUTO mode with sub-modes
  if (mainMode === MainMode.AUTO) {
    switch (subMode) {
      case SubMode.AUTO_READY:
        return FlightModeEnum.Ready;
      case SubMode.AUTO_TAKEOFF:
        return FlightModeEnum.Takeoff;
      case SubMode.AUTO_LOITER:
        return FlightModeEnum.Hold;
      case SubMode.AUTO_MISSION:
        return FlightModeEnum.Mission;
      case SubMode.AUTO_RTL:
        return FlightModeEnum.Return;
      case SubMode.AUTO_LAND:
        return FlightModeEnum.Land;
      case SubMode.AUTO_FOLLOW_TARGET:
        return FlightModeEnum.FollowMe;
      default:
        return FlightModeEnum.Unknown;
    }
  }

  // Handle main modes
  switch (mainMode) {
    case MainMode.MANUAL:
      return FlightModeEnum.Manual;
    case MainMode.ALTCTL:
      return FlightModeEnum.Altitude;
    case MainMode.POSCTL:
      return FlightModeEnum.Position;
    case MainMode.STABILIZED:
      return FlightModeEnum.Stabilized;
    case MainMode.ACRO:
      return FlightModeEnum.Acro;
    case MainMode.OFFBOARD:
      return FlightModeEnum.Guided;
    default:
      return FlightModeEnum.Unknown;
  }
}
