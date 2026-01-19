import { Flex } from '@radix-ui/themes';

import { FlightTimeDisplay } from '../FlightTimeDisplay/FlightTimeDisplay';
import { FPSMeter } from '../FPSMeter/FPSMeter';
import { TelemetryDisplay } from '../TelemetryDisplay/TelemetryDisplay';

export function BottomBar() {
  return (
    <Flex align="center" height="72px" justify="between" px="6">
      <Flex gap="6">
        <FlightTimeDisplay />
        <TelemetryDisplay />
      </Flex>
      <FPSMeter />
    </Flex>
  );
}
