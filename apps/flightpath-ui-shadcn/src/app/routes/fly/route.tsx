import { useCallback } from 'react';

import { FlightCommandPanel } from '../../../components/FlightCommandPanel/FlightCommandPanel';
import { MapView } from '../../../components/MapView/MapView';
import {
  useSystemId,
  useComponentId,
  useMAVLinkService,
} from '../../../providers/useServices';
import { FEET_TO_METERS } from '../../../utils/unitConversions';

/**
 * FlyView component - main flight control interface.
 *
 * NOTE: This component uses useCallback + React.memo (on FlightCommandPanel)
 * as an example of over-optimization. In practice, this optimization provides
 * minimal benefit:
 *
 * 1. systemId and componentId are stable after the first drone heartbeat, so
 *    parent does not re-render because of these,
 *
 * 2. The useCallback hooks in this component stabilize callback props, but
 *    since this component itself does not re-render, the child component will
 *    not re-render because of these.
 *
 * 3. The child component re-renders only when its internal hooks change,
 *    i.e. useFlightStatus, useMissionProgress. This is expected.
 *
 * 4. React.memo on FlightCommandPanel only prevents re-renders triggered by
 *    parent prop changes. However, we already established that the parent does
 *    not re-render.
 *
 * 5. Drone commands are user-initiated, low-frequency operations where the
 *    re-render cost is infrequent and negligible.
 *
 * This serves as a learning example: memoization should be applied after
 * profiling identifies actual performance bottlenecks, not preemptively.
 */
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
    <div className="flex-1 relative">
      <MapView />

      <FlightCommandPanel
        className="fixed top-16 left-4 z-40"
        disabled={systemId === null || componentId === null}
        onMissionStart={handleMissionStart}
        onReturn={handleLand}
        onTakeoff={handleTakeoff}
      />
    </div>
  );
}
