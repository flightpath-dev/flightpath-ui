import { useMemo, useEffect, useRef } from 'react';

import { ServicesContext } from './ServicesContext';
import { FlightStatusServiceImpl } from '../services/FlightStatusServiceImpl';
import { MAVLinkServiceImpl } from '../services/MAVLinkServiceImpl';
import { Position2DServiceImpl } from '../services/Position2DServiceImpl';
import { TelemetryServiceImpl } from '../services/TelemetryServiceImpl';

import type { ReactNode } from 'react';

export interface ServicesProviderProps {
  children?: ReactNode;
}

/**
 * Provider for all services.
 *
 * This provider will automatically handle initializing all services on mount
 * and destroying them on unmount.
 */
export function ServicesProvider({ children }: ServicesProviderProps) {
  // Create MAVLinkService instance (consolidates all 8 individual services)
  const mavlinkService = useMemo(() => new MAVLinkServiceImpl(), []);

  // Create composite services that depend on MAVLinkService
  const telemetryService = useMemo(
    () => new TelemetryServiceImpl(mavlinkService),
    [mavlinkService],
  );
  const flightStatusService = useMemo(
    () => new FlightStatusServiceImpl(mavlinkService),
    [mavlinkService],
  );
  const position2DService = useMemo(
    () => new Position2DServiceImpl(mavlinkService),
    [mavlinkService],
  );

  // Using refs to ensure we only call onDestroy on unmount, not on any component updates
  const mavlinkServiceRef = useRef(mavlinkService);
  const telemetryServiceRef = useRef(telemetryService);
  const flightStatusServiceRef = useRef(flightStatusService);
  const position2DServiceRef = useRef(position2DService);

  // Initialize all services on mount
  useEffect(() => {
    const mavlinkServiceInstance = mavlinkServiceRef.current;
    const telemetryServiceInstance = telemetryServiceRef.current;
    const flightStatusServiceInstance = flightStatusServiceRef.current;
    const position2DServiceInstance = position2DServiceRef.current;

    // On mount, call the onInit() function of all services
    mavlinkServiceInstance.onInit();
    telemetryServiceInstance.onInit();
    flightStatusServiceInstance.onInit();
    position2DServiceInstance.onInit();

    // On unmount, call the onDestroy() function of all services
    return () => {
      mavlinkServiceInstance.onDestroy();
      telemetryServiceInstance.onDestroy();
      flightStatusServiceInstance.onDestroy();
      position2DServiceInstance.onDestroy();
    };
  }, []); // Empty dependency array - only run on mount/unmount

  const contextValue = useMemo(
    () => ({
      mavlinkService,
      telemetryService,
      flightStatusService,
      position2DService,
    }),
    [mavlinkService, telemetryService, flightStatusService, position2DService],
  );

  return (
    <ServicesContext.Provider value={contextValue}>
      {children}
    </ServicesContext.Provider>
  );
}
