import { Flex } from '@radix-ui/themes';

import { MetricDisplay } from '../MetricDisplay/MetricDisplay';

import type { Telemetry } from '../../types/Telemetry';

interface TelemetryDisplayProps {
  telemetry: Telemetry;
}

export function TelemetryDisplay({ telemetry }: TelemetryDisplayProps) {
  const formatFlightTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Flex gap="6">
      <MetricDisplay
        label="Flight Time"
        value={formatFlightTime(telemetry.flightTime)}
      />

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
