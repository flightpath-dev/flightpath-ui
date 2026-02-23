import { FPSMeter } from '@flightpath/autopilot/components/FPSMeter';

import { BatteryRemainingIndicator } from '../../../../components/BatteryRemainingIndicator/BatteryRemainingIndicator';
import { FlightModeIndicator } from '../../../../components/FlightModeIndicator/FlightModeIndicator';
import { FlightTimeDisplay } from '../../../../components/FlightTimeDisplay/FlightTimeDisplay';
import { SatelliteCountIndicator } from '../../../../components/SatelliteCountIndicator/SatelliteCountIndicator';
import { SignalStrengthIndicator } from '../../../../components/SignalStrengthIndicator/SignalStrengthIndicator';
import { TelemetryDisplay } from '../../../../components/TelemetryDisplay/TelemetryDisplay';

export function Footer() {
  return (
    <footer className="bg-card/90 backdrop-blur-md border-t border-border">
      <div className="flex items-stretch justify-between py-3">
        {/* Left Side: Flight Time and Telemetry */}
        <div className="flex items-stretch divide-x divide-border">
          <FlightTimeDisplay className="pl-6 pr-4" />
          <TelemetryDisplay />
        </div>

        {/* Right Side: Secondary Indicators */}
        <div className="flex items-stretch divide-x divide-border">
          <FlightModeIndicator />
          <SatelliteCountIndicator />
          <SignalStrengthIndicator />
          <BatteryRemainingIndicator />
          <FPSMeter className="pl-4 pr-6" />
        </div>
      </div>
    </footer>
  );
}
