import type { Service } from './Service';
import type { FlightMode } from '../types/FlightMode';
import type { FlightStatus } from '../types/FlightStatus';
import type { MissionProgress } from '../types/MissionProgress';
import type { Position2D } from '../types/Position2D';
import type { Telemetry } from '../types/Telemetry';
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

export interface MAVLinkService extends Service {
  // Raw observables (for components that need full message data)
  heartbeat$: Observable<Heartbeat | null>;
  sysStatus$: Observable<SysStatus | null>;
  extendedSysState$: Observable<ExtendedSysState | null>;
  statusText$: Observable<StatusText | null>;
  globalPositionInt$: Observable<GlobalPositionInt | null>;
  gpsRawInt$: Observable<GpsRawInt | null>;
  radioStatus$: Observable<RadioStatus | null>;
  vfrHud$: Observable<VfrHud | null>;
  missionCurrent$: Observable<MissionCurrent | null>;
  missionItemReached$: Observable<MissionItemReached | null>;

  // Transformed observables (only emit when value changes)
  flightMode$: Observable<FlightMode>;
  batteryRemaining$: Observable<number>;
  satellites$: Observable<number>;
  remoteRssi$: Observable<number>;
  systemId$: Observable<number | null>;
  componentId$: Observable<number | null>;
  missionProgress$: Observable<MissionProgress>;
  flightTime$: Observable<number>;

  // Composite observables (derived from multiple message types)
  position2D$: Observable<Position2D>;
  telemetry$: Observable<Telemetry>;
  flightStatus$: Observable<FlightStatus>;

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
