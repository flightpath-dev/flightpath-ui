import type { Service } from './Service';
import type { FlightStatus } from '../types/FlightStatus';
import type { Observable } from 'rxjs';

export interface FlightStatusService extends Service {
  flightStatus$: Observable<FlightStatus>;
}
