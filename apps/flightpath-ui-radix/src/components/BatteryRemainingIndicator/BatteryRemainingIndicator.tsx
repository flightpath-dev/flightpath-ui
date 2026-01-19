import {
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  BatteryIcon,
} from 'lucide-react';

import { useBatteryRemaining } from '../../providers/useServices';
import { IconText } from '../IconText/IconText';

const getBatteryIcon = (percentage: number) => {
  if (percentage === 0) return BatteryIcon;
  if (percentage < 25) return BatteryLow;
  if (percentage < 75) return BatteryMedium;
  return BatteryFull;
};

export function BatteryRemainingIndicator() {
  const percentage = useBatteryRemaining();
  return (
    <IconText icon={getBatteryIcon(percentage)} mono>
      {percentage}%
    </IconText>
  );
}
