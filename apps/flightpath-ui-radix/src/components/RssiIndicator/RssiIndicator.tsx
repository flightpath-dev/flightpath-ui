import { SignalHigh, SignalMedium, SignalLow, SignalZero } from 'lucide-react';

import { IconText } from '../IconText/IconText';

interface RssiIndicatorProps {
  // RSSI values: [0-254] are valid, 255 is invalid/unknown
  rssi: number;
}

const getSignalIcon = (percentage: number) => {
  if (percentage === 0) return SignalZero;
  if (percentage < 30) return SignalLow;
  if (percentage < 60) return SignalMedium;
  return SignalHigh;
};

export function RssiIndicator({ rssi }: RssiIndicatorProps) {
  const isValid = rssi !== 255;
  const percentage = isValid ? (rssi / 254) * 100 : 0;

  return (
    <IconText icon={getSignalIcon(percentage)} mono>
      {isValid ? `${Math.round(percentage)}%` : '--%'}
    </IconText>
  );
}
