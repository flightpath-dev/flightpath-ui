import { cn } from '@flightpath/autopilot/utils/cn';
import { severityToColor } from '@flightpath/autopilot/utils/severityToColor';

import { useFlightStatus } from '../../providers/useServices';

import type { FlightState } from '../../types/FlightStatus';

const STATUS_DISPLAY_TEXT_MAP: Record<FlightState, string> = {
  notReady: 'NOT READY',
  readyToFly: 'READY TO FLY',
  armed: 'ARMED',
  flying: 'FLYING',
  landing: 'LANDING...',
  communicationLost: 'COMMUNICATION LOST',
};

interface FlightStatusIndicatorProps {
  // Provided for positioning
  className?: string;
}

export function FlightStatusIndicator({
  className,
}: FlightStatusIndicatorProps) {
  const status = useFlightStatus();
  const colors = severityToColor(status.severity);

  return (
    <div
      className={cn(
        'dark bg-black/90 backdrop-blur-md border rounded-md px-4 py-2.5',
        className,
      )}
    >
      <div
        className={cn(
          'font-mono text-base font-bold whitespace-nowrap',
          colors.text,
        )}
      >
        {STATUS_DISPLAY_TEXT_MAP[status.state]}
      </div>
    </div>
  );
}
