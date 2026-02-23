import { MetricDisplay } from '@flightpath/autopilot/components/MetricDisplay';

import { useFlightMode } from '../../providers/useServices';

import type { FlightMode } from '../../types/FlightMode';

const MODE_DISPLAY_TEXT_MAP: Record<FlightMode, string> = {
  unknown: 'Unknown',
  manual: 'Manual',
  altitude: 'Altitude',
  position: 'Position',
  guided: 'Guided',
  stabilized: 'Stabilized',
  acro: 'Acro',
  ready: 'Ready',
  takeoff: 'Takeoff',
  hold: 'Hold',
  mission: 'Mission',
  return: 'Return',
  land: 'Land',
  followMe: 'Follow Me',
};

interface FlightModeIndicatorProps {
  className?: string;
}

export function FlightModeIndicator({ className }: FlightModeIndicatorProps) {
  const mode = useFlightMode();
  const displayText = MODE_DISPLAY_TEXT_MAP[mode] ?? mode;

  return (
    <MetricDisplay
      label="Flight Mode"
      value={displayText}
      className={className}
    />
  );
}
