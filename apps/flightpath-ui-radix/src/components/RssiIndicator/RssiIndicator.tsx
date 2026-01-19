import { SignalHigh, SignalMedium, SignalLow, SignalZero } from 'lucide-react';

import { useRemoteRssi } from '../../providers/useServices';
import { IconText } from '../IconText/IconText';

const getSignalIcon = (percentage: number) => {
  if (percentage === 0) return SignalZero;
  if (percentage < 30) return SignalLow;
  if (percentage < 60) return SignalMedium;
  return SignalHigh;
};

export function RssiIndicator() {
  // RSSI values: [0-254] are valid, 255 is invalid/unknown
  const rssi = useRemoteRssi();
  const isValid = rssi !== 255;
  const percentage = isValid ? (rssi / 254) * 100 : 0;

  return (
    <IconText icon={getSignalIcon(percentage)} mono>
      {isValid ? `${Math.round(percentage)}%` : '--%'}
    </IconText>
  );
}
