import { Satellite } from 'lucide-react';

import { IconText } from '../IconText/IconText';

interface SatelliteCountIndicatorProps {
  satellites: number;
}

export function SatelliteCountIndicator({
  satellites,
}: SatelliteCountIndicatorProps) {
  return (
    <IconText icon={Satellite} mono>
      {satellites}
    </IconText>
  );
}
