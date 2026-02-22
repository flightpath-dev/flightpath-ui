import { MetricDisplay } from '@flightpath/autopilot/components/MetricDisplay';
import { Satellite } from 'lucide-react';

import { useSatellites } from '../../providers/useServices';

import type { Severity } from '@flightpath/autopilot/types/Severity';

interface SatelliteCountIndicatorProps {
  padding?: string;
}

function getSeverity(satellites: number): Severity {
  if (satellites <= 4) return 'error';
  if (satellites <= 8) return 'warning';
  return 'success';
}

export function SatelliteCountIndicator({
  padding,
}: SatelliteCountIndicatorProps) {
  const satellites = useSatellites();

  return (
    <MetricDisplay
      label="Satellites"
      value={satellites}
      icon={Satellite}
      severity={getSeverity(satellites)}
      className={padding}
    />
  );
}
