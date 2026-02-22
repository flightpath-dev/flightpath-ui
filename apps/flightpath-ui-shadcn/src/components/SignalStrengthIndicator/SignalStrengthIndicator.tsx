import { MetricDisplay } from '@flightpath/autopilot/components/MetricDisplay';
import { SignalHigh, SignalMedium, SignalLow, SignalZero } from 'lucide-react';

import { useRemoteRssi } from '../../providers/useServices';

import type { Severity } from '@flightpath/autopilot/types/Severity';
import type { LucideIcon } from 'lucide-react';

function getIcon(percentage: number): LucideIcon {
  if (percentage === 0) return SignalZero;
  if (percentage < 30) return SignalLow;
  if (percentage < 60) return SignalMedium;
  return SignalHigh;
}

const getSeverity = (percentage: number): Severity => {
  if (percentage < 30) return 'error';
  if (percentage < 60) return 'warning';
  return 'success';
};

interface SignalStrengthIndicatorProps {
  padding?: string;
}

export function SignalStrengthIndicator({
  padding,
}: SignalStrengthIndicatorProps) {
  // RSSI values: [0-254] are valid, 255 is invalid/unknown
  const rssi = useRemoteRssi();
  const isValid = rssi !== 255;
  const percentage = isValid ? (rssi / 254) * 100 : 0;

  return (
    <MetricDisplay
      label="Signal"
      value={isValid ? `${Math.round(percentage)}%` : '--%'}
      icon={getIcon(percentage)}
      severity={getSeverity(percentage)}
      className={padding}
    />
  );
}
