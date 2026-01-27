import { FPSMeter } from '@flightpath/autopilot/components/FPSMeter';

import { FlightTimeDisplay } from '../FlightTimeDisplay/FlightTimeDisplay';
import { TelemetryDisplay } from '../TelemetryDisplay/TelemetryDisplay';

export function BottomBar() {
  return (
    <div className="flex items-center justify-between h-18 px-8">
      <div className="flex gap-8">
        <FlightTimeDisplay />
        <TelemetryDisplay />
      </div>
      <FPSMeter />
    </div>
  );
}
