import {
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  BatteryIcon,
} from 'lucide-react';

import { IconText } from '../IconText/IconText';

interface BatteryRemainingIndicatorProps {
  percentage: number;
}

const getBatteryIcon = (percentage: number) => {
  if (percentage === 0) return BatteryIcon;
  if (percentage < 25) return BatteryLow;
  if (percentage < 75) return BatteryMedium;
  return BatteryFull;
};

export function BatteryRemainingIndicator({
  percentage,
}: BatteryRemainingIndicatorProps) {
  return (
    <IconText icon={getBatteryIcon(percentage)} mono>
      {percentage}%
    </IconText>
  );
}
