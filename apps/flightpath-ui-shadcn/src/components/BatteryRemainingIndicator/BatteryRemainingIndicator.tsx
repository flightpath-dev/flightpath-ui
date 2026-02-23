import { MetricDisplay } from '@flightpath/autopilot/components/MetricDisplay';
import {
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  BatteryIcon,
} from 'lucide-react';

import { useBatteryRemaining } from '../../providers/useServices';

import type { Severity } from '@flightpath/autopilot/types/Severity';

const getIcon = (percentage: number) => {
  if (percentage === 0) return BatteryIcon;
  if (percentage < 30) return BatteryLow;
  if (percentage < 60) return BatteryMedium;
  return BatteryFull;
};

const getSeverity = (percentage: number): Severity => {
  if (percentage < 30) return 'error';
  if (percentage < 60) return 'warning';
  return 'success';
};

interface BatteryRemainingIndicatorProps {
  className?: string;
}

export function BatteryRemainingIndicator({
  className,
}: BatteryRemainingIndicatorProps) {
  const percentage = useBatteryRemaining();
  return (
    <MetricDisplay
      label="Battery"
      value={`${percentage}%`}
      icon={getIcon(percentage)}
      severity={getSeverity(percentage)}
      className={className}
    />
  );
}
