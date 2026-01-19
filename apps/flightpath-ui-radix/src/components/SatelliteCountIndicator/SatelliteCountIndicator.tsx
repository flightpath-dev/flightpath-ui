import { Satellite } from 'lucide-react';

import { useSatellites } from '../../providers/useServices';
import { IconText } from '../IconText/IconText';

export function SatelliteCountIndicator() {
  const satellites = useSatellites();
  return (
    <IconText icon={Satellite} mono>
      {satellites}
    </IconText>
  );
}
