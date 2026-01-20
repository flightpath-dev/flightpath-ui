import { Flex } from '@radix-ui/themes';

import { FlightCommandPanel } from '../../../components/FlightCommandPanel/FlightCommandPanel';
import { MapView } from '../../../components/MapView/MapView';
import {
  useSystemId,
  useComponentId,
  useMAVLinkService,
} from '../../../providers/useServices';
import { FEET_TO_METERS } from '../../../utils/unitConversions';

import styles from './route.module.css';

export function FlyView() {
  console.log('FlyView rendered');
  const systemId = useSystemId();
  const componentId = useComponentId();
  const mavlinkService = useMAVLinkService();

  const handleTakeoff = async (altitudeFt: number) => {
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
  };

  const handleLand = async () => {
    if (systemId === null || componentId === null) {
      return;
    }

    try {
      // Send return to launch command
      await mavlinkService.sendReturnToLaunchCommand(systemId, componentId);
    } catch (error) {
      console.error('Error sending return to launch command:', error);
    }
  };

  const handleMissionStart = async () => {
    if (systemId === null || componentId === null) {
      return;
    }

    try {
      // Send mission start command
      await mavlinkService.sendMissionStartCommand(systemId, componentId);
    } catch (error) {
      console.error('Error sending mission start command:', error);
    }
  };

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
