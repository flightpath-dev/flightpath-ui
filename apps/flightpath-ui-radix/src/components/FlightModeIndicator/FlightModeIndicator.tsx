import { StatusIndicator } from '../StatusIndicator/StatusIndicator';

import type { AccentColor } from '../../types/AccentColor';
import type { FlightMode } from '../../types/FlightMode';

interface FlightModeIndicatorProps {
  mode: FlightMode;
}

const MODE_COLOR_MAP: Record<FlightMode, AccentColor> = {
  unknown: 'gray',
  manual: 'gray',
  altitude: 'gray',
  position: 'gray',
  guided: 'gray',
  stabilized: 'gray',
  acro: 'gray',
  ready: 'gray',
  takeoff: 'amber',
  hold: 'gray',
  mission: 'gray',
  return: 'amber',
  land: 'amber',
  followMe: 'gray',
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

export function FlightModeIndicator({ mode }: FlightModeIndicatorProps) {
  const modeColor = MODE_COLOR_MAP[mode] ?? 'gray';
  const displayText = MODE_DISPLAY_TEXT_MAP[mode] ?? mode;

  return (
    <StatusIndicator color={modeColor} size="2">
      {displayText}
    </StatusIndicator>
  );
}
