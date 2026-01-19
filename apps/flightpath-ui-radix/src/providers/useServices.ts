import { useContext } from 'react';

import { useObservableState } from 'observable-hooks';

import { MAVLinkServiceContext } from './MAVLinkServiceContext';
import { FlightModeEnum } from '../types/FlightMode';

import type { MAVLinkService } from '../services/MAVLinkService';
import type { FlightMode } from '../types/FlightMode';
import type { FlightStatus } from '../types/FlightStatus';
import type { Position2D } from '../types/Position2D';
import type { Telemetry } from '../types/Telemetry';
import type { ExtendedSysState } from '@flightpath/flightpath/gen/ts/flightpath/extended_sys_state_pb.js';
import type { GlobalPositionInt } from '@flightpath/flightpath/gen/ts/flightpath/global_position_int_pb.js';
import type { GpsRawInt } from '@flightpath/flightpath/gen/ts/flightpath/gps_raw_int_pb.js';
import type { Heartbeat } from '@flightpath/flightpath/gen/ts/flightpath/heartbeat_pb.js';
import type { MissionCurrent } from '@flightpath/flightpath/gen/ts/flightpath/mission_current_pb.js';
import type { RadioStatus } from '@flightpath/flightpath/gen/ts/flightpath/radio_status_pb.js';
import type { StatusText } from '@flightpath/flightpath/gen/ts/flightpath/statustext_pb.js';
import type { SysStatus } from '@flightpath/flightpath/gen/ts/flightpath/sys_status_pb.js';
import type { VfrHud } from '@flightpath/flightpath/gen/ts/flightpath/vfr_hud_pb.js';

/**
 * Hook to access MAVLinkService.
 * Use this if you need direct access to the service instance.
 */
export function useMAVLinkService(): MAVLinkService {
  const mavlinkService = useContext(MAVLinkServiceContext);

  if (!mavlinkService) {
    throw new Error('MAVLinkService is not provided');
  }

  return mavlinkService;
}

// ---------- MAVLink service hooks ----------
export function useHeartbeat(): Heartbeat | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.heartbeat$, null);
}

export function useFlightMode(): FlightMode {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.flightMode$, FlightModeEnum.Unknown);
}

export function useSysStatus(): SysStatus | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.sysStatus$, null);
}

export function useBatteryRemaining(): number {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.batteryRemaining$, 0);
}

export function useExtendedSysState(): ExtendedSysState | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.extendedSysState$, null);
}

export function useStatusText(): StatusText | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.statusText$, null);
}

export function useGlobalPositionInt(): GlobalPositionInt | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.globalPositionInt$, null);
}

export function useGpsRawInt(): GpsRawInt | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.gpsRawInt$, null);
}

export function useSatellites(): number {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.satellites$, 0);
}

export function useRadioStatus(): RadioStatus | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.radioStatus$, null);
}

export function useRemoteRssi(): number {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.remoteRssi$, 0);
}

export function useVfrHud(): VfrHud | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.vfrHud$, null);
}

export function useMissionCurrent(): MissionCurrent | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.missionCurrent$, null);
}

export function useSystemId(): number | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.systemId$, null);
}

export function useComponentId(): number | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.componentId$, null);
}

// ---------- Composite service hooks ----------
export function useFlightStatus(): FlightStatus {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.flightStatus$, {
    state: 'notReady',
    severity: 'error',
  });
}

export function useTelemetry(): Telemetry {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.telemetry$, {
    flightTime: 0,
    mslAltitude: 0,
    relativeAltitude: 0,
    groundSpeed: 0,
    climb: 0,
    heading: 0,
    throttle: 0,
  });
}

export function usePosition2D(): Position2D {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.position2D$, {
    lat: 0,
    lon: 0,
    heading: 0,
  });
}
