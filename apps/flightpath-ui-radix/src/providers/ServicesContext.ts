import { createContext } from 'react';

import type { FlightStatusService } from '../services/FlightStatusService';
import type { MAVLinkService } from '../services/MAVLinkService';
import type { Position2DService } from '../services/Position2DService';
import type { TelemetryService } from '../services/TelemetryService';

export interface ServicesContextValue {
  mavlinkService: MAVLinkService;
  telemetryService: TelemetryService;
  flightStatusService: FlightStatusService;
  position2DService: Position2DService;
}

export const ServicesContext = createContext<ServicesContextValue | undefined>(
  undefined,
);
