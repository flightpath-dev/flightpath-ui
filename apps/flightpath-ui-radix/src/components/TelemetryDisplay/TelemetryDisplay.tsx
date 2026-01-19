import { Flex } from '@radix-ui/themes';

import { useTelemetry } from '../../providers/useServices';
import { MetricDisplay } from '../MetricDisplay/MetricDisplay';

export function TelemetryDisplay() {
  const telemetry = useTelemetry();

  return (
    <Flex gap="6">
      <MetricDisplay
        label="Alt (MSL)"
        unit="ft"
        value={telemetry.mslAltitude.toFixed(1)}
      />

      <MetricDisplay
        label="Alt (Rel)"
        unit="ft"
        value={telemetry.relativeAltitude.toFixed(1)}
      />

      <MetricDisplay
        label="Ground Speed"
        unit="mph"
        value={telemetry.groundSpeed.toFixed(1)}
      />

      <MetricDisplay
        label="Climb Rate"
        unit="mph"
        value={telemetry.climb.toFixed(1)}
      />

      <MetricDisplay
        label="Heading"
        unit="deg"
        value={telemetry.heading.toFixed(1)}
      />

      <MetricDisplay
        label="Throttle"
        unit="%"
        value={telemetry.throttle.toFixed(1)}
      />
    </Flex>
  );
}
