import { Flex } from '@radix-ui/themes';

import { useTelemetry } from '../../providers/useServices';
import { FPSMeter } from '../FPSMeter/FPSMeter';
import { TelemetryDisplay } from '../TelemetryDisplay/TelemetryDisplay';

export function BottomBar() {
  const telemetry = useTelemetry();

  return (
    <Flex align="center" height="72px" justify="between" px="6">
      <TelemetryDisplay telemetry={telemetry} />
      <FPSMeter />
    </Flex>
  );
}
