import { useContext } from 'react';

import { useObservableState } from 'observable-hooks';

import { MAVLinkServiceContext } from './MAVLinkServiceContext';
import { FlightModeEnum } from '../types/FlightMode';

import type { MAVLinkService } from '../services/MAVLinkService';
import type { FlightMode } from '../types/FlightMode';
import type { FlightStatus } from '../types/FlightStatus';
import type { MissionProgress } from '../types/MissionProgress';
import type { Position2D } from '../types/Position2D';
import type { StatusMessage } from '../types/StatusMessage';
import type { Telemetry } from '../types/Telemetry';

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
export function useFlightMode(): FlightMode {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.flightMode$, FlightModeEnum.Unknown);
}

export function useBatteryRemaining(): number {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.batteryRemaining$, 0);
}

export function useSatellites(): number {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.satellites$, 0);
}

export function useRemoteRssi(): number {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.remoteRssi$, 0);
}

export function useMissionProgress(): MissionProgress {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.missionProgress$, {
    missionId: 0,
    seq: 0,
    total: 0,
  });
}

export function useSystemId(): number | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.systemId$, null);
}

export function useComponentId(): number | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.componentId$, null);
}

export function useFlightTime(): number {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.flightTime$, 0);
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

export function useStatusMessage(): StatusMessage | null {
  const mavlinkService = useMAVLinkService();
  return useObservableState(mavlinkService.statusMessage$, null);
}
