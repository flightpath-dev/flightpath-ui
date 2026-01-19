import { useContext } from 'react';

import { useObservableState } from 'observable-hooks';

import { ServicesContext, type ServicesContextValue } from './ServicesContext';
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
 * Hook to access all services.
 * Use this if you need direct access to a service instance.
 */
export function useServices(): ServicesContextValue {
  const services = useContext(ServicesContext);

  if (!services) {
    throw new Error('Services are not provided');
  }

  return services;
}

// ---------- MAVLink service hooks ----------
export function useHeartbeat(): Heartbeat | null {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.heartbeat$, null);
}

export function useFlightMode(): FlightMode {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.flightMode$, FlightModeEnum.Unknown);
}

export function useSysStatus(): SysStatus | null {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.sysStatus$, null);
}

export function useBatteryRemaining(): number {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.batteryRemaining$, 0);
}

export function useExtendedSysState(): ExtendedSysState | null {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.extendedSysState$, null);
}

export function useStatusText(): StatusText | null {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.statusText$, null);
}

export function useGlobalPositionInt(): GlobalPositionInt | null {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.globalPositionInt$, null);
}

export function useGpsRawInt(): GpsRawInt | null {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.gpsRawInt$, null);
}

export function useSatellites(): number {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.satellites$, 0);
}

export function useRadioStatus(): RadioStatus | null {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.radioStatus$, null);
}

export function useRemoteRssi(): number {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.remoteRssi$, 0);
}

export function useVfrHud(): VfrHud | null {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.vfrHud$, null);
}

export function useMissionCurrent(): MissionCurrent | null {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.missionCurrent$, null);
}

export function useSystemId(): number | null {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.systemId$, null);
}

export function useComponentId(): number | null {
  const { mavlinkService } = useServices();
  return useObservableState(mavlinkService.componentId$, null);
}

export function useMAVLinkService(): MAVLinkService {
  const { mavlinkService } = useServices();
  return mavlinkService;
}

// ---------- Composite service hooks ----------
export function useFlightStatus(): FlightStatus {
  const { flightStatusService } = useServices();
  return useObservableState(flightStatusService.flightStatus$, {
    state: 'notReady',
    severity: 'error',
  });
}

export function useTelemetry(): Telemetry {
  const { telemetryService } = useServices();
  return useObservableState(telemetryService.telemetry$, {
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
  const { position2DService } = useServices();
  return useObservableState(position2DService.position2D$, {
    lat: 0,
    lon: 0,
    heading: 0,
  });
}
