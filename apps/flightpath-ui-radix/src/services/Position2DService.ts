import type { Service } from './Service';
import type { Position2D } from '../types/Position2D';
import type { Observable } from 'rxjs';

export interface Position2DService extends Service {
  // Position2D observable derived from GlobalPositionInt
  position2D$: Observable<Position2D>;
}
