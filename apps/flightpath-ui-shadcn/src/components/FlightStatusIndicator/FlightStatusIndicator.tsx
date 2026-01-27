import { StatusIndicator } from '@flightpath/autopilot/components/StatusIndicator';
import { severityToColor } from '@flightpath/autopilot/utils/severityToColor';

import { useFlightStatus } from '../../providers/useServices';

import type { FlightState } from '../../types/FlightStatus';

const STATUS_DISPLAY_TEXT_MAP: Record<FlightState, string> = {
  notReady: 'Not Ready',
  readyToFly: 'Ready To Fly',
  armed: 'Armed',
  flying: 'Flying',
  landing: 'Landing...',
  communicationLost: 'Communication Lost',
};

export function FlightStatusIndicator() {
  const status = useFlightStatus();
  return (
    <StatusIndicator color={severityToColor(status.severity)} highContrast>
      {STATUS_DISPLAY_TEXT_MAP[status.state]}
    </StatusIndicator>
  );
}
