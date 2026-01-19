import { useCallback } from 'react';

import { Flex } from '@radix-ui/themes';

import FlightCommandPanel from '../../../components/FlightCommandPanel/FlightCommandPanel';
import { MapView } from '../../../components/MapView/MapView';
import {
  useSystemId,
  useComponentId,
  useMAVLinkService,
} from '../../../providers/useServices';

import styles from './route.module.css';

const FEET_TO_METERS = 0.3048;

export function FlyView() {
  const systemId = useSystemId();
  const componentId = useComponentId();
  const mavlinkService = useMAVLinkService();

  const handleTakeoff = useCallback(
    async (altitudeFt: number) => {
      if (systemId === null || componentId === null) {
        return;
      }

      try {
        // Arm the drone
        await mavlinkService.sendArmCommand(systemId, componentId);

        // Convert feet to meters and send takeoff command
        const altitudeMeters = altitudeFt * FEET_TO_METERS;
        await mavlinkService.sendTakeoffCommand(
          systemId,
          componentId,
          altitudeMeters,
        );
      } catch (error) {
        console.error('Error sending takeoff command:', error);
      }
    },
    [systemId, componentId, mavlinkService],
  );

  const handleLand = useCallback(async () => {
    if (systemId === null || componentId === null) {
      return;
    }

    try {
      // Send return to launch command
      await mavlinkService.sendReturnToLaunchCommand(systemId, componentId);
    } catch (error) {
      console.error('Error sending return to launch command:', error);
    }
  }, [systemId, componentId, mavlinkService]);

  const handleMissionStart = useCallback(async () => {
    if (systemId === null || componentId === null) {
      return;
    }

    try {
      // Send mission start command
      await mavlinkService.sendMissionStartCommand(systemId, componentId);
    } catch (error) {
      console.error('Error sending mission start command:', error);
    }
  }, [systemId, componentId, mavlinkService]);

  return (
    <Flex flexGrow="1" position="relative">
      <MapView />

      <FlightCommandPanel
        className={styles.flightCommandPanel}
        disabled={systemId === null || componentId === null}
        onMissionStart={handleMissionStart}
        onReturn={handleLand}
        onTakeoff={handleTakeoff}
      />
    </Flex>
  );
}
