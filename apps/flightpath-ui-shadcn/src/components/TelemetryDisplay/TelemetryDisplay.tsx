import { MetricDisplay } from '@flightpath/autopilot/components/MetricDisplay';

import { useTelemetry } from '../../providers/useServices';

interface TelemetryDisplayProps {
  padding?: string;
}

export function TelemetryDisplay({ padding }: TelemetryDisplayProps) {
  const telemetry = useTelemetry();

  return (
    <>
      <MetricDisplay
        label="Alt (MSL)"
        value={telemetry.mslAltitude.toFixed(1)}
        unit="ft"
        className={padding}
      />

      <MetricDisplay
        label="Alt (Rel)"
        value={telemetry.relativeAltitude.toFixed(1)}
        unit="ft"
        className={padding}
      />

      <MetricDisplay
        label="Ground Speed"
        value={telemetry.groundSpeed.toFixed(1)}
        unit="mph"
        className={padding}
      />
    </>
  );
}
