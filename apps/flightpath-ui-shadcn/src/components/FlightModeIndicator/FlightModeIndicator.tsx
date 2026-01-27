import { StatusIndicator } from '@flightpath/autopilot/components/StatusIndicator';

import { useFlightMode } from '../../providers/useServices';

import type { FlightMode } from '../../types/FlightMode';
import type { AccentColor } from '@flightpath/autopilot/types/AccentColor';

const MODE_COLOR_MAP: Record<FlightMode, AccentColor> = {
  unknown: 'neutral',
  manual: 'neutral',
  altitude: 'neutral',
  position: 'neutral',
  guided: 'neutral',
  stabilized: 'neutral',
  acro: 'neutral',
  ready: 'neutral',
  takeoff: 'amber',
  hold: 'neutral',
  mission: 'neutral',
  return: 'amber',
  land: 'amber',
  followMe: 'neutral',
};

const MODE_DISPLAY_TEXT_MAP: Record<FlightMode, string> = {
  unknown: 'Unknown Mode',
  manual: 'Manual Mode',
  altitude: 'Altitude Mode',
  position: 'Position Mode',
  guided: 'Guided Mode',
  stabilized: 'Stabilized Mode',
  acro: 'Acro Mode',
  ready: 'Ready',
  takeoff: 'Taking Off...',
  hold: 'Hold',
  mission: 'Mission Mode',
  return: 'Returning...',
  land: 'Landing...',
  followMe: 'Follow Me Mode',
};

export function FlightModeIndicator() {
  const mode = useFlightMode();
  const modeColor = MODE_COLOR_MAP[mode] ?? 'gray';
  const displayText = MODE_DISPLAY_TEXT_MAP[mode] ?? mode;

  return (
    <StatusIndicator color={modeColor} highContrast>
      {displayText}
    </StatusIndicator>
  );
}
