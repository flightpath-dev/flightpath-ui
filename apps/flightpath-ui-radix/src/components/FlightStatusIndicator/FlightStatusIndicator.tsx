import { severityToColor } from '../../utils/severityToColor';
import { StatusIndicator } from '../StatusIndicator/StatusIndicator';

import type { FlightState, FlightStatus } from '../../types/FlightStatus';

interface FlightStatusIndicatorProps {
  status: FlightStatus;
}

const STATUS_DISPLAY_TEXT_MAP: Record<FlightState, string> = {
  notReady: 'Not Ready',
  readyToFly: 'Ready To Fly',
  armed: 'Armed',
  flying: 'Flying',
  landing: 'Landing...',
  communicationLost: 'Communication Lost',
};

export function FlightStatusIndicator({ status }: FlightStatusIndicatorProps) {
  return (
    <StatusIndicator color={severityToColor(status.severity)}>
      {STATUS_DISPLAY_TEXT_MAP[status.state]}
    </StatusIndicator>
  );
}
