import { Flex } from '@radix-ui/themes';

import FlightCommandPanel from '../../../components/FlightCommandPanel/FlightCommandPanel';
import { MapView } from '../../../components/MapView/MapView';
import {
  usePosition2D,
  useFlightStatus,
  useSystemId,
  useComponentId,
  useMAVLinkService,
} from '../../../providers/useServices';

import styles from './route.module.css';

export function ManualView() {
  const position = usePosition2D();
  const flightStatus = useFlightStatus();
  const systemId = useSystemId();
  const componentId = useComponentId();
  const mavlinkService = useMAVLinkService();

  const handleTakeoff = async () => {
    if (systemId === null || componentId === null) {
      return;
    }

    try {
      // Arm the drone
      await mavlinkService.sendArmCommand(systemId, componentId);

      // Send takeoff command
      await mavlinkService.sendTakeoffCommand(systemId, componentId);
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

  return (
    <Flex flexGrow="1" position="relative">
      <MapView position={position} />

      <FlightCommandPanel
        className={styles.flightCommandPanel}
        disabled={systemId === null || componentId === null}
        flightState={flightStatus.state}
        onReturn={handleLand}
        onTakeoff={handleTakeoff}
      />
    </Flex>
  );
}
