import type { Service } from './Service';
import type { Telemetry } from '../types/Telemetry';
import type { Observable } from 'rxjs';

export interface TelemetryService extends Service {
  // Telemetry observable combining data from Heartbeat, GlobalPositionInt, and VfrHud
  telemetry$: Observable<Telemetry>;
}
