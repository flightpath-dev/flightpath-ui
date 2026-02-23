import { MetricDisplay } from '@flightpath/autopilot/components/MetricDisplay';

import { useTelemetry } from '../../providers/useServices';

interface TelemetryDisplayProps {
  className?: string;
}

export function TelemetryDisplay({ className }: TelemetryDisplayProps) {
  const telemetry = useTelemetry();

  return (
    <>
      <MetricDisplay
        label="Alt (MSL)"
        value={telemetry.mslAltitude.toFixed(1)}
        unit="ft"
        className={className}
      />

      <MetricDisplay
        label="Alt (Rel)"
        value={telemetry.relativeAltitude.toFixed(1)}
        unit="ft"
        className={className}
      />

      <MetricDisplay
        label="Ground Speed"
        value={telemetry.groundSpeed.toFixed(1)}
        unit="mph"
        className={className}
      />
    </>
  );
}
