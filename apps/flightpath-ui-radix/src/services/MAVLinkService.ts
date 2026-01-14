import type { Service } from './Service';
import type { FlightMode } from '../types/FlightMode';
import type { ExtendedSysState } from '@flightpath/flightpath/gen/ts/flightpath/extended_sys_state_pb.js';
import type { GlobalPositionInt } from '@flightpath/flightpath/gen/ts/flightpath/global_position_int_pb.js';
import type { GpsRawInt } from '@flightpath/flightpath/gen/ts/flightpath/gps_raw_int_pb.js';
import type { Heartbeat } from '@flightpath/flightpath/gen/ts/flightpath/heartbeat_pb.js';
import type {
  SendCommandRequest,
  SendCommandResponse,
} from '@flightpath/flightpath/gen/ts/flightpath/mavlink_service_pb.js';
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

  // Transformed observables (only emit when value changes)
  flightMode$: Observable<FlightMode>;
  batteryRemaining$: Observable<number>;
  satellites$: Observable<number>;
  remoteRssi$: Observable<number>;
  systemId$: Observable<number | null>;
  componentId$: Observable<number | null>;

  // Command methods
  sendCommand: (request: SendCommandRequest) => Promise<SendCommandResponse>;
  sendArmCommand: (
    targetSystemId: number,
    targetComponentId: number,
  ) => Promise<void>;
  sendTakeoffCommand: (
    targetSystemId: number,
    targetComponentId: number,
  ) => Promise<void>;
  sendReturnToLaunchCommand: (
    targetSystemId: number,
    targetComponentId: number,
  ) => Promise<void>;
}
