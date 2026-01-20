import type { Service } from './Service';
import type { FlightMode } from '../types/FlightMode';
import type { FlightStatus } from '../types/FlightStatus';
import type { MissionProgress } from '../types/MissionProgress';
import type { Position2D } from '../types/Position2D';
import type { StatusMessage } from '../types/StatusMessage';
import type { Telemetry } from '../types/Telemetry';
import type {
  SendCommandIntRequest,
  SendCommandIntResponse,
  SendCommandLongRequest,
  SendCommandLongResponse,
} from '@flightpath/flightpath/gen/ts/flightpath/mavlink_service_pb.js';
import type { Observable } from 'rxjs';

export interface MAVLinkService extends Service {
  // Derived observables (only emit when value changes)
  flightMode$: Observable<FlightMode>;
  batteryRemaining$: Observable<number>;
  satellites$: Observable<number>;
  remoteRssi$: Observable<number>;
  systemId$: Observable<number | null>;
  componentId$: Observable<number | null>;
  missionProgress$: Observable<MissionProgress>;
  flightTime$: Observable<number>;
  position2D$: Observable<Position2D>;
  telemetry$: Observable<Telemetry>;
  flightStatus$: Observable<FlightStatus>;
  statusMessage$: Observable<StatusMessage | null>;

  // Command methods
  sendCommandLong: (
    request: SendCommandLongRequest,
  ) => Promise<SendCommandLongResponse>;

  sendCommandInt: (
    request: SendCommandIntRequest,
  ) => Promise<SendCommandIntResponse>;

  sendArmCommand: (
    targetSystemId: number,
    targetComponentId: number,
  ) => Promise<void>;

  sendTakeoffCommand: (
    targetSystemId: number,
    targetComponentId: number,
    relativeAltitudeMeters: number,
  ) => Promise<void>;

  sendReturnToLaunchCommand: (
    targetSystemId: number,
    targetComponentId: number,
  ) => Promise<void>;

  sendMissionStartCommand: (
    targetSystemId: number,
    targetComponentId: number,
  ) => Promise<void>;
}
