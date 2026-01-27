import { IconText } from '@flightpath/autopilot/components/IconText';
import { Satellite } from 'lucide-react';

import { useSatellites } from '../../providers/useServices';

export function SatelliteCountIndicator() {
  const satellites = useSatellites();
  return (
    <IconText icon={Satellite} mono>
      {satellites}
    </IconText>
  );
}
